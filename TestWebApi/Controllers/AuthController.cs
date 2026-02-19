using Microsoft.AspNetCore.Mvc;
using BlogPost.Api.Models.DTOs.Auth;
using BlogPost.Api.Services.Auth;
using Microsoft.AspNetCore.Authorization;

namespace BlogPost.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController(IAuthService authService) : AuthorizedController
    {
        private readonly IAuthService authService = authService;

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] AuthRegisterRequestDto registerDto)
        {
            var createdUser = await authService.RegisterAsync(registerDto);

            return CreatedAtAction(nameof(Register), createdUser);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] AuthLoginRequestDto loginDto)
        {
            var loggedUser = await authService.LoginAsync(loginDto);

            return Ok(loggedUser);
        }

        [HttpPost("logout")]
        [Authorize]
        public async Task<IActionResult> Logout()
        {
            var logoutResult = await authService.LogoutAsync(UserId);

            return Ok(logoutResult);
        }

        [HttpPost("refresh")]
        public async Task<IActionResult> RefreshToken([FromBody] AuthRefreshTokensRequestDto refreshDto) 
        {
            var tokens = await authService.RefreshTokensAsync(refreshDto);

            return Ok(tokens);
        }
    }
}
