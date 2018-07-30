using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SCMS.DB.Models
{
    public partial class PurchaseOrderItem
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int PurchaseOrderItemId { get; set; }
        public int? PurchaseOrderId { get; set; }
        public int? ItemId { get; set; }
        public int? Quantity { get; set; }
        public decimal? Cost { get; set; }
        public decimal? TotalCost { get; set; }

        public Item Item { get; set; }
        public PurchaseOrder PurchaseOrder { get; set; }
    }
}
