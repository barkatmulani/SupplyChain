using SCMS.API.Interfaces;
using SCMS.API.Services;
using SCMS.DB.Models;
using SCMS.DB.Persistence;
using SCMS.DB.Persistence.Repositories;
using System.Collections.Generic;
using System.Linq;

namespace SCMS.API.Service
{
  public class PurchaseOrderItemService : Service<PurchaseOrderItem>, IPurchaseOrderItemService
  {
    Repository<PurchaseOrderItem> _repository;

    public PurchaseOrderItemService(Repository<PurchaseOrderItem> repository) : base(repository)
    {
      _repository = repository;
    }

    public List<PurchaseOrderItem> GetByPurchaseOrderId(int purchaseOrderId)
    {
      return _repository.Context.Set<PurchaseOrderItem>().Where(x => x.PurchaseOrderId == purchaseOrderId).ToList();
    }
  }
}
