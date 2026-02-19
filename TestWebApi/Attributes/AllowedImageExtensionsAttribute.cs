using System.ComponentModel.DataAnnotations;

namespace BlogPost.Api.Attributes
{
    public class AllowedImageExtensionsAttribute(params string[] extensions): ValidationAttribute
    {
        private readonly string[] extensions = extensions ?? [".jpg", ".png"];

        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            var configuration = validationContext.GetService<IConfiguration>();

            string[] exts = configuration?.GetSection("Image:Extensions").Get<string[]>() ?? extensions;


            if (value is IFormFile file)
            {
                var extension = Path.GetExtension(file.FileName).ToLower();

                if(!exts.Contains(extension))
                {
                    return new ValidationResult($"The image extensions is not allowed. Supported extensions: {string.Join(", ", exts)}");

                }
            }

            return ValidationResult.Success;
        }
    }
}
