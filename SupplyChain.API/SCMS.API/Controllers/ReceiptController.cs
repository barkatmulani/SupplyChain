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
  public class ReceiptController : Controller
  {
    private ReceiptRepository _receiptRepository;
    private ReceiptItemRepository _receiptItemRepository;
    private InventoryItemRepository _inventoryItemRepository;
    private ReceiptService _receiptService;

    public ReceiptController(SCMSContext _context)
    {
      var optionBuilder = new DbContextOptions<SCMSContext>();
      
      _receiptRepository = new ReceiptRepository(_context);
      _receiptItemRepository = new ReceiptItemRepository(_context);
      _inventoryItemRepository = new InventoryItemRepository(_context);
      _receiptService = new ReceiptService(_receiptRepository, _receiptItemRepository, _inventoryItemRepository);
    }

    [EnableCors("SiteCorsPolicy")]
    [HttpGet("{statusId}/{pageNo}/{rowsPerPage}")]
    public IEnumerable<Receipt> GetAll(int statusId, int pageNo, int rowsPerPage = 10)
    {
      return _receiptRepository.Context.Set<Receipt>().Where(x => x.StatusId == statusId).ToList();
    }

    [EnableCors("SiteCorsPolicy")]
    [HttpGet("{id}")]
    public Receipt Get(int id)
    {
      return _receiptService.Get(id);
    }

    [EnableCors("SiteCorsPolicy")]
    [HttpPost]
    public IActionResult Add([FromBody]Receipt receipt)
    {
      _receiptService.Add(receipt);
      return new JsonResult(receipt);
    }

    [EnableCors("SiteCorsPolicy")]
    [HttpPut("{id}")]
    public IActionResult Save(int id, [FromBody]Receipt receipt)
    {
      if (receipt.ReceiptId == 0)
        _receiptService.Post(id);
      else
        _receiptService.Update(id, receipt);
      return new JsonResult(receipt);
    }

    [EnableCors("SiteCorsPolicy")]
    [HttpDelete("{id}")]
    public void Delete(int id)
    {
      _receiptService.Delete(id);
    }
  }
}
