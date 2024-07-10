using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SCMS.DB.Models
{
    public partial class Inventory
    {
        public Inventory()
        {
            InventoryItem = new HashSet<InventoryItem>();
            PurchaseOrder = new HashSet<PurchaseOrder>();
            Receipt = new HashSet<Receipt>();
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int InventoryId { get; set; }
        public bool Active { get; set; }
        public string InventoryDescription { get; set; }
        public string Address { get; set; }

        public ICollection<InventoryItem> InventoryItem { get; set; }
        public ICollection<PurchaseOrder> PurchaseOrder { get; set; }
        public ICollection<Receipt> Receipt { get; set; }
    }
}
