using System.ComponentModel.DataAnnotations;

namespace BlogPost.Api.Models.DTOs.Auth
{
    public class AuthLoginRequestDto
    {
        [Required]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; } = default!;

        [Required]
        [DataType(DataType.Password)]
        [MinLength(8)]
        [MaxLength(32)]
        public string Password { get; set; } = default!;
    }
}
