using System.Linq;
using System.Collections.Generic;
using SCMS.DB.Models;
using SCMS.DB.Core.Repositories;
using Microsoft.EntityFrameworkCore;

namespace SCMS.DB.Persistence.Repositories
{
  public class PurchaseOrderRepository : Repository<PurchaseOrder>, IPurchaseOrderRepository
  {
    public PurchaseOrderRepository(SCMSContext context) : base(context)
    {
    }

    public SCMSContext SCMSContext
    {
      get { return Context as SCMSContext; }
    }

    public override PurchaseOrder Get(int id)
    {
      return SCMSContext.PurchaseOrder.Include(x => x.PurchaseOrderItem).FirstOrDefault(x => x.PurchaseOrderId == id);
    }
  }
}
