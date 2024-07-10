using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SCMS.DB.Models
{
    public partial class PurchaseOrder
    {
        public PurchaseOrder()
        {
            PurchaseOrderItem = new HashSet<PurchaseOrderItem>();
            Receipt = new HashSet<Receipt>();
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int PurchaseOrderId { get; set; }
        public bool? Active { get; set; }
        public DateTime? PurchaseOrderDate { get; set; }
        public decimal? PurchaseOrderTotal { get; set; }
        public int? InventoryId { get; set; }
        public int? VendorId { get; set; }
        public DateTime? EstDeliveryDate { get; set; }
        public decimal? ShipmentCost { get; set; }
        public int? StatusId { get; set; }

        public Inventory Inventory { get; set; }
        public Status Status { get; set; }
        public Vendor Vendor { get; set; }
        public ICollection<PurchaseOrderItem> PurchaseOrderItem { get; set; }
        public ICollection<Receipt> Receipt { get; set; }
    }
}
