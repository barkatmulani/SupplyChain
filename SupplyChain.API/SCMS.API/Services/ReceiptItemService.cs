using SCMS.API.Interfaces;
using SCMS.API.Services;
using SCMS.DB.Models;
using SCMS.DB.Persistence;
using SCMS.DB.Persistence.Repositories;
using System.Collections.Generic;

namespace SCMS.API.Service
{
  public class ReceiptItemService : Service<ReceiptItem>, IReceiptItemService
  {
    public ReceiptItemService(Repository<ReceiptItem> repisitory) : base(repisitory)
    {
    }
  }
}
