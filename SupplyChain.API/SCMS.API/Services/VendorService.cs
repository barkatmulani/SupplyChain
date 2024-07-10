using SCMS.API.Interfaces;
using SCMS.API.Services;
using SCMS.DB.Models;
using SCMS.DB.Persistence;
using SCMS.DB.Persistence.Repositories;
using System.Collections.Generic;

namespace SCMS.API.Service
{
  public class VendorService : Service<Vendor>, IVendorService
  {
    public VendorService(Repository<Vendor> repisitory) : base(repisitory)
    {
    }
  }
}
