using BlogPost.Api.Models.DTOs.Comments;
using BlogPost.Api.Services.Comments;
using BlogPost.Api.Services.Posts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace BlogPost.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController(ICommentService commentService) : AuthorizedController
    {
        private readonly ICommentService commentService = commentService;

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] string? search, [FromQuery] int page = 1, [FromQuery] int limit = 15, [FromQuery] string order = "desc")
        {
            var posts = await commentService.FindAllAsync(search, page, limit, order);

            return Ok(posts);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var comment = await commentService.FindByIdAsync(id);

            return Ok(comment);
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> Update(Guid id, [FromBody] UpdateCommentRequestDto commentDto)
        {
            var updatedComment = await commentService.UpdateAsync(id, commentDto, UserId);

            return Ok(updatedComment);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> Delete(Guid id)
        {
            var deletedComment = await commentService.DeleteAsync(id, UserId);

            return Ok(deletedComment);
        }

        [HttpGet("me")]
        [Authorize]
        public async Task<IActionResult> GetByUser([FromQuery] string? search, [FromQuery] int page = 1, [FromQuery] int limit = 9, [FromQuery] string order = "desc")
        {
            var userComments = await commentService.FindAllAsync(search, page, limit, order, null, UserId);

            return Ok(userComments);
        }
    }
}
