namespace BlogPost.Api.Models.DTOs.Comments
{
    public class CommentsDto
    {
        public IEnumerable<CommentDto> Comments { get; set; } = default!;
        public int TotalComments { get; set; }
        public int TotalPages { get; set; }
    }
}
