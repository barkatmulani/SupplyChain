using SCMS.DB.Models;
using System.Collections.Generic;

namespace SCMS.API.Interfaces
{
  public interface IPurchaseOrderItemService : IService<PurchaseOrderItem>
  {
    List<PurchaseOrderItem> GetByPurchaseOrderId(int purchaseOrderId);
  }
}
