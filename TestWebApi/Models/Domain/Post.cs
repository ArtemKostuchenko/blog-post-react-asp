namespace BlogPost.Api.Models.Domain
{
    public class Post
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = default!;
        public string Content { get; set; } = default!;
        public DateTime CreatedAt { get; set; }
        public Guid UserId { get; set; }
        public User User { get; set; } = default!;
        public Guid? ImageId { get; set; }
        public Image? Image { get; set; } = default!;

        public List<Comment> Comments = default!;
    }
}
