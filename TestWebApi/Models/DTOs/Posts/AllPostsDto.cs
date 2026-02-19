using BlogPost.Api.Models.Domain;
using BlogPost.Api.Models.DTOs.Comments;
using BlogPost.Api.Models.DTOs.Images;
using BlogPost.Api.Models.DTOs.Users;

namespace BlogPost.Api.Models.DTOs.Posts
{
    public class AllPostsDto
    {
        public IEnumerable<PostDto> Posts { get; set; } = default!;
        public int TotalPosts { get; set; }
        public int TotalPages { get; set; }
    }
}
