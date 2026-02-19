namespace BlogPost.Api.Models.Domain
{
    public class RefreshToken
    {
        public Guid Id { get; set; }
        public string TokenHash { get; set; } = default!;
        public DateTime CreatedAt { get; set; } = default!;
        public DateTime ExpiredAt { get; set; } = default!;
        public DateTime? RevokedAt { get; set; }
        public Guid? ReplacedByTokenId { get; set; }
        public Guid UserId { get; set; } = default!;
        public User User { get; set; } = default!;
    }
}
