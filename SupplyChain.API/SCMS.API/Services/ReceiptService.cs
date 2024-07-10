using SCMS.API.Interfaces;
using SCMS.API.Services;
using SCMS.DB.Models;
using SCMS.DB.Persistence;
using SCMS.DB.Persistence.Repositories;
using System.Linq;

namespace SCMS.API.Service
{
  public class ReceiptService : Service<Receipt>, IReceiptService
  {
    Repository<Receipt> _repository;
    Repository<ReceiptItem> _itemRepository;
    InventoryItemRepository _inventoryItemRepository;

    public ReceiptService(Repository<Receipt> repository,
                          Repository<ReceiptItem> itemRepository,
                          InventoryItemRepository inventoryItemRepository) : base(repository)
    {
      _repository = repository;
      _itemRepository = itemRepository;
      _inventoryItemRepository = inventoryItemRepository;
    }

    public void Update(int id, Receipt receipt)
    {
      var receiptItems = receipt.ReceiptItem.AsQueryable();
      var oldReceiptItems = Get(id).ReceiptItem.AsQueryable();

      base.Update(id, receipt, false);

      /***** Delete Removed Items *****/

      var itemsToDelete = oldReceiptItems.Where(x => !receiptItems.Any(y => y.ReceiptItemId == x.ReceiptItemId)).AsEnumerable();
      if (itemsToDelete.Count() > 0)
        _itemRepository.RemoveRange(itemsToDelete);

      /***** Update Old Items *****/

      ReceiptItem oldItem = null;

      foreach (var item in receiptItems)
      {
        oldItem = oldReceiptItems.Where(x => x.ReceiptItemId == item.ReceiptItemId).FirstOrDefault();
        if (oldItem != null)
        {
          _itemRepository.Context.Entry(oldItem).CurrentValues.SetValues(item);
        }
      }

      /***** Add New Item *****/

      var newItems = receiptItems.Where(x => !oldReceiptItems.Any(y => y.ReceiptItemId == x.ReceiptItemId));
      if (newItems.Count() > 0)
        _itemRepository.AddRange(newItems);

      var unitOfWork = new UnitOfWork((SCMSContext)_repository.Context);
      unitOfWork.Complete();
    }

    public void Post(int id)
    {
      var receipt = _repository.Get(id);
      receipt.StatusId = (int)Status.Posted;

      int totalQuantity;
      decimal totalCost;

      foreach (var item in receipt.ReceiptItem)
      {
        var newItem = new InventoryItem();

        var oldItem = _inventoryItemRepository.Get(item.ItemId.Value);

        totalQuantity = oldItem != null ? oldItem.TotalQuantity.Value : 0;
        totalCost = oldItem != null ? oldItem.TotalCost.Value : 0;

        newItem.ItemId = item.ItemId;
        newItem.InventoryId = receipt.InventoryId;
        newItem.TotalCost = totalCost + item.TotalCost;
        newItem.TotalQuantity = totalQuantity  + item.Quantity;
        newItem.AvgCost = newItem.TotalCost / newItem.TotalQuantity;

        if (oldItem == null)
          _inventoryItemRepository.Add(newItem);
        else
          _inventoryItemRepository.Context.Entry(oldItem).CurrentValues.SetValues(newItem);
      }

      var unitOfWork = new UnitOfWork((SCMSContext)_repository.Context);
      unitOfWork.Complete();
    }
  }
}
