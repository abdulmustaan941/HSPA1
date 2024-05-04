using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using WebAPI.Controllers;
using WebAPI.Data;
using WebAPI.Data.Repo;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<DatabaseContext>(options =>
options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnnection")));
builder.Services.AddControllers();  
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<ICityRepository, CityRepository>();
builder.Services.AddCors();

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

app.Run();
