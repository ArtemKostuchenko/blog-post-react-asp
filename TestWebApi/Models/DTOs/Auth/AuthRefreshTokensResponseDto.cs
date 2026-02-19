namespace BlogPost.Api.Models.DTOs.Auth
{
    public class AuthRefreshTokensResponseDto
    {
        public string AccessToken { get; set; } = default!;
        public string RefreshToken { get; set; } = default!;
    }
}
