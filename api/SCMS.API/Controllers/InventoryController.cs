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
  public class InventoryController : Controller
  {
    private InventoryRepository _inventoryRepository;
    private InventoryItemRepository _inventoryItemRepository;
    private InventoryService _inventoryService;

    public InventoryController(SCMSContext _context)
    {
      var optionBuilder = new DbContextOptions<SCMSContext>();
      
      _inventoryRepository = new InventoryRepository(_context);
      _inventoryService = new InventoryService(_inventoryRepository, _inventoryItemRepository);
    }

    [EnableCors("SiteCorsPolicy")]
    [HttpGet]
    public List<Inventory> GetAll()
    {
      return _inventoryService.GetAll().ToList();
    }

    [EnableCors("SiteCorsPolicy")]
    [HttpGet("{id}")]
    public Inventory Get(int id)
    {
      return _inventoryService.Get(id);
    }

    [EnableCors("SiteCorsPolicy")]
    [HttpPost]
    public IActionResult Post([FromBody]Inventory Inventory)
    {
      _inventoryService.Add(Inventory);
      return new JsonResult(Inventory);
    }

    [EnableCors("SiteCorsPolicy")]
    [HttpPut("{id}")]
    public IActionResult Put(int id, [FromBody]Inventory Inventory)
    {
      _inventoryService.Update(id, Inventory);
      return new JsonResult(Inventory);
    }

    [EnableCors("SiteCorsPolicy")]
    [HttpDelete("{id}")]
    public void Delete(int id)
    {
      _inventoryService.Delete(id);
      var unitOfWork = new UnitOfWork(_inventoryRepository.SCMSContext);
      unitOfWork.Complete();
    }
  }
}
