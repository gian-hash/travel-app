using Microsoft.AspNetCore.Mvc;
using TravelAppHybrid.Models;
using System.Collections.Generic;
using System.Linq;

namespace TravelAppHybrid.Controllers
{
    public class TripsController : Controller
    {
        private static List<Trip> trips = new();

        public IActionResult Index() => View(trips);

        public IActionResult Create() => View();

        [HttpPost]
        public IActionResult Create(Trip trip)
        {
            trip.Id = trips.Count + 1;
            trips.Add(trip);
            return RedirectToAction("Index");
        }

        public IActionResult Edit(int id)
        {
            var trip = trips.FirstOrDefault(t => t.Id == id);
            return View(trip);
        }

        [HttpPost]
        public IActionResult Edit(Trip trip)
        {
            var existing = trips.FirstOrDefault(t => t.Id == trip.Id);
            if (existing != null)
            {
                existing.Destination = trip.Destination;
                existing.StartDate = trip.StartDate;
                existing.EndDate = trip.EndDate;
                existing.Description = trip.Description;
            }
            return RedirectToAction("Index");
        }

        public IActionResult Delete(int id)
        {
            var trip = trips.FirstOrDefault(t => t.Id == id);
            return View(trip);
        }

        [HttpPost]
        public IActionResult DeleteConfirmed(int id)
        {
            trips.RemoveAll(t => t.Id == id);
            return RedirectToAction("Index");
        }
    }
}
