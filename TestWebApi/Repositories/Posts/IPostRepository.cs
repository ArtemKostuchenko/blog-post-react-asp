using BlogPost.Api.Models.Domain;

namespace BlogPost.Api.Repositories.Posts
{
    public interface IPostRepository
    {
        public Task<IEnumerable<Post>> FindAllAsync(string? search, int page = 1, int limit = 10, string order = "asc", Guid? userId = null);
        public Task<int> CountAsync(string? search, Guid? userId = null);
        public Task<Post?> FindByIdAsync(Guid id);
        public Task<Post> CreateAsync(Post post);
        public Task<Post> UpdateAsync(Post post);
        public Task<Post> DeleteAsync(Post post);
    }
}
