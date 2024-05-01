using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class CityController : ControllerBase
  {
    // GET api/city
    [HttpGet("api/city")]
    [HttpGet]
    public IEnumerable<string> Getstrings()
    {
      return new string[] { "Atlanta", "New York", "Chicago", "Boston" };
    }
  }
}
