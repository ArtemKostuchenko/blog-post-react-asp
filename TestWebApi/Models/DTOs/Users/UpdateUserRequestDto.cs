using System.ComponentModel.DataAnnotations;

namespace BlogPost.Api.Models.DTOs.Users
{
    public class UpdateUserRequestDto
    {
        [Required]
        [MinLength(3)]
        [MaxLength(255)]
        public string Nickname { get; set; } = default!;
    }
}
