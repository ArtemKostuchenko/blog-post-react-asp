using System.Net;

namespace BlogPost.Api.Exceptions
{
    public class BaseException(string message, HttpStatusCode statusCode) : Exception(message)
    {
        public HttpStatusCode StatusCode { get; set; } = statusCode;
    }
}
