using System.Net;

namespace BlogPost.Api.Exceptions
{
    public class UnauthorizedException(string message = "Unauthorized"): BaseException(message, HttpStatusCode.Unauthorized)
    {
    }
}
