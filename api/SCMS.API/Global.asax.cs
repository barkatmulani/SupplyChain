using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Routing;

namespace SCMS.API
{
    public class WebApiApplication : System.Web.HttpApplication
    {
      protected void Application_Start()
      {
        GlobalConfiguration.Configure(WebApiConfig.Register);

        HttpContext.Current.Response.AddHeader("Access-Control-Allow-Origin", "*");

        if (HttpContext.Current.Request.HttpMethod == "OPTIONS")
        {
          //These headers are handling the "pre-flight" OPTIONS call sent by the browser
          HttpContext.Current.Response.AddHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
          HttpContext.Current.Response.AddHeader("Access-Control-Allow-Headers", "Content-Type, Accept");
          HttpContext.Current.Response.AddHeader("Access-Control-Max-Age", "1728000");
          HttpContext.Current.Response.End();
        }
      }
    }
}
