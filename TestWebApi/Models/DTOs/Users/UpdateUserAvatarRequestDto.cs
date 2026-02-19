using BlogPost.Api.Attributes;
using System.ComponentModel.DataAnnotations;

namespace BlogPost.Api.Models.DTOs.Users
{
    public class UpdateUserAvatarRequestDto
    {
        [Required]
        [MaxImageSize]
        [AllowedImageExtensions]
        public IFormFile Avatar { get; set; } = default!;
    }
}
