namespace BlogPost.Api.Models.DTOs.Auth
{
    public class AuthRegisterResponseDto
    {
        public string AccessToken { get; set; } = default!;
        public string RefreshToken { get; set; } = default!;
    }
}
