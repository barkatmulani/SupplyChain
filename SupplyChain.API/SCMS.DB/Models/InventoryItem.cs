using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SCMS.DB.Models
{
    public partial class InventoryItem
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int InventoryItemId { get; set; }
        public int? InventoryId { get; set; }
        public int? ItemId { get; set; }
        public int? TotalQuantity { get; set; }
        public decimal? TotalCost { get; set; }
        public decimal? AvgCost { get; set; }

        public Inventory Inventory { get; set; }
        public Item Item { get; set; }
    }
}
