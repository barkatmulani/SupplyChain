using SCMS.DB.Models;
using System.Collections.Generic;

namespace SCMS.DB.Core.Repositories
{
  public interface IItemRepository : IRepository<Item>
  {
    List<Item> GetItemsWithZeroCost();
  }
}
