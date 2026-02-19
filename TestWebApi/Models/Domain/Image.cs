using System.ComponentModel.DataAnnotations.Schema;

namespace BlogPost.Api.Models.Domain
{
    public class Image
    {
        public Guid Id { get; set; }
        [NotMapped]
        public IFormFile File { get; set; } = default!;
        public string FileName { get; set; } = default!;
        public string Url { get; set; } = default!;
        public string Size { get; set; } = default!;
        public string Extension { get; set; } = default!;
        public DateTime CreatedAt { get; set; } = default!;
    }
}
