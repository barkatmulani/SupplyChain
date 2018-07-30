using System.Linq;
using System.Collections.Generic;
using SCMS.DB.Models;
using SCMS.DB.Core.Repositories;
using Microsoft.EntityFrameworkCore;

namespace SCMS.DB.Persistence.Repositories
{
  public class ReceiptRepository : Repository<Receipt>, IReceiptRepository
  {
    public ReceiptRepository(SCMSContext context) : base(context)
    {
    }

    public SCMSContext SCMSContext
    {
      get { return Context as SCMSContext; }
    }

    public override Receipt Get(int id)
    {
      return SCMSContext.Receipt.Include(x => x.ReceiptItem).FirstOrDefault(x => x.ReceiptId == id);
    }
  }
}
