using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;
using TravelAppHybrid.Models;

public class PdfService
{
    public byte[] GenerateTripPdf(Trip trip)
    {
        var document = Document.Create(container =>
        {
            container.Page(page =>
            {
                page.Size(PageSizes.A4);
                page.Margin(2, Unit.Centimetre);
                page.Content().Column(col =>
                {
                    col.Item().Text("Dettagli Viaggio").FontSize(20).Bold();
                    col.Item().Text($"Destinazione: {trip.Destination}");
                    col.Item().Text($"Dal: {trip.StartDate:d} al {trip.EndDate:d}");
                    col.Item().Text($"Descrizione: {trip.Description}");
                });
            });
        });

        return document.GeneratePdf();
    }
}
