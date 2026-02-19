using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BlogPost.Api.Data;
using BlogPost.Api.Models.Domain;
using BlogPost.Api.Services.Hash;

namespace BlogPost.Api.Repositories.Tokens
{
    public class TokenRepository(IConfiguration configuration, IHashService hashService, BlogDbContext db) : ITokenRepository
    {
        private readonly IConfiguration configuration = configuration;
        private readonly IHashService hashService = hashService;
        private readonly BlogDbContext db = db;

        public string CreateAccessToken(Guid userId)
        {
            var claims = new List<Claim>
            {
                new(JwtRegisteredClaimNames.Sub, userId.ToString()),
                new(ClaimTypes.NameIdentifier, userId.ToString()),
                new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:SecureKey"]!));

            var creds = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var accessMinutes = int.Parse(configuration["Jwt:AccessTokenMinutes"] ?? "6");
            var expiresAt = DateTime.UtcNow.AddMinutes(accessMinutes);

            var accessToken = new JwtSecurityToken(
                configuration["Jwt:Issuer"],
                configuration["Jwt:Audience"],
                claims,
                expires: expiresAt,
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(accessToken);
        }

        public async Task<Guid> CreateRefreshTokenAsync(Guid userId, string tokenHash)
        {   
            var days = int.Parse(configuration["Jwt:RefreshTokenDays"] ?? "30");
            var expiresAt = DateTime.UtcNow.AddDays(days);

            var refreshToken = new RefreshToken
            {
                UserId = userId,
                TokenHash = tokenHash,
                ExpiredAt = expiresAt,
                CreatedAt = DateTime.UtcNow,
            };

            db.RefreshTokens.Add(refreshToken);

            await db.SaveChangesAsync();

            return refreshToken.Id;
        }

        public async Task<User?> GetUserByRefreshToken(string token)
        {
            var hashToken = hashService.HashToken(token);

            var refreshToken = await db.RefreshTokens.Include(x => x.User).FirstOrDefaultAsync(x => x.TokenHash == hashToken);

            if (refreshToken == null) {
                return null;
            }

            if(refreshToken.RevokedAt != null)
            {
                return null;
            }

            if (refreshToken.ExpiredAt < DateTime.UtcNow) 
            {
                return null;
            }

            return refreshToken.User;
        }

        public async Task RevokeRefreshToken(string token, Guid? rotateRefreshId)
        {
            var hashToken = hashService.HashToken(token);

            var refreshToken = await db.RefreshTokens.FirstOrDefaultAsync(x => x.TokenHash == hashToken);

            if (refreshToken == null) 
            {
                return;
            }

            refreshToken.RevokedAt = DateTime.UtcNow;
            refreshToken.ReplacedByTokenId = rotateRefreshId;

            await db.SaveChangesAsync();
        }

        public async Task RevokeTokens(Guid userId)
        {
            var refreshTokens = db.RefreshTokens.Where(t => t.UserId == userId && t.RevokedAt == null);

            foreach (var token in refreshTokens)
            {
                token.RevokedAt = DateTime.UtcNow;
            }

            await db.SaveChangesAsync();
        }
    }
}
