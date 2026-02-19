using Microsoft.EntityFrameworkCore;
using BlogPost.Api.Data;
using BlogPost.Api.Models.Domain;

namespace BlogPost.Api.Repositories.Users
{
    public class UserRepository(BlogDbContext db) : IUserRepository
    {
        private readonly BlogDbContext db = db;

        public async Task<User?> FindByIdAsync(Guid id)
        {
            return await db.Users.Include(x => x.Avatar).FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<User?> GetByEmailAsync(string email)
        {
            return await db.Users.FirstOrDefaultAsync(x => x.Email == email);
        }
        public async Task<User> CreateAsync(User user)
        {
            await db.Users.AddAsync(user);

            await db.SaveChangesAsync();

            return user;
        }

        public async Task<User> UpdateAsync(User user)
        {
            db.Users.Update(user);
            await db.SaveChangesAsync();

            return user;
        }
    }
}
