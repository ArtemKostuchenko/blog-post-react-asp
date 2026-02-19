using System;
using System.Net;
using BlogPost.Api.Exceptions;

namespace BlogPost.Api.Middlewares
{
    public class ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger)
    {
        private readonly RequestDelegate next = next;
        private readonly ILogger<ExceptionMiddleware> logger = logger;

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await next(context);
            }
            catch(BaseException ex)
            {
                await HandleApiExcepetionAsync(context, ex);
            }
            catch(Exception ex)
            {
                await HandleInternalServerException(context, ex);
            }
        }

        public async Task HandleApiExcepetionAsync(HttpContext context, BaseException exception)
        {
            logger.LogError(exception, "Api Exception: {Message}", exception.Message);

            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)exception.StatusCode;

            var errors = exception.Message.Split(";");

            var response = new { success = false, data = null as object, errors };

            await context.Response.WriteAsJsonAsync(response);
        }

        public async Task HandleInternalServerException(HttpContext context, Exception exception)
        {
            logger.LogError(exception, "Internal Server Error: {Message}", exception.Message);

            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

            var response = new { success = false, data = null as object, errors = new[] { "An error occurred while processing your request" } };

            await context.Response.WriteAsJsonAsync(response);
        }
    }
}
