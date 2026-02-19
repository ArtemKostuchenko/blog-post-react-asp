using BlogPost.Api.Models.Domain;

namespace BlogPost.Api.Models.DTOs.Comments
{
    public class AddCommentResponseDto
    {
        public Guid Id { get; set; }
        public string Content { get; set; } = default!;
        public DateTime CreatedAt { get; set; }
        public Guid PostId { get; set; }
    }
}
