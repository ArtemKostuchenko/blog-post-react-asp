using BlogPost.Api.Models.DTOs.Auth;

namespace BlogPost.Api.Services.Auth
{
    public interface IAuthService
    {
        public Task<AuthLoginResponseDto> LoginAsync(AuthLoginRequestDto loginRequestDto);
        public Task<AuthRegisterResponseDto> RegisterAsync(AuthRegisterRequestDto registerRequestDto);
        public Task<AuthLogoutResponseDto> LogoutAsync(Guid userId);
        public Task<AuthRefreshTokensResponseDto> RefreshTokensAsync(AuthRefreshTokensRequestDto refreshDto);
    }
}
