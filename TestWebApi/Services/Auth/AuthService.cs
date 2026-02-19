using AutoMapper;
using BlogPost.Api.Exceptions;
using BlogPost.Api.Models.Domain;
using BlogPost.Api.Models.DTOs.Auth;
using BlogPost.Api.Repositories.Users;
using BlogPost.Api.Services.Hash;
using BlogPost.Api.Services.Tokens;

namespace BlogPost.Api.Services.Auth
{
    public class AuthService(IUserRepository userRepository, IHashService hashService, ITokenService tokenService, IMapper mapper): IAuthService
    {
        private readonly IUserRepository userRepository = userRepository;
        private readonly IHashService hashService = hashService;
        private readonly ITokenService tokenService = tokenService;
        private readonly IMapper mapper = mapper;

        public async Task<AuthLoginResponseDto> LoginAsync(AuthLoginRequestDto loginRequestDto)
        {
            var user = await userRepository.GetByEmailAsync(loginRequestDto.Email) ?? throw new BadRequestException("Incorrect email or password.");


            if (!hashService.VerifyPassword(user.Password, loginRequestDto.Password))
            {
                throw new BadRequestException("Incorrect email or password.");
            }

            var (accessToken, refreshToken) = await tokenService.CreateTokensAsync(user.Id);

            var response = mapper.Map<AuthLoginResponseDto>(user);

            response.AccessToken = accessToken;
            response.RefreshToken = refreshToken;

            return response;
        }

        public async Task<AuthRegisterResponseDto> RegisterAsync(AuthRegisterRequestDto registerRequestDto)
        {
            var user = await userRepository.GetByEmailAsync(registerRequestDto.Email);

            if(user != null)
            {
                throw new BadRequestException("User already exists with this email.");
            }

            registerRequestDto.Password = hashService.HashPassword(registerRequestDto.Password);

            var createdUser = await userRepository.CreateAsync(mapper.Map<User>(registerRequestDto));

            var (accessToken, refreshToken) = await tokenService.CreateTokensAsync(createdUser.Id);

            var response = mapper.Map<AuthLoginResponseDto>(createdUser);

            response.AccessToken = accessToken;
            response.RefreshToken = refreshToken;

            return response;
        }

        public async Task<AuthLogoutResponseDto> LogoutAsync(Guid userId)
        {
            await tokenService.RevokeTokens(userId);

            return new AuthLogoutResponseDto
            {
                Success = true,
            };
        }

        public async Task<AuthRefreshTokensResponseDto> RefreshTokensAsync(AuthRefreshTokensRequestDto refreshDto)
        {
            var (accessToken, refreshToken) = await tokenService.RefreshTokenAsync(refreshDto.RefreshToken);

            return new AuthRefreshTokensResponseDto
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken
            };
        }
    }
}
