using SCMS.DB.Core.Repositories;
using System;

namespace SCMS.DB.Core
{
  public interface IUnitOfWork : IDisposable
  {
    IItemRepository Items { get; }

    int Complete();
  }
}
