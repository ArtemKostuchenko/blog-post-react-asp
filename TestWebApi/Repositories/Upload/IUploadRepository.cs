using BlogPost.Api.Models.Domain;

namespace BlogPost.Api.Repositories.Upload
{
    public interface IUploadRepository
    {
        public Task<Guid> CreateImageReference(Image image);
    }
}
