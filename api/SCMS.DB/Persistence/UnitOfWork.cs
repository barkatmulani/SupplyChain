using SCMS.DB.Core;
using SCMS.DB.Core.Repositories;
using SCMS.DB.Model;
using SCMS.DB.Persistence.Repositories;

namespace SCMS.DB.Persistence
{
  public class UnitOfWork : IUnitOfWork
  {
    private readonly SCMSContext _context;

    public UnitOfWork(SCMSContext context)
    {
      _context = context;
      Items = new ItemRepository(_context);
    }

    public IItemRepository Items { get; private set; }

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
