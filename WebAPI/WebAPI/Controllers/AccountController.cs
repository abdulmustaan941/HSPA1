using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using WebAPI.Dtos;
using WebAPI.Interfaces;
using WebAPI.Models;
using WebAPI.Errors;

namespace WebAPI.Controllers
{
  public class AccountController : BaseController
  {
    private readonly IUnitOfWork uow;
     private readonly IConfiguration configuration;
    public AccountController(IUnitOfWork uow, IConfiguration configuration)
    {
      this.configuration = configuration;
      this.uow = uow;
    }

    // api/account/login
    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginReqDto loginReq)
    {
      var user = await uow.UserRepository.Authenticate(loginReq.UserName, loginReq.Password);

      ApiError apiError = new ApiError();
      if (user == null)
      {
        apiError.ErrorCode = Unauthorized().StatusCode;
        apiError.ErrorMessage = "Invalid user name or password";
        apiError.ErrorDetails = "This error appear when provided user id or password does not exists";
        return Unauthorized(apiError);
      }

      var loginRes = new LoginResDto();
      loginRes.UserName = user.Username;
      loginRes.Token = CreateJWT(user);
      return Ok(loginRes);
    }

    private string CreateJWT(User user)
    {
      var secretKey = configuration.GetSection("AppSettings:Key").Value;

      var key = new SymmetricSecurityKey(Encoding.UTF8
          .GetBytes("secretkey"));

      var claims = new Claim[] {
                new Claim(ClaimTypes.Name,user.Username),
                new Claim(ClaimTypes.NameIdentifier,user.Id.ToString())
            };

      var signingCredentials = new SigningCredentials(
                key, SecurityAlgorithms.HmacSha256Signature);

      var tokenDescriptor = new SecurityTokenDescriptor
      {
        Subject = new ClaimsIdentity(claims),
        Expires = DateTime.UtcNow.AddMinutes(1),
        SigningCredentials = signingCredentials
      };
      var tokenHandler = new JwtSecurityTokenHandler();
      var token = tokenHandler.CreateToken(tokenDescriptor);
      return tokenHandler.WriteToken(token);
    }
    [HttpPost("register")]
    public async Task<IActionResult> Register(LoginReqDto loginReq)
    {
      ApiError apiError = new ApiError();

      if (string.IsNullOrEmpty(loginReq.UserName.Trim()) ||
          string.IsNullOrEmpty(loginReq.Password.Trim()))
      {
        apiError.ErrorCode = BadRequest().StatusCode;
        apiError.ErrorMessage = "User name or password can not be blank";
        return BadRequest(apiError);
      }

      if (await uow.UserRepository.UserAlreadyExists(loginReq.UserName))
      {
        apiError.ErrorCode = BadRequest().StatusCode;
        apiError.ErrorMessage = "User already exists, please try different user name";
        return BadRequest(apiError);
      }
      return BadRequest(apiError);
    }
  }
}
