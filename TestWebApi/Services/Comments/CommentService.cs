using AutoMapper;
using BlogPost.Api.Exceptions;
using BlogPost.Api.Models.Domain;
using BlogPost.Api.Models.DTOs.Comments;
using BlogPost.Api.Models.DTOs.Posts;
using BlogPost.Api.Repositories.Comments;
using BlogPost.Api.Repositories.Posts;
using Microsoft.Extensions.Hosting;

namespace BlogPost.Api.Services.Comments
{
    public class CommentService(ICommentRepository commentRepository, IPostRepository postRepository, IMapper mapper) : ICommentService
    {
        private readonly ICommentRepository commentRepository = commentRepository;
        private readonly IPostRepository postRepository = postRepository;
        private readonly IMapper mapper = mapper;

        public async Task<CommentsDto> FindAllAsync(string? search, int page = 1, int limit = 15, string order = "desc", Guid? postId = null, Guid? userId = null)
        {
            var comments = await commentRepository.FindAllAsync(search, page, limit, order, postId, userId);

            var commentsDto = mapper.Map<IEnumerable<CommentDto>>(comments);

            var totalComments = await commentRepository.CountAsync(search, postId, userId);

            return new CommentsDto
            {
                Comments = commentsDto,
                TotalComments = totalComments,
                TotalPages = (int)Math.Ceiling((double)totalComments / limit)
            };
        }

        public async Task<CommentDto> FindByIdAsync(Guid id)
        {
            var comment = await commentRepository.FindByIdAsync(id) ?? throw new NotFoundException("Comment not found.");

            return mapper.Map<CommentDto>(comment);
        }

        public async Task<AddCommentResponseDto> AddToPostAsync(AddCommentRequestDto commentDto, Guid postId, Guid userId)
        {
            var post = await postRepository.FindByIdAsync(postId) ?? throw new NotFoundException("Post not found.");

            var comment = mapper.Map<Comment>(commentDto);
            comment.UserId = userId;
            comment.PostId = post.Id;

            var createdComment = await commentRepository.CreateAsync(comment);

            return mapper.Map<AddCommentResponseDto>(createdComment);
        }

        public async Task<UpdateCommentResponseDto> UpdateAsync(Guid id, UpdateCommentRequestDto commentDto, Guid userId)
        {
            var comment = await commentRepository.FindByIdAsync(id) ?? throw new NotFoundException("Comment not found.");

            if(comment.UserId != userId)
            {
                throw new ForbiddenException();
            }

            mapper.Map(commentDto, comment);

            var updatedComment = await commentRepository.UpdateAsync(comment);

            return mapper.Map<UpdateCommentResponseDto>(updatedComment);
        }

        public async Task<DeleteCommentResponseDto> DeleteAsync(Guid id, Guid userId)
        {
            var comment = await commentRepository.FindByIdAsync(id) ?? throw new NotFoundException("Comment not found.");

            if (comment.UserId != userId)
            {
                throw new ForbiddenException();
            }

            var detetedComment = await commentRepository.DeleteAsync(comment);

            return mapper.Map<DeleteCommentResponseDto>(detetedComment);
        }
    }
}
