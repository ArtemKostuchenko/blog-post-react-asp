namespace BlogPost.Api.Models.DTOs.Comments
{
    public class UpdateCommentResponseDto
    {
        public Guid Id { get; set; }
        public string Content { get; set; } = default!;
        public DateTime CreatedAt { get; set; }
    }
}
