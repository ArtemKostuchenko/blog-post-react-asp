using System.ComponentModel.DataAnnotations;

namespace BlogPost.Api.Models.DTOs.Auth
{
    public class AuthRegisterRequestDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; } = default!;

        [Required]
        [MinLength(8)]
        [MaxLength(32)]
        public string Password { get; set; } = default!;

        [Required]
        [MinLength(3)]
        [MaxLength(255)]
        public string Nickname { get; set; } = default!;
        public string? Role { get; set; }
    }
}
