namespace BlogPost.Api.Models.DTOs.Posts
{
    public class PostShortDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = default!;
    }
}
