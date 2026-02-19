using System.Net;

namespace BlogPost.Api.Exceptions
{
    public class BadRequestException(string message = "Check your data"): BaseException(message, HttpStatusCode.BadRequest)
    {
    }
}
