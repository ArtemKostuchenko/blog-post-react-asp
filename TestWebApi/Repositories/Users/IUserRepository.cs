using BlogPost.Api.Models.Domain;

namespace BlogPost.Api.Repositories.Users
{
    public interface IUserRepository
    {
        public Task<User?> FindByIdAsync(Guid id);
        public Task<User?> GetByEmailAsync(string email);
        public Task<User> CreateAsync(User user);
        public Task<User> UpdateAsync(User user);
    }
}
