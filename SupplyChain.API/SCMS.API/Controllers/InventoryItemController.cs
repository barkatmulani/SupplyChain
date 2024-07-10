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
  public class InventoryItemController : Controller
  {
    private InventoryItemRepository _inventoryItemRepository;
    private InventoryItemService _inventoryItemService;

    public InventoryItemController(SCMSContext _context)
    {
      var optionBuilder = new DbContextOptions<SCMSContext>();
      
      _inventoryItemRepository = new InventoryItemRepository(_context);
      _inventoryItemService = new InventoryItemService(_inventoryItemRepository);
    }

    [HttpGet]
    public List<InventoryItem> GetAll()
    {
      return _inventoryItemService.GetAll().ToList();
    }

    [HttpGet("{id}")]
    public InventoryItem Get(int id)
    {
      return _inventoryItemService.Get(id);
    }

    [EnableCors("SiteCorsPolicy")]
    [HttpPost]
    public IActionResult Post([FromBody]InventoryItem InventoryItem)
    {
      _inventoryItemService.Add(InventoryItem);
      return new JsonResult(InventoryItem);
    }

    [EnableCors("SiteCorsPolicy")]
    [HttpPut("{id}")]
    public IActionResult Put(int id, [FromBody]InventoryItem InventoryItem)
    {
      _inventoryItemService.Update(id, InventoryItem);
      return new JsonResult(InventoryItem);
    }

    [EnableCors("SiteCorsPolicy")]
    [HttpDelete("{id}")]
    public void Delete(int id)
    {
      _inventoryItemService.Delete(id);
      var unitOfWork = new UnitOfWork(_inventoryItemRepository.SCMSContext);
      unitOfWork.Complete();
    }
  }
}
