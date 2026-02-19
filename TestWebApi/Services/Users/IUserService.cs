using BlogPost.Api.Models.DTOs.Users;

namespace BlogPost.Api.Services.Users
{
    public interface IUserService
    {
        public Task<T> FindById<T>(Guid id);
        public Task<UpdateUserResponseDto> UpdateAsync(Guid id, UpdateUserRequestDto userDto);
        public Task<UpdateUserResponseDto> UpdateAvatarAsync(Guid id, UpdateUserAvatarRequestDto userDto);
    }
}
