using System;
using System.Collections.Generic;

namespace SCMS.API.Interfaces
{
  public interface IService<TEntity> where TEntity : class
  {
    TEntity Get(int id);
    IEnumerable<TEntity> GetAll();

    void Add(TEntity entity);
    void AddRange(IEnumerable<TEntity> entities);

    void Remove(int id);
    void RemoveRange(IEnumerable<TEntity> entities);
  }
}
