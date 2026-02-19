namespace BlogPost.Api.Services.Upload
{
    public interface IUploadService
    {
        public Task<Guid> UploadImageAsync(IFormFile file, string directory = "");
    }
}
