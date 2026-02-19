using BlogPost.Api.Models.Domain;
using BlogPost.Api.Models.DTOs.Comments;

namespace BlogPost.Api.Services.Comments
{
    public interface ICommentService
    {
        public Task<CommentDto> FindByIdAsync(Guid id);
        public Task<CommentsDto> FindAllAsync(string? search, int page = 1, int limit = 15, string order = "desc", Guid? postId = null, Guid? userId = null);
        public Task<AddCommentResponseDto> AddToPostAsync(AddCommentRequestDto commentDto, Guid postId, Guid userId);
        public Task<UpdateCommentResponseDto> UpdateAsync(Guid id, UpdateCommentRequestDto commentDto, Guid userId);
        public Task<DeleteCommentResponseDto> DeleteAsync(Guid id, Guid userId);
    }
}
