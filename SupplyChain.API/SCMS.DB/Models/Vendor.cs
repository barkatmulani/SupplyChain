using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SCMS.DB.Models
{
    public partial class Vendor
    {
        public Vendor()
        {
            PurchaseOrder = new HashSet<PurchaseOrder>();
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int VendorId { get; set; }
        public bool? Active { get; set; }
        public string VendorName { get; set; }
        public string Address { get; set; }
        public string PhoneNo { get; set; }

        public ICollection<PurchaseOrder> PurchaseOrder { get; set; }
    }
}
