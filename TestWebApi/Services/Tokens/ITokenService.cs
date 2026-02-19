namespace BlogPost.Api.Services.Tokens
{
    public interface ITokenService
    {
        public Task<(string accessToken, string refreshToken)> CreateTokensAsync(Guid userId);
        public string CreateAccessToken(Guid userId);
        public Task<string> CreateRefreshTokenAsync(Guid userId);
        public Task<(string accessToken, string refreshToken)> RefreshTokenAsync(string token);
        public Task RevokeTokens(Guid userId);
    }
}
