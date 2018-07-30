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
  public class VendorController : Controller
  {
    private VendorRepository _vendorRepository;
    private VendorService _vendorService;

    public VendorController(SCMSContext _context)
    {
      var optionBuilder = new DbContextOptions<SCMSContext>();

      _vendorRepository = new VendorRepository(_context);
      _vendorService = new VendorService(_vendorRepository);
    }

    [EnableCors("SiteCorsPolicy")]
    [HttpGet]
    public List<Vendor> GetAll()
    {
      return _vendorService.GetAll().ToList();
    }

    [EnableCors("SiteCorsPolicy")]
    [HttpGet("{id}")]
    public Vendor Get(int id)
    {
      return _vendorService.Get(id);
    }

    [EnableCors("SiteCorsPolicy")]
    [HttpPost]
    public IActionResult Post([FromBody]Vendor vendor)
    {
      _vendorService.Add(vendor);
      return new JsonResult(vendor);
    }

    [EnableCors("SiteCorsPolicy")]
    [HttpPut("{id}")]
    public IActionResult Put(int id, [FromBody]Vendor vendor)
    {
      _vendorService.Update(id, vendor);
      return new JsonResult(vendor);
    }

    [EnableCors("SiteCorsPolicy")]
    [HttpDelete("{id}")]
    public void Delete(int id)
    {
      _vendorService.Delete(id);
      var unitOfWork = new UnitOfWork(_vendorRepository.SCMSContext);
      unitOfWork.Complete();
    }
  }
}
