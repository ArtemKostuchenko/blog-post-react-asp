using Microsoft.EntityFrameworkCore;
using BlogPost.Api.Models.Domain;

namespace BlogPost.Api.Data
{
    public class BlogDbContext(DbContextOptions<BlogDbContext> options) : DbContext(options)
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Post> Posts { get; set; } 
        public DbSet<Comment> Comments { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }
        public DbSet<Image> Images { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);


            modelBuilder.Entity<User>().HasIndex(x => x.Email).IsUnique();
            modelBuilder.Entity<User>().Property(x => x.CreatedAt).HasDefaultValueSql("GETDATE()");
            modelBuilder.Entity<Post>().Property(x => x.CreatedAt).HasDefaultValueSql("GETDATE()");
            modelBuilder.Entity<Comment>().Property(x => x.CreatedAt).HasDefaultValueSql("GETDATE()");

            modelBuilder.Entity<Post>().HasMany(x => x.Comments).WithOne(x => x.Post).OnDelete(DeleteBehavior.Cascade);   
        }
    }
}
