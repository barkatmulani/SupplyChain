using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SCMS.DB.Models
{
    public partial class Item
    {
        public Item()
        {
            InventoryItem = new HashSet<InventoryItem>();
            PurchaseOrderItem = new HashSet<PurchaseOrderItem>();
            ReceiptItem = new HashSet<ReceiptItem>();
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ItemId { get; set; }
        public bool Active { get; set; }
        public string ItemDescription { get; set; }
        public decimal? Cost { get; set; }
        public decimal? Price { get; set; }

        public ICollection<InventoryItem> InventoryItem { get; set; }
        public ICollection<PurchaseOrderItem> PurchaseOrderItem { get; set; }
        public ICollection<ReceiptItem> ReceiptItem { get; set; }
    }
}
