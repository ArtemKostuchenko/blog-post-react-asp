using AutoMapper;
using BlogPost.Api.Models.Domain;
using BlogPost.Api.Models.DTOs.Users;
using BlogPost.Api.Repositories.Users;
using BlogPost.Api.Exceptions;
using BlogPost.Api.Services.Upload;

namespace BlogPost.Api.Services.Users
{
    public class UserService(IUserRepository userRepository, IUploadService uploadService, IMapper mapper) : IUserService
    {
        private readonly IUserRepository userRepository = userRepository;
        private readonly IMapper mapper = mapper;

        public async Task<T> FindById<T>(Guid id)
        {
            var user = await userRepository.FindByIdAsync(id) ?? throw new NotFoundException("User not found");

            return mapper.Map<T>(user);
        }

        public async Task<UpdateUserResponseDto> UpdateAsync(Guid id, UpdateUserRequestDto userDto)
        {
            var user = await userRepository.FindByIdAsync(id) ?? throw new NotFoundException("User not found");

            mapper.Map(userDto, user);

            var updatedUser = await userRepository.UpdateAsync(user);

            return mapper.Map<UpdateUserResponseDto>(updatedUser);
        }

        public async Task<UpdateUserResponseDto> UpdateAvatarAsync(Guid id, UpdateUserAvatarRequestDto userDto)
        {
            var user = await userRepository.FindByIdAsync(id) ?? throw new NotFoundException("User not found");

            var imageId = await uploadService.UploadImageAsync(userDto.Avatar, "profiles");

            user.AvatarId = imageId;

            var updatedUser = await userRepository.UpdateAsync(user);

            return mapper.Map<UpdateUserResponseDto>(updatedUser);
        }
    }
}
