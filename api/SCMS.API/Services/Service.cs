using SCMS.API.Interfaces;
using SCMS.DB.Model;
using SCMS.DB.Persistence.Repositories;
using System.Collections.Generic;

namespace SCMS.API.Services
{
  public class Service<TEntity> : IService<TEntity> where TEntity : class
  {
    private readonly Repository<TEntity> Repository;

    public Service(Repository<TEntity> repository)
    {
      Repository = repository;
    }

    public TEntity Get(int id)
    {
      return Repository.Get(id);
    }

    public IEnumerable<TEntity> GetAll()
    {
      return Repository.GetAll();
    }

    public void Add(TEntity entity)
    {
      Repository.Add(entity);
    }

    public void AddRange(IEnumerable<TEntity> entities)
    {
      Repository.AddRange(entities);
    }

    public void Remove(int id)
    {
      var entity = Repository.Get(id);
      Repository.Remove(entity);
    }

    public void RemoveRange(IEnumerable<TEntity> entities)
    {
      Repository.RemoveRange(entities);
    }
  }
}
