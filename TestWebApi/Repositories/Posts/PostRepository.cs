using Microsoft.EntityFrameworkCore;
using BlogPost.Api.Data;
using BlogPost.Api.Models.Domain;

namespace BlogPost.Api.Repositories.Posts
{
    public class PostRepository(BlogDbContext db) : IPostRepository
    {
        private readonly BlogDbContext db = db;

        public async Task<IEnumerable<Post>> FindAllAsync(string? search, int page = 1, int limit = 10, string order = "asc", Guid? userId = null)
        {
            var posts = db.Posts.Include(x => x.User.Avatar).Include(x => x.Image).AsQueryable();

            if (!string.IsNullOrWhiteSpace(search))
            {
                posts = posts.Where(x => x.Title.Contains(search) || x.Content.Contains(search));
            }

            if (userId != null)
            {
                posts = posts.Where(x => x.UserId == userId);
            }

            posts = order == "asc" ? posts.OrderBy(x => x.CreatedAt) : posts.OrderByDescending(x => x.CreatedAt);

            var skip = (page - 1) * limit;

            return [.. await posts.Skip(skip).Take(limit).ToListAsync()];
        }

        public async Task<int> CountAsync(string? search, Guid? userId = null)
        {
            var posts = db.Posts.AsSingleQuery();

            if (!string.IsNullOrWhiteSpace(search)) 
            {
                posts = posts.Where(x => x.Title.Contains(search) || x.Content.Contains(search));
            }

            if(userId != null)
            {
                posts = posts.Where(x => x.UserId == userId);
            }

            return await posts.CountAsync();
        }

        public async Task<Post?> FindByIdAsync(Guid id)
        {
            return await db.Posts.Include(x => x.User.Avatar).Include(x => x.Image).FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Post> CreateAsync(Post post)
        {
            post.CreatedAt = DateTime.Now;

            await db.Posts.AddAsync(post);

            await db.SaveChangesAsync();

            return post;
        }

        public async Task<Post> UpdateAsync(Post post)
        {
            db.Posts.Update(post);
            await db.SaveChangesAsync();

            return post;
        }

        public async Task<Post> DeleteAsync(Post post)
        {
           
            db.Posts.Remove(post);
            await db.SaveChangesAsync();

            return post;
        }
    }
}
