namespace BlogPost.Api.Models.Domain
{
    public class User
    {
        public Guid Id { get; set; }
        public string Email { get; set; } = default!;
        public string Password { get; set; } = default!;
        public string Nickname { get; set; } = default!;
        public DateTime CreatedAt { get; set; }
        public Guid? AvatarId { get; set; }
        public Image? Avatar { get; set; } = default!;
    }
}
