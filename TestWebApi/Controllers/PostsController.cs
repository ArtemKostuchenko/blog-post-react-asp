using BlogPost.Api.Models.DTOs.Comments;
using BlogPost.Api.Models.DTOs.Posts;
using BlogPost.Api.Models.DTOs.Users;
using BlogPost.Api.Services.Comments;
using BlogPost.Api.Services.Posts;
using BlogPost.Api.Services.Users;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace BlogPost.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostsController(IPostService postService, ICommentService commentService) : AuthorizedController
    {
        private readonly IPostService postService = postService;
        private readonly ICommentService commentService = commentService;

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] string? search, [FromQuery] int page = 1, [FromQuery] int limit = 10, [FromQuery] string order = "desc")
        {
            var posts = await postService.FindAllAsync(search, page, limit, order);

            return Ok(posts);
        }

        [HttpGet("me")]
        [Authorize]
        public async Task<IActionResult> GetUserPosts([FromQuery] string? search, [FromQuery] int page = 1, [FromQuery] int limit = 10, [FromQuery] string order = "desc")
        {
            var userPosts = await postService.FindAllAsync(search, page, limit, order, UserId);

            return Ok(userPosts);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id) 
        {
            var post = await postService.FindByIdAsync(id);

            return Ok(post);
        }

        [HttpGet("{id}/comments")]
        public async Task<IActionResult> GetPostComments(Guid id, [FromQuery] string? search, [FromQuery] int page = 1, [FromQuery] int limit = 15, [FromQuery] string order = "desc")
        {
            var postComments = await commentService.FindAllAsync(search, page, limit, order, id);

            return Ok(postComments);
        }

        [HttpPost("{id}/comments")]
        [Authorize]
        public async Task<IActionResult> AddCommentToPost(Guid id, [FromBody] AddCommentRequestDto commentDto)
        {
            var createdComment = await commentService.AddToPostAsync(commentDto, id, UserId);

            return CreatedAtAction(
                nameof(CommentsController.Get),
                "Comments",
                new { id = createdComment.Id },
                createdComment
            );

        }


        [HttpPost]
        [Consumes("multipart/form-data")]
        [Authorize]
        public async Task<IActionResult> Create([FromForm] AddPostRequestDto postDto)
        {
            var createdPost = await postService.CreateAsync(postDto, UserId);

            return CreatedAtAction(nameof(Get), new { id = createdPost.Id}, createdPost);
        }

        [HttpPut("{id}")]
        [Consumes("multipart/form-data")]
        [Authorize]
        public async Task<IActionResult> Update(Guid id, [FromForm] UpdatePostRequestDto postDto)
        {
            var updatedPost = await postService.UpdateAsync(id, postDto, UserId);

            return Ok(updatedPost);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> Delete(Guid id)
        {
            var deletedPost = await postService.DeleteAsync(id, UserId);

            return Ok(deletedPost);
        }
    }
}
