using System;
using System.Collections.Generic;

namespace SCMS.DB.Models
{
    public partial class Status
    {
        public Status()
        {
            PurchaseOrder = new HashSet<PurchaseOrder>();
            Receipt = new HashSet<Receipt>();
        }

        public int StatusId { get; set; }
        public string StatusDescription { get; set; }

        public ICollection<PurchaseOrder> PurchaseOrder { get; set; }
        public ICollection<Receipt> Receipt { get; set; }
    }
}
