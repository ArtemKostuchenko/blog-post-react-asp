using BlogPost.Api.Models.Domain;
using BlogPost.Api.Models.DTOs.Comments;
using BlogPost.Api.Models.DTOs.Images;
using BlogPost.Api.Models.DTOs.Users;

namespace BlogPost.Api.Models.DTOs.Posts
{
    public class PostDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = default!;
        public string Content { get; set; } = default!;
        public DateTime CreatedAt { get; set; }
        public UserDto User { get; set; } = default!;
        public ImageDto? Image { get; set; } = default!;
        public IEnumerable<CommentDto> Comments { get; set; } = default!;
    }
}
