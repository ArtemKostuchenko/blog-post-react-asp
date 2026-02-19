using BlogPost.Api.Repositories.Tokens;
using BlogPost.Api.Services.Hash;
using BlogPost.Api.Exceptions;

namespace BlogPost.Api.Services.Tokens
{
    public class TokenService(ITokenRepository tokenRepository,  IHashService hashService) : ITokenService
    {
        public ITokenRepository tokenRepository = tokenRepository;
        public IHashService hashService = hashService;

        public async Task<(string accessToken, string refreshToken)> CreateTokensAsync(Guid userId)
        {
            var accessToken = CreateAccessToken(userId);

            var refreshToken = await CreateRefreshTokenAsync(userId);

            return (accessToken, refreshToken);
        }

        public string CreateAccessToken(Guid userId)
        {
            return tokenRepository.CreateAccessToken(userId);
        }

        public async Task<string> CreateRefreshTokenAsync(Guid userId)
        {
            var (token, hash) = hashService.GenerateToken();

            await tokenRepository.CreateRefreshTokenAsync(userId, hash);

            return token;
        }

        public async Task<(string accessToken, string refreshToken)> RefreshTokenAsync(string token)
        {
            var user = await tokenRepository.GetUserByRefreshToken(token) ?? throw new UnauthorizedException();

            var (refreshToken, hash) = hashService.GenerateToken();

            var tokenId = await tokenRepository.CreateRefreshTokenAsync(user.Id, hash);

            await tokenRepository.RevokeRefreshToken(token, tokenId);

            var accessToken = CreateAccessToken(user.Id);

            return (accessToken, refreshToken);
        }

        public async Task RevokeTokens(Guid userId)
        {
            await tokenRepository.RevokeTokens(userId);
        }
    }
}
