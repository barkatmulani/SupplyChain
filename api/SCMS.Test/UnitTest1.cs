using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using SCMS.DB.Model;
using SCMS.DB.Persistence;
using System.Collections.Generic;

namespace SCMS.Test
{
  [TestClass]
  public class UnitTest1
  {
    [TestMethod]
    public void ItemCount()
    {
      // Arrange
      var unitOfWork = new UnitOfWork(new SCMSContext());

      // Act
      var items = unitOfWork.Items.GetAll();
      var count = ((List<Item>)items).Count;

      // Assert
      Assert.AreEqual(5, count);
    }
  }
}
