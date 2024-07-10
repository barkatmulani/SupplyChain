using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace SCMS.DB.Models
{
    public partial class SCMSContext : DbContext
    {
        public SCMSContext()
        {
        }

        public SCMSContext(DbContextOptions<SCMSContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Inventory> Inventory { get; set; }
        public virtual DbSet<InventoryItem> InventoryItem { get; set; }
        public virtual DbSet<Item> Item { get; set; }
        public virtual DbSet<PurchaseOrder> PurchaseOrder { get; set; }
        public virtual DbSet<PurchaseOrderItem> PurchaseOrderItem { get; set; }
        public virtual DbSet<Receipt> Receipt { get; set; }
        public virtual DbSet<ReceiptItem> ReceiptItem { get; set; }
        public virtual DbSet<Status> Status { get; set; }
        public virtual DbSet<Vendor> Vendor { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
//            if (!optionsBuilder.IsConfigured)
//            {
//#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
//                optionsBuilder.UseSqlServer("Server=.;Database=SCMS;Trusted_Connection=True;");
//            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Inventory>(entity =>
            {
                entity.Property(e => e.Address)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.InventoryDescription)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<InventoryItem>(entity =>
            {
                entity.Property(e => e.AvgCost).HasColumnType("numeric(13, 2)");

                entity.Property(e => e.TotalCost).HasColumnType("numeric(13, 2)");

                entity.HasOne(d => d.Inventory)
                    .WithMany(p => p.InventoryItem)
                    .HasForeignKey(d => d.InventoryId)
                    .HasConstraintName("FK_InventoryItem_Inventory");

                entity.HasOne(d => d.Item)
                    .WithMany(p => p.InventoryItem)
                    .HasForeignKey(d => d.ItemId)
                    .HasConstraintName("FK_InventoryItem_Item");
            });

            modelBuilder.Entity<Item>(entity =>
            {
                entity.Property(e => e.Cost).HasColumnType("numeric(13, 2)");

                entity.Property(e => e.ItemDescription)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Price).HasColumnType("numeric(13, 2)");
            });

            modelBuilder.Entity<PurchaseOrder>(entity =>
            {
                entity.Property(e => e.EstDeliveryDate).HasColumnType("date");

                entity.Property(e => e.PurchaseOrderDate).HasColumnType("date");

                entity.Property(e => e.PurchaseOrderTotal).HasColumnType("numeric(13, 2)");

                entity.Property(e => e.ShipmentCost).HasColumnType("numeric(13, 2)");

                entity.HasOne(d => d.Inventory)
                    .WithMany(p => p.PurchaseOrder)
                    .HasForeignKey(d => d.InventoryId)
                    .HasConstraintName("FK_PurchaseOrder_Inventory");

                entity.HasOne(d => d.Status)
                    .WithMany(p => p.PurchaseOrder)
                    .HasForeignKey(d => d.StatusId)
                    .HasConstraintName("FK_PurchaseOrder_Status");

                entity.HasOne(d => d.Vendor)
                    .WithMany(p => p.PurchaseOrder)
                    .HasForeignKey(d => d.VendorId)
                    .HasConstraintName("FK_PurchaseOrder_Vendor");
            });

            modelBuilder.Entity<PurchaseOrderItem>(entity =>
            {
                entity.Property(e => e.Cost).HasColumnType("numeric(13, 2)");

                entity.Property(e => e.TotalCost).HasColumnType("numeric(13, 2)");

                entity.HasOne(d => d.Item)
                    .WithMany(p => p.PurchaseOrderItem)
                    .HasForeignKey(d => d.ItemId)
                    .HasConstraintName("FK_PurchaseOrderItem_Item");

                entity.HasOne(d => d.PurchaseOrder)
                    .WithMany(p => p.PurchaseOrderItem)
                    .HasForeignKey(d => d.PurchaseOrderId)
                    .HasConstraintName("FK_PurchaseOrderItem_PurchaseOrder");
            });

            modelBuilder.Entity<Receipt>(entity =>
            {
                entity.Property(e => e.ExtraCost).HasColumnType("numeric(13, 2)");

                entity.Property(e => e.ReceiptDate).HasColumnType("date");

                entity.Property(e => e.ReceiptTotal).HasColumnType("numeric(13, 2)");

                entity.HasOne(d => d.Inventory)
                    .WithMany(p => p.Receipt)
                    .HasForeignKey(d => d.InventoryId)
                    .HasConstraintName("FK_Receipt_Inventory");

                entity.HasOne(d => d.PurchaseOrder)
                    .WithMany(p => p.Receipt)
                    .HasForeignKey(d => d.PurchaseOrderId)
                    .HasConstraintName("FK_Receipt_PurchaseOrder");

                entity.HasOne(d => d.Status)
                    .WithMany(p => p.Receipt)
                    .HasForeignKey(d => d.StatusId)
                    .HasConstraintName("FK_Receipt_Status");
            });

            modelBuilder.Entity<ReceiptItem>(entity =>
            {
                entity.Property(e => e.Cost).HasColumnType("numeric(13, 2)");

                entity.Property(e => e.TotalCost).HasColumnType("numeric(13, 2)");

                entity.HasOne(d => d.Item)
                    .WithMany(p => p.ReceiptItem)
                    .HasForeignKey(d => d.ItemId)
                    .HasConstraintName("FK_ReceiptItem_Item");

                entity.HasOne(d => d.Receipt)
                    .WithMany(p => p.ReceiptItem)
                    .HasForeignKey(d => d.ReceiptId)
                    .HasConstraintName("FK_ReceiptItem_Receipt");
            });

            modelBuilder.Entity<Status>(entity =>
            {
                entity.Property(e => e.StatusId).ValueGeneratedNever();

                entity.Property(e => e.StatusDescription)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Vendor>(entity =>
            {
                entity.Property(e => e.Address)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.PhoneNo)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.VendorName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });
        }
    }
}
