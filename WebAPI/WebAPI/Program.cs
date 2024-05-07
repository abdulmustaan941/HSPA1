using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using WebAPI.Controllers;
using WebAPI.Helpers;
using WebAPI.Data;
using WebAPI.Data.Repo;
using WebAPI.Interfaces;
using WebAPI.Extensions;
using ServiceStack.Text;

internal class Program
{
  private static void Main(string[] args)
  {
    var builder = WebApplication.CreateBuilder(args);

    // Add services to the container.
    builder.Services.AddDbContext<DataContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnnection")));
    builder.Services.AddControllers();
    // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen();
    builder.Services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);
    //builder.Services.AddScoped<ICityRepository, CityRepository>();
    //builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
    builder.Services.AddCors();
    //builder.Services.AddControllers().AddNewtonsoftJson();

    var app = builder.Build();

    // Configure the HTTP request pipeline.
    if (app.Environment.IsDevelopment())
    {
      app.UseSwagger();
      app.UseSwaggerUI();
    }

    app.UseHttpsRedirection();

    app.UseAuthorization();
    app.UseCors(m => m.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
    app.MapControllers();
    //app.ConfigureExceptionHandler(env);
    app.Run();
  }
}
