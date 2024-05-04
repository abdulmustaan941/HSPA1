using System.Collections.Generic;
using System.Threading.Tasks;
using WebAPI.Models;

namespace WebAPI.Data.Repo
{
  public interface ICityRepository
  {
    Task<IEnumerable<City>> GetCitiesAsync();
    void AddCity(City city);
    void DeleteCity(int CityId);
    Task<bool> SaveAsync();
  }
}
