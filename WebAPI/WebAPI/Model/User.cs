using System.ComponentModel.DataAnnotations;

namespace WebAPI.Models
{
  public class User : BaseEntity
  {
    public int Id { get; set; }
    [Required]
    public string Username { get; set; }
    [Required]
    public int[] Password { get; set; }
   // public int[] passwordkey { get; set; }

  }
}
