using BlogPost.Api.Models.DTOs.Users;
using BlogPost.Api.Services.Comments;
using BlogPost.Api.Services.Users;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BlogPost.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController(IUserService userService) : AuthorizedController
    {
        private readonly IUserService userService = userService;

        [HttpPut]
        [Authorize]
        public async Task<IActionResult> UpdateUser([FromBody] UpdateUserRequestDto userDto)
        {
            var updatedUser = await userService.UpdateAsync(UserId, userDto);

            return Ok(updatedUser);
        }

        [HttpGet("me")]
        [Authorize]
        public async Task<IActionResult> GetCurrentUser()
        {
            var currentUser = await userService.FindById<CurrentUserDto>(UserId);

            return Ok(currentUser);
        }


        [HttpPost("update-avatar")]
        [Authorize]
        public async Task<IActionResult> UpdateUserAvatar([FromForm] UpdateUserAvatarRequestDto userDto)
        {
            var updatedUser = await userService.UpdateAvatarAsync(UserId, userDto);

            return Ok(updatedUser);
        }
    }
}
