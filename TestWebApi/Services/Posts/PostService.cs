using AutoMapper;
using BlogPost.Api.Exceptions;
using BlogPost.Api.Models.Domain;
using BlogPost.Api.Models.DTOs.Posts;
using BlogPost.Api.Repositories.Posts;
using BlogPost.Api.Services.Upload;

namespace BlogPost.Api.Services.Posts
{
    public class PostService(IPostRepository postRepository, IUploadService uploadService, IMapper mapper): IPostService
    {
        private readonly IPostRepository postRepository = postRepository;
        private readonly IUploadService uploadService = uploadService;
        private readonly IMapper mapper = mapper;

        public async Task<AllPostsDto> FindAllAsync(string? search, int page = 1, int limit = 10, string order = "asc", Guid? userId = null)
        {
            var posts = await postRepository.FindAllAsync(search, page, limit, order, userId);

            var postsDto = mapper.Map<IEnumerable<PostDto>>(posts);

            var totalPosts = await postRepository.CountAsync(search, userId);

            return new AllPostsDto
            {
                Posts = postsDto,
                TotalPosts = totalPosts,
                TotalPages = (int)Math.Ceiling((double)totalPosts / limit)
            };
        }

        public async Task<PostDto> FindByIdAsync(Guid id)
        {
            var post = await postRepository.FindByIdAsync(id) ?? throw new NotFoundException("Post not found.");

            return mapper.Map<PostDto>(post);
        }

        public async Task<PostDto> CreateAsync(AddPostRequestDto postDto, Guid userId)
        {
            var post = mapper.Map<Post>(postDto);

            if (postDto.Image != null)
            {
                post.ImageId = await uploadService.UploadImageAsync(postDto.Image, "posts");
            }

            post.UserId = userId;

            var createdPost = await postRepository.CreateAsync(post);

            return mapper.Map<PostDto>(createdPost);
        }

        public async Task<PostDto> UpdateAsync(Guid id, UpdatePostRequestDto postDto, Guid userId)
        {
            var post = await postRepository.FindByIdAsync(id) ?? throw new NotFoundException("Post not found.");

            if (post.UserId != userId) 
            {
                throw new ForbiddenException();
            }

            mapper.Map(postDto, post);

            if (postDto.Image != null)
            {
                post.ImageId = await uploadService.UploadImageAsync(postDto.Image, "posts");
            }

            var updatedPost = await postRepository.UpdateAsync(post);

            return mapper.Map<PostDto>(updatedPost);
        }

        public async Task<PostDto> DeleteAsync(Guid id, Guid userId)
        {
            var post = await postRepository.FindByIdAsync(id) ?? throw new NotFoundException("Post not found.");

            if (post.UserId != userId)
            {
                throw new ForbiddenException();
            }

            var deletedPost = await postRepository.DeleteAsync(post);

            return mapper.Map<PostDto>(deletedPost);
        }
    }
}
