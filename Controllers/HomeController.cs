using Microsoft.AspNetCore.Mvc;

namespace TravelAppHybrid.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index() => View();
        public IActionResult Privacy() => View();
    }
}
