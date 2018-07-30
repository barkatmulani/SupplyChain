using System.Linq;
using System.Collections.Generic;
using SCMS.DB.Models;
using SCMS.DB.Core.Repositories;

namespace SCMS.DB.Persistence.Repositories
{
  public class InventoryItemRepository : Repository<InventoryItem>, IInventoryItemRepository
  {
    public InventoryItemRepository(SCMSContext context) : base(context)
    {
    }

    public SCMSContext SCMSContext
    {
      get { return Context as SCMSContext; }
    }
  }
}
