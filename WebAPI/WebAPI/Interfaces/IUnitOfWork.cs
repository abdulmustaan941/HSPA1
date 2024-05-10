using System.Threading.Tasks;
using WebAPI.Data.Repo;

namespace WebAPI.Interfaces
{
  public interface IUnitOfWork
  {
    ICityRepository CityRepository { get; }
    IUserRepository UserRepository { get; }
    IPropertyRepository PropertyRepository { get; }
    IFurnishingTypeRepository FurnishingTypeRepository {get; }

     IPropertyTypeRepository PropertyTypeRepository {get; }
    Task<bool> SaveAsync();
  }
}
