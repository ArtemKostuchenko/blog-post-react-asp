using System.Net;

namespace BlogPost.Api.Exceptions
{
    public class ForbiddenException(string message = "Access denied") : BaseException(message, HttpStatusCode.Forbidden)
    {
    }
}
