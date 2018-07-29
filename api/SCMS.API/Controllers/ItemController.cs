using SCMS.API.Service;
using SCMS.DB.Model;
using SCMS.DB.Persistence.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SCMS.API.Controllers
{
  public class ItemController : BaseApiController
  {
    private ItemRepository _itemRepository;
    private ItemService _itemService;

    public ItemController()
    {
      _itemRepository = new ItemRepository(new SCMSContext());
      _itemService = new ItemService(_itemRepository);
    }

    public Item Get(int id)
    {
      return _itemService.Get(id);
    }

    public List<Item> GetAll()
    {
      return _itemService.GetAll().ToList();
    }

    public void Post(Item item)
    {
      _itemService.Add(item);
    }

    public void Put(int id, Item item)
    {
    }

    public void Delete(int id)
    {
      _itemService.Remove(id);
    }
  }
}
