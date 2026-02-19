namespace BlogPost.Api.Models.Domain
{
    public class Comment
    {
        public Guid Id { get; set; }
        public string Content { get; set; } = default!;
        public DateTime CreatedAt { get; set; }
        public Guid UserId { get; set; }
        public Guid PostId { get; set; }
        public User User { get; set; } = default!;
        public Post Post { get; set; } = default!;
    }
}
