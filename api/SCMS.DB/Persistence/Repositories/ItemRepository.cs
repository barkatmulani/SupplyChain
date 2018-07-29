using SCMS.DB.Model;
using SCMS.DB.Core.Repositories;
using System.Data.Entity;
using System.Linq;
using System.Collections.Generic;

namespace SCMS.DB.Persistence.Repositories
{
  public class ItemRepository : Repository<Item>, IItemRepository
  {
    public ItemRepository(SCMSContext context) : base(context)
    {
    }

    public List<Item> GetItemsWithZeroCost()
    {
      return SCMSContext.Items.Include(a => a.Cost == 0).ToList();
    }

    public SCMSContext SCMSContext
    {
      get { return Context as SCMSContext; }
    }
  }
}
