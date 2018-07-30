using Microsoft.EntityFrameworkCore;
using SCMS.DB.Core;
using SCMS.DB.Core.Repositories;
using SCMS.DB.Models;
using SCMS.DB.Persistence.Repositories;

namespace SCMS.DB.Persistence
{
  public class UnitOfWork : IUnitOfWork
  {
    private readonly SCMSContext _context;
    private DbContext context;

    public UnitOfWork(SCMSContext context)
    {
      _context = context;
      Inventories = new InventoryRepository(_context);
      Items = new ItemRepository(_context);
      Vendors = new VendorRepository(_context);
    }

    public UnitOfWork(DbContext context)
    {
      this.context = context;
    }

    public IInventoryRepository Inventories { get; private set; }
    public IItemRepository Items { get; private set; }
    public IVendorRepository Vendors { get; private set; }

    public int Complete()
    {
      return _context.SaveChanges();
    }

    public void Dispose()
    {
      _context.Dispose();
    }
  }
}
