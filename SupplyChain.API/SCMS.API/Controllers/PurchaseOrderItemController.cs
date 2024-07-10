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
  public class PurchaseOrderItemController : Controller
  {
    private PurchaseOrderItemRepository _purchaseOrderItemRepository;
    private PurchaseOrderItemService _purchaseOrderItemService;

    public PurchaseOrderItemController(SCMSContext _context)
    {
      var optionBuilder = new DbContextOptions<SCMSContext>();
      
      _purchaseOrderItemRepository = new PurchaseOrderItemRepository(_context);
      _purchaseOrderItemService = new PurchaseOrderItemService(_purchaseOrderItemRepository);
    }

    [EnableCors("SiteCorsPolicy")]
    [HttpGet("{id}")]
    public IEnumerable<PurchaseOrderItem> GetByPurchaseOrderId(int id)
    {
      return _purchaseOrderItemService.GetByPurchaseOrderId(id);
    }
  }
}
