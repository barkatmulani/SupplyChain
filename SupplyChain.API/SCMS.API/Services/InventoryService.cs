using SCMS.API.Interfaces;
using SCMS.API.Services;
using SCMS.DB.Models;
using SCMS.DB.Persistence;
using SCMS.DB.Persistence.Repositories;
using System.Collections.Generic;
using System.Linq;

namespace SCMS.API.Service
{
  public class InventoryService : Service<Inventory>, IInventoryService
  {
    Repository<Inventory> _repository;
    Repository<InventoryItem> _itemRepository;

    public InventoryService(Repository<Inventory> repository,
                            Repository<InventoryItem> itemRepository) : base(repository)
    {
      _repository = repository;
      _itemRepository = itemRepository;
    }

    public new void Update(int id, Inventory inventory)
    {
      var inventoryItems = inventory.InventoryItem.AsQueryable();
      var oldInventoryItems = Get(id).InventoryItem.AsQueryable();

      base.Update(id, inventory, false);

      /***** Delete Removed Items *****/

      var itemsToDelete = oldInventoryItems.Where(x => !inventoryItems.Any(y => y.InventoryItemId == x.InventoryItemId)).AsEnumerable();
      if (itemsToDelete.Count() > 0)
        _itemRepository.RemoveRange(itemsToDelete);

      /***** Update Old Items *****/

      InventoryItem oldItem = null;

      foreach (var item in inventoryItems)
      {
        oldItem = oldInventoryItems.Where(x => x.InventoryItemId == item.InventoryItemId).FirstOrDefault();
        if (oldItem != null)
        {
          _itemRepository.Context.Entry(oldItem).CurrentValues.SetValues(item);
        }
      }

      /***** Add New Item *****/

      var newItems = inventoryItems.Where(x => !oldInventoryItems.Any(y => y.InventoryItemId == x.InventoryItemId));
      if (newItems.Count() > 0)
        _itemRepository.AddRange(newItems);

      var unitOfWork = new UnitOfWork((SCMSContext)_repository.Context);
      unitOfWork.Complete();
    }
  }
}
