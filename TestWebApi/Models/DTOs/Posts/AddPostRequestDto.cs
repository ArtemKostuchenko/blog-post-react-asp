using System.ComponentModel.DataAnnotations;
using BlogPost.Api.Attributes;

namespace BlogPost.Api.Models.DTOs.Posts
{
    public class AddPostRequestDto
    {
        [Required]
        [MinLength(3)]
        public string Title { get; set; } = default!;

        [Required]
        [MinLength(15)]
        public string Content { get; set; } = default!;

        [MaxImageSize]
        [AllowedImageExtensions]
        public IFormFile? Image { get; set; }
    }
}
