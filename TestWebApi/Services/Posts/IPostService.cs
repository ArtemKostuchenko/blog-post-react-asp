using BlogPost.Api.Models.DTOs.Posts;

namespace BlogPost.Api.Services.Posts
{
    public interface IPostService
    {
        public Task<AllPostsDto> FindAllAsync(string? search, int page = 1, int limit = 10, string order = "asc", Guid? userId = null);
        public Task<PostDto> FindByIdAsync(Guid id);
        public Task<PostDto> CreateAsync(AddPostRequestDto postDto, Guid userId);
        public Task<PostDto> UpdateAsync(Guid id, UpdatePostRequestDto postDto, Guid userId);
        public Task<PostDto> DeleteAsync(Guid id, Guid userId);
    }
}
