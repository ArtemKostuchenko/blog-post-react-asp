using System.Net;

namespace BlogPost.Api.Exceptions
{
    public class NotFoundException(string message = "Resource not found"): BaseException(message, HttpStatusCode.NotFound)
    {
    }
}
