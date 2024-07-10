using SCMS.API.Interfaces;
using SCMS.API.Services;
using SCMS.DB.Models;
using SCMS.DB.Persistence;
using SCMS.DB.Persistence.Repositories;
using System.Collections.Generic;
using System.Linq;

namespace SCMS.API.Service
{
  public class PurchaseOrderService : Service<PurchaseOrder>, IPurchaseOrderService
  {
    Repository<PurchaseOrder> _repository;
    Repository<PurchaseOrderItem> _itemRepository;

    public PurchaseOrderService(Repository<PurchaseOrder> repository,
                                Repository<PurchaseOrderItem> itemRepository) : base(repository)
    {
      _repository = repository;
      _itemRepository = itemRepository;
    }

    public IEnumerable<PurchaseOrder> GetAll(int statusId)
    {
      return _repository.Context.Set<PurchaseOrder>().Where(x => x.StatusId == statusId).ToList();
    }

    public void Update(int id, PurchaseOrder purchaseOrder)
    {
      var purchaseOrderItems = purchaseOrder.PurchaseOrderItem.AsQueryable();
      var oldPurchaseOrderItems = Get(id).PurchaseOrderItem.AsQueryable();

      base.Update(id, purchaseOrder, false);

      /***** Delete Removed Items *****/

      var itemsToDelete = oldPurchaseOrderItems.Where(x => !purchaseOrderItems.Any(y => y.PurchaseOrderItemId == x.PurchaseOrderItemId)).AsEnumerable();
      if(itemsToDelete.Count() > 0)
        _itemRepository.RemoveRange(itemsToDelete);

      /***** Update Old Items *****/

      PurchaseOrderItem oldItem = null;

      foreach (var item in purchaseOrderItems) {
        oldItem = oldPurchaseOrderItems.Where(x => x.PurchaseOrderItemId == item.PurchaseOrderItemId).FirstOrDefault();
        if(oldItem != null)
        {
          _itemRepository.Context.Entry(oldItem).CurrentValues.SetValues(item);
        }
      }

      /***** Add New Item *****/

      var newItems = purchaseOrderItems.Where(x => !oldPurchaseOrderItems.Any(y => y.PurchaseOrderItemId == x.PurchaseOrderItemId));
      if(newItems.Count() > 0)
        _itemRepository.AddRange(newItems);

      var unitOfWork = new UnitOfWork((SCMSContext)_repository.Context);
      unitOfWork.Complete();
    }

    public void Post(int id)
    {
      var purchaseOrder = _repository.Get(id);
      purchaseOrder.StatusId = (int)Status.Posted;
      var unitOfWork = new UnitOfWork((SCMSContext)_repository.Context);
      unitOfWork.Complete();
    }
  }
}
