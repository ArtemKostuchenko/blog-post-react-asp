using System.ComponentModel.DataAnnotations;

namespace BlogPost.Api.Attributes
{
    public class MaxImageSizeAttribute(int maxFileSize = 10 * 1024 * 1024): ValidationAttribute
    {
        private readonly int maxFileSize = maxFileSize;

        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            var configuration = validationContext.GetService<IConfiguration>();

            int size = int.Parse(configuration?["Image:MaxFileSize"] ?? maxFileSize.ToString());

            if (value is IFormFile file && file.Length > size)
            {
                return new ValidationResult($"Maximum allowed size of image is {size}");
            }

            return ValidationResult.Success;
        }
    }
}
