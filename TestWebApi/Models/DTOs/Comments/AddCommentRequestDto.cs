using System.ComponentModel.DataAnnotations;

namespace BlogPost.Api.Models.DTOs.Comments
{
    public class AddCommentRequestDto
    {
        [Required]
        [MinLength(10)]
        public string Content { get; set; } = default!;
    }
}
