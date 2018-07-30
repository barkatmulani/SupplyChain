using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SCMS.DB.Models
{
    public partial class Receipt
    {
        public Receipt()
        {
            ReceiptItem = new HashSet<ReceiptItem>();
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ReceiptId { get; set; }
        public DateTime? ReceiptDate { get; set; }
        public int? PurchaseOrderId { get; set; }
        public decimal? ReceiptTotal { get; set; }
        public int? InventoryId { get; set; }
        public decimal? ExtraCost { get; set; }
        public int? StatusId { get; set; }

        public Inventory Inventory { get; set; }
        public PurchaseOrder PurchaseOrder { get; set; }
        public Status Status { get; set; }
        public ICollection<ReceiptItem> ReceiptItem { get; set; }
    }
}
