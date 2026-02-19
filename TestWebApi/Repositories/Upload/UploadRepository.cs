using BlogPost.Api.Data;
using BlogPost.Api.Models.Domain;

namespace BlogPost.Api.Repositories.Upload
{
    public class UploadRepository(BlogDbContext db) : IUploadRepository
    {
        private readonly BlogDbContext db = db;
        public async Task<Guid> CreateImageReference(Image image)
        {
            db.Images.Add(image);

            await db.SaveChangesAsync();

            return image.Id;
        }
    }
}
