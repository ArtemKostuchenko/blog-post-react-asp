using BlogPost.Api.Models.DTOs.Images;

namespace BlogPost.Api.Models.DTOs.Users
{
    public class UserDto
    {
        public Guid Id { get; set; }
        public string Nickname { get; set; } = default!;
        public ImageDto? Avatar { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
