using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SCMS.DB.Models
{
    public partial class ReceiptItem
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ReceiptItemId { get; set; }
        public int? ReceiptId { get; set; }
        public int? ItemId { get; set; }
        public int? Quantity { get; set; }
        public decimal? Cost { get; set; }
        public decimal? TotalCost { get; set; }

        public Item Item { get; set; }
        public Receipt Receipt { get; set; }
    }
}
