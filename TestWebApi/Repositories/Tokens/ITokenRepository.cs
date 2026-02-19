using BlogPost.Api.Models.Domain;

namespace BlogPost.Api.Repositories.Tokens
{
    public interface ITokenRepository
    {
        public string CreateAccessToken(Guid userId);
        public Task<Guid> CreateRefreshTokenAsync(Guid userId, string tokenHash);
        public Task<User?> GetUserByRefreshToken(string token);
        public Task RevokeRefreshToken(string token, Guid? rotateRefreshId);
        public Task RevokeTokens(Guid userId);
    }
}
