using SCMS.API.Interfaces;
using SCMS.API.Services;
using SCMS.DB.Models;
using SCMS.DB.Persistence;
using SCMS.DB.Persistence.Repositories;
using System.Collections.Generic;

namespace SCMS.API.Service
{
  public class ItemService : Service<Item>, IItemService
  {
    public ItemService(Repository<Item> repisitory) : base(repisitory)
    {
    }

    public List<Item> GetItemsWithZeroCost()
    {
      return new List<Item>();
    }
  }
}
