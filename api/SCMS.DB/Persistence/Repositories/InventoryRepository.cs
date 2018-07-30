using System.Linq;
using System.Collections.Generic;
using SCMS.DB.Models;
using SCMS.DB.Core.Repositories;
using Microsoft.EntityFrameworkCore;

namespace SCMS.DB.Persistence.Repositories
{
  public class InventoryRepository : Repository<Inventory>, IInventoryRepository
  {
    public InventoryRepository(SCMSContext context) : base(context)
    {
    }

    public SCMSContext SCMSContext
    {
      get { return Context as SCMSContext; }
    }

    public override Inventory Get(int id)
    {
      return SCMSContext.Inventory.Include(x => x.InventoryItem).FirstOrDefault(x => x.InventoryId == id);
    }
  }
}
