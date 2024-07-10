using System.Linq;
using System.Collections.Generic;
using SCMS.DB.Models;
using SCMS.DB.Core.Repositories;

namespace SCMS.DB.Persistence.Repositories
{
  public class ItemRepository : Repository<Item>, IItemRepository
  {
    public ItemRepository(SCMSContext context) : base(context)
    {
    }

    public List<Item> GetItemsWithZeroCost()
    {
      return SCMSContext.Item.Where(a => a.Cost == 0).ToList();
    }

    public SCMSContext SCMSContext
    {
      get { return Context as SCMSContext; }
    }
  }
}
