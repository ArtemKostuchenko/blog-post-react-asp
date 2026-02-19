namespace BlogPost.Api.Services.Hash
{
    public interface IHashService
    {
        public string HashPassword(string password);
        public bool VerifyPassword(string hashedPassword, string providedPassword);
        public (string token, string hashToken) GenerateToken();
        public string HashToken(string token);
    }
}
