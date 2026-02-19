namespace BlogPost.Api.Models.DTOs.Images
{
    public class ImageDto
    {
        public Guid Id { get; set; }
        public string FileName { get; set; } = default!;
        public string Url { get; set; } = default!;
        public string Size { get; set; } = default!;
        public string Extension { get; set; } = default!;
        public DateTime CreatedAt { get; set; } = default!;
    }
}
