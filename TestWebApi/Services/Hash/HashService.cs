using Microsoft.AspNetCore.Identity;
using System.Security.Cryptography;
using System.Text;

namespace BlogPost.Api.Services.Hash
{
    public class HashService(IPasswordHasher<object> passwordHasher) : IHashService
    {
        public string HashPassword(string password)
        {
            return passwordHasher.HashPassword(new object { }, password);
        }

        public bool VerifyPassword(string hashedPassword, string providedPassword)
        {
            var verifyResult = passwordHasher.VerifyHashedPassword(new object { }, hashedPassword, providedPassword);

            return verifyResult == PasswordVerificationResult.Success || verifyResult == PasswordVerificationResult.SuccessRehashNeeded;
        }

        public (string token, string hashToken) GenerateToken()
        {

            var bytes = RandomNumberGenerator.GetBytes(64);
            var token = Convert.ToBase64String(bytes);
            var hashToken = HashToken(token);

            return (token, hashToken);
        }

        public string HashToken(string token)
        {
            var hashBytes = SHA256.HashData(Encoding.UTF8.GetBytes(token));
            return Convert.ToBase64String(hashBytes);
        }
    }
}
