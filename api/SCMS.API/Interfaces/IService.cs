using System;
using System.Collections.Generic;

namespace SCMS.API.Interfaces
{
  public interface IService<TEntity> where TEntity : class
  {
    TEntity Get(int id);
    IEnumerable<TEntity> GetAll();
    void Add(TEntity entity);
    void Update(int id, TEntity entity, bool markComplete);
    void Delete(int id, bool markComplete);
  }
}
