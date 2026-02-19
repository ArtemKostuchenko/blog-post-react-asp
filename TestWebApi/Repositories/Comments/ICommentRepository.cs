using BlogPost.Api.Models.Domain;

namespace BlogPost.Api.Repositories.Comments
{
    public interface ICommentRepository
    {
        public Task<IEnumerable<Comment>> FindAllAsync(string? search, int page = 1, int limit = 15, string order = "desc", Guid? postId = null, Guid? userId = null);
        public Task<Comment?> FindByIdAsync(Guid id);
        public Task<int> CountAsync(string? search, Guid? postId = null, Guid? userId = null);
        public Task<Comment> CreateAsync(Comment comment);
        public Task<Comment> UpdateAsync(Comment comment);
        public Task<Comment> DeleteAsync(Comment comment);
    }
}
