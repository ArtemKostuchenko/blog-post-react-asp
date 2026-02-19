using BlogPost.Api.Data;
using BlogPost.Api.Models.Domain;
using BlogPost.Api.Models.DTOs.Comments;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;

namespace BlogPost.Api.Repositories.Comments
{
    public class CommentRepository(BlogDbContext db) : ICommentRepository
    {
        private readonly BlogDbContext db = db;

        public async Task<IEnumerable<Comment>> FindAllAsync(string? search, int page = 1, int limit = 15, string order = "desc", Guid? postId = null, Guid? userId = null)
        {
            var comments = db.Comments.Include(x => x.User.Avatar).Include(x => x.Post).AsQueryable();

            if (!string.IsNullOrWhiteSpace(search))
            {
                comments = comments.Where(x => x.Content.Contains(search));
            }

            if(postId != null)
            {
                comments = comments.Where(x => x.PostId == postId);
            }

            if (userId != null)
            {
                comments = comments.Where(x => x.UserId == userId);
            }

            comments = order == "asc" ? comments.OrderBy(x => x.CreatedAt) : comments.OrderByDescending(x => x.CreatedAt);

            var skip = (page - 1) * limit;

            return [.. await comments.Skip(skip).Take(limit).ToListAsync()];
        }

      
        public async Task<Comment?> FindByIdAsync(Guid id)
        {
            return await db.Comments.Include(x => x.User).FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<int> CountAsync(string? search, Guid? postId = null, Guid? userId = null)
        {
            var comments = db.Comments.AsSingleQuery();

            if (!string.IsNullOrWhiteSpace(search))
            {
                comments = comments.Where(x => x.Content.Contains(search));
            }

            if (postId != null)
            {
                comments = comments.Where(x => x.PostId == postId);
            }

            if (userId != null)
            {
                comments = comments.Where(x => x.UserId == userId);
            }

            return await comments.CountAsync();
        }

        public async Task<Comment> CreateAsync(Comment comment)
        {
            comment.CreatedAt = DateTime.Now;
            
            db.Comments.Add(comment);

            await db.SaveChangesAsync();

            return comment;
        }

        public async Task<Comment> UpdateAsync(Comment comment)
        {
            db.Comments.Update(comment);

            await db.SaveChangesAsync();

            return comment;
        }

        public async Task<Comment> DeleteAsync(Comment comment)
        {
            db.Comments.Remove(comment);

            await db.SaveChangesAsync();

            return comment;
        }
    }
}
