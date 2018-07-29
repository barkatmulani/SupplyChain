using SCMS.DB.Model;
using System.Collections.Generic;

namespace SCMS.API.Interfaces
{
  public interface IItemService : IService<Item>
  {
    List<Item> GetItemsWithZeroCost();
  }
}
