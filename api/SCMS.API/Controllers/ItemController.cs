using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using SCMS.API.Service;

using Microsoft.EntityFrameworkCore;
using SCMS.DB.Persistence.Repositories;
using SCMS.DB.Models;
using SCMS.DB.Persistence;
using Microsoft.AspNetCore.Cors;

namespace SCMS.API.Controllers
{
  [EnableCors("SiteCorsPolicy")]
  [Route("api/[controller]")]
  public class ItemController : Controller
  {
    private ItemRepository _itemRepository;
    private ItemService _itemService;

    public ItemController(SCMSContext _context)
    {
      var optionBuilder = new DbContextOptions<SCMSContext>();
      
      _itemRepository = new ItemRepository(_context);
      _itemService = new ItemService(_itemRepository);
    }

    [HttpGet]
    public List<Item> GetAll()
    {
      return _itemService.GetAll().ToList();
    }

    [HttpGet("{id}")]
    public Item Get(int id)
    {
      return _itemService.Get(id);
    }

    [EnableCors("SiteCorsPolicy")]
    [HttpPost]
    public IActionResult Post([FromBody]Item item)
    {
      _itemService.Add(item);
      return new JsonResult(item);
    }

    [EnableCors("SiteCorsPolicy")]
    [HttpPut("{id}")]
    public IActionResult Put(int id, [FromBody]Item item)
    {
      _itemService.Update(id, item);
      return new JsonResult(item);
    }

    [EnableCors("SiteCorsPolicy")]
    [HttpDelete("{id}")]
    public void Delete(int id)
    {
      _itemService.Delete(id);
      var unitOfWork = new UnitOfWork(_itemRepository.SCMSContext);
      unitOfWork.Complete();
    }
  }
}
