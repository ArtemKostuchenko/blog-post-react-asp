using BlogPost.Api.Models.Domain;
using BlogPost.Api.Models.DTOs.Posts;
using BlogPost.Api.Models.DTOs.Users;

namespace BlogPost.Api.Models.DTOs.Comments
{
    public class CommentDto
    {
        public Guid Id { get; set; }
        public string Content { get; set; } = default!;
        public DateTime CreatedAt { get; set; }
        public UserDto User { get; set; } = default!;
        public PostShortDto? Post { get; set; } = default!;
    }
}
