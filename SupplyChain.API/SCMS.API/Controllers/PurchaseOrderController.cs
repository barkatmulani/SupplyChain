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
  public class PurchaseOrderController : Controller
  {
    private PurchaseOrderRepository _purchaseOrderRepository;
    private PurchaseOrderItemRepository _purchaseOrderItemRepository;
    private PurchaseOrderService _purchaseOrderService;

    public PurchaseOrderController(SCMSContext _context)
    {
      var optionBuilder = new DbContextOptions<SCMSContext>();
      
      _purchaseOrderRepository = new PurchaseOrderRepository(_context);
      _purchaseOrderItemRepository = new PurchaseOrderItemRepository(_context);
      _purchaseOrderService = new PurchaseOrderService(_purchaseOrderRepository, _purchaseOrderItemRepository);
    }

    [EnableCors("SiteCorsPolicy")]
    [HttpGet("{statusId}/{pageNo}/{rowsPerPage}")]
    public IEnumerable<PurchaseOrder> GetAll(int statusId, int pageNo, int rowsPerPage = 10)
    {
      return _purchaseOrderService.GetAll(statusId);
    }

    [EnableCors("SiteCorsPolicy")]
    [HttpGet("{id}")]
    public PurchaseOrder Get(int id)
    {
      return _purchaseOrderService.Get(id);
    }

    [EnableCors("SiteCorsPolicy")]
    [HttpPost]
    public IActionResult Add([FromBody]PurchaseOrder PurchaseOrder)
    {
      _purchaseOrderService.Add(PurchaseOrder);
      return new JsonResult(PurchaseOrder);
    }

    [EnableCors("SiteCorsPolicy")]
    [HttpPut("{id}")]
    public IActionResult Save(int id, [FromBody]PurchaseOrder purchaseOrder)
    {
      if (purchaseOrder.PurchaseOrderId == 0)
        _purchaseOrderService.Post(id);
      else
        _purchaseOrderService.Update(id, purchaseOrder);
      return new JsonResult(purchaseOrder);
    }

    [EnableCors("SiteCorsPolicy")]
    [HttpDelete("{id}")]
    public void Delete(int id)
    {
      _purchaseOrderService.Delete(id);
    }
  }
}
