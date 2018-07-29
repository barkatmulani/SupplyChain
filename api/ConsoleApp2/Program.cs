using SCMS.API.Service;
using System;
using System.Net;

namespace ConsoleApp2
{
  class Program
  {
    static void Main(string[] args)
    {
      using (var client = new WebClient()) //WebClient  
      {
        client.Headers.Add("Content-Type:application/json"); //Content-Type  
        client.Headers.Add("Accept:application/json");
        var result = client.DownloadString("http://localhost:57770/api/Get(1)"); //URI  
        Console.WriteLine(Environment.NewLine + result);
      }

      //var unitOfWork = new UnitOfWork(new SCMSContext());

      //var items = unitOfWork.Items.GetAll();
      //var count = ((List<Item>)items).Count;
    }
  }
}
