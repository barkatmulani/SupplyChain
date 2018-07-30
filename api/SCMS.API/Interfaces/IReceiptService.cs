using SCMS.DB.Models;
using System.Collections.Generic;

namespace SCMS.API.Interfaces
{
  public interface IReceiptService : IService<Receipt>
  {
    void Update(int id, Receipt receipt);

    void Post(int id);
  }
}
