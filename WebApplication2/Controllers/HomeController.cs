using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using WebApplication2.Models;

namespace WebApplication2.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _Logger;
        private readonly IConfigurationSection _configurationSection;

        public HomeController(ILogger<HomeController> logger, IConfiguration configuration)
        {
            _Logger = logger;
            _configurationSection = configuration.GetSection("Config").GetSection("HomeController");
        }

        public IActionResult Examples(string id)
        {
            string[] examples =
                (from child in _configurationSection.GetSection("ExampleList").GetChildren()
                 select child.Value).ToArray();
            if (string.IsNullOrEmpty(id))
            {
                return View("Examples/Index", examples);
            } 
            else
            {
                ViewBag.Title = id;
                for (int i = 0; i < examples.Length; i++)
                {
                    if (examples[i] == id)
                    {
                        if (i > 0) ViewBag.Prev = examples[i - 1];
                        if (i < examples.Length - 1) ViewBag.Next = examples[i + 1];
                        break;
                    }
                }
                return View($"Examples/{id?.Replace(' ', '_')}");
            }
        }

        public IActionResult Resources()
        {
            return View();
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
