using SCMS.DB.Models;
using System.Collections.Generic;

namespace SCMS.API.Interfaces
{
  public interface IPurchaseOrderService : IService<PurchaseOrder>
  {
    void Update(int id, PurchaseOrder purchaseOrder);

    void Post(int id);
  }
}
