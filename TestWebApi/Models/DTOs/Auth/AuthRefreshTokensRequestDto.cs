using System.ComponentModel.DataAnnotations;

namespace BlogPost.Api.Models.DTOs.Auth
{
    public class AuthRefreshTokensRequestDto
    {
        [Required]
        public string RefreshToken { get; set; } = default!;
    }
}
