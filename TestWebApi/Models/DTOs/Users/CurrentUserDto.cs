using BlogPost.Api.Models.DTOs.Images;

namespace BlogPost.Api.Models.DTOs.Users
{
    public class CurrentUserDto
    {
        public Guid Id { get; set; }
        public string Email { get; set; } = default!;
        public string Nickname { get; set; } = default!;
        public ImageDto? Avatar { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
