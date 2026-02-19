using BlogPost.Api.Models.Domain;
using BlogPost.Api.Repositories.Upload;

namespace BlogPost.Api.Services.Upload
{
    public class UploadService(IWebHostEnvironment webHostEnvironment, IUploadRepository uploadRepository) : IUploadService
    {
        private readonly IWebHostEnvironment webHostEnvironment = webHostEnvironment;
        private readonly IUploadRepository uploadRepository = uploadRepository;

        public async Task<Guid> UploadImageAsync(IFormFile file, string directory = "")
        {
            var dirPath = Path.Combine("static", "images");

            if (!string.IsNullOrEmpty(directory))
            {
                dirPath = Path.Combine(dirPath, directory);
            }

            Directory.CreateDirectory(dirPath);

            var fileExtension = Path.GetExtension(file.FileName).ToLowerInvariant();
            var fileName = $"{Guid.NewGuid()}{fileExtension}";
            var filePath = Path.Combine(dirPath, fileName);

           
            using var stream = new FileStream(Path.Combine(webHostEnvironment.ContentRootPath, filePath), FileMode.Create);
            await file.CopyToAsync(stream);

            var url = $"{filePath.Replace("\\", "/")}";

            var image = new Image
            {
                FileName = fileName,
                Url = url,
                Size = file.Length.ToString(),
                Extension = fileExtension,
                CreatedAt = DateTime.Now
            };

            var imageId = await uploadRepository.CreateImageReference(image);

            return imageId;
        }
    }
}
