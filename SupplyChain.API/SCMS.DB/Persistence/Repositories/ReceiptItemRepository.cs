using System.Linq;
using System.Collections.Generic;
using SCMS.DB.Models;
using SCMS.DB.Core.Repositories;

namespace SCMS.DB.Persistence.Repositories
{
  public class ReceiptItemRepository : Repository<ReceiptItem>, IReceiptItemRepository
  {
    public ReceiptItemRepository(SCMSContext context) : base(context)
    {
    }

    public SCMSContext SCMSContext
    {
      get { return Context as SCMSContext; }
    }
  }
}
