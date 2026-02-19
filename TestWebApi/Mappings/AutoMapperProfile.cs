using AutoMapper;
using BlogPost.Api.Models.Domain;
using BlogPost.Api.Models.DTOs.Auth;
using BlogPost.Api.Models.DTOs.Comments;
using BlogPost.Api.Models.DTOs.Images;
using BlogPost.Api.Models.DTOs.Posts;
using BlogPost.Api.Models.DTOs.Users;

namespace BlogPost.Api.Mappings
{
    public class AutoMapperProfile: Profile
    {
        public AutoMapperProfile() 
        {
            CreateMap<Post, PostDto>().ReverseMap();
            CreateMap<Post, PostShortDto>();
            CreateMap<Post, AddPostRequestDto>();
            CreateMap<AddPostRequestDto, Post>().ForMember(x => x.Image, f => f.Ignore());
            CreateMap<UpdatePostRequestDto, Post>().ForMember(x => x.Image, f => f.Ignore());

            CreateMap<Comment, CommentDto>().ReverseMap();
            CreateMap<Comment, AddCommentRequestDto>().ReverseMap();
            CreateMap<Comment, AddCommentResponseDto>().ReverseMap();
            CreateMap<Comment, UpdateCommentRequestDto>().ReverseMap();
            CreateMap<Comment, UpdateCommentResponseDto>().ReverseMap();
            CreateMap<Comment, DeleteCommentResponseDto>().ReverseMap();


            CreateMap<Image, ImageDto>().ReverseMap();

            CreateMap<User, UserDto>().ReverseMap();
            CreateMap<User, CurrentUserDto>().ReverseMap();
            CreateMap<User, AuthRegisterRequestDto>().ReverseMap();
            CreateMap<User, AuthRegisterResponseDto>().ReverseMap();
            CreateMap<User, AuthLoginRequestDto>().ReverseMap();
            CreateMap<User, AuthLoginResponseDto>().ReverseMap();
            CreateMap<User, UpdateUserRequestDto>().ReverseMap();
            CreateMap<User, UpdateUserResponseDto>().ReverseMap();

            CreateMap<UserDto, AuthLoginRequestDto>().ReverseMap();
            CreateMap<UserDto, AuthRegisterRequestDto>().ReverseMap();
        }
    }
}
