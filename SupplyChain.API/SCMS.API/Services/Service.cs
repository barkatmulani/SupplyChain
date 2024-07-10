using SCMS.API.Interfaces;
using SCMS.DB.Models;
using SCMS.DB.Persistence;
using SCMS.DB.Persistence.Repositories;
using System;
using System.Collections.Generic;

namespace SCMS.API.Services
{
  public class Service<TEntity> : IService<TEntity> where TEntity : class
  {
    private readonly Repository<TEntity> _repository;

    public Service(Repository<TEntity> repository)
    {
      _repository = repository;
    }

    public TEntity Get(int id)
    {
      return _repository.Get(id);
    }

    public IEnumerable<TEntity> GetAll()
    {
      return _repository.GetAll();
    }

    public virtual void Add(TEntity entity)
    {
      _repository.Add(entity);
      var unitOfWork = new UnitOfWork((SCMSContext)_repository.Context);
      unitOfWork.Complete();
    }

    public virtual void Update(int id, TEntity entity, bool markComplete = true)
    {
      var a = entity.GetType().GetProperties();
      var oldEntity = _repository.Get(id);

      foreach (var propInfo in entity.GetType().GetProperties()) {
        var val = propInfo.GetValue(entity);
        var type = propInfo.PropertyType;
        if (!type.Name.Equals("ICollection`1"))
        {
          if (type.IsGenericType && type.GetGenericTypeDefinition().Equals(typeof(Nullable<>)))
          {
            if (entity != null)
              type = Nullable.GetUnderlyingType(type);
          }
          var value = Convert.ChangeType(val, type);
          propInfo.SetValue(oldEntity, value);
        }
      }

      if (markComplete)
      {
        var unitOfWork = new UnitOfWork((SCMSContext)_repository.Context);
        unitOfWork.Complete();
      }
    }

    public virtual void Delete(int id, bool markComplete = true)
    {
      var entity = _repository.Get(id);
      _repository.Remove(entity);
      if (markComplete)
      {
        var unitOfWork = new UnitOfWork((SCMSContext)_repository.Context);
        unitOfWork.Complete();
      }
    }
  }
}
