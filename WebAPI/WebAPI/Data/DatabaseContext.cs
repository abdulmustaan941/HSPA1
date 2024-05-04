using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using WebAPI.Models;

namespace WebAPI.Data
{
  public class DatabaseContext : DbContext
  {
    public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options) { }

    public DbSet<City> Cities { get; set; }

  }
}
