const apiUrl = "https://x8ki-letl-twmt.n7.xano.io/api:_PE0roiD/meter2vocht";

// Functie om data op te halen
async function fetchData() {
    try {
        const response = await fetch(apiUrl); // Voert de GET-aanroep uit
        if (!response.ok) {
            throw new Error(`HTTP-fout! Status: ${response.status}`);
        }
        const data = await response.json(); // Converteert de response naar JSON
        return data;
    } catch (error) {
        console.error("Fout bij het ophalen van de data:", error);
    }
}

// Functie om data te extraheren en de grafiek te maken
async function createChart() {
    const data = await fetchData(); // Haal de data op

    // Controleer of data bestaat
    if (!data) return;

    // Extract tijdstempels en vochtigheidswaarden
    const timestamps = data.map(entry => entry["2024_11_8_13_29_15"]); // Tijdstempels
    const humidity1 = data.map(entry => parseFloat(entry["_Humidity1_58_03"].split(":")[1])); // Humidity1
    const humidity2 = data.map(entry => parseFloat(entry["_Humidity2_52_57"].split(":")[1])); // Humidity2
    const humidity3 = data.map(entry => parseFloat(entry["_Humidity3_53_50"].split(":")[1])); // Humidity3

    // Maak de grafiek
    const ctx = document.getElementById("humidityChart").getContext("2d");
    new Chart(ctx, {
        type: "line",
        data: {
            labels: timestamps,
            datasets: [
                {
                    label: "Humidity1",
                    data: humidity1,
                    borderColor: "rgba(75, 192, 192, 1)",
                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                    fill: true
                },
                {
                    label: "Humidity2",
                    data: humidity2,
                    borderColor: "rgba(255, 99, 132, 1)",
                    backgroundColor: "rgba(255, 99, 132, 0.2)",
                    fill: true
                },
                {
                    label: "Humidity3",
                    data: humidity3,
                    borderColor: "rgba(54, 162, 235, 1)",
                    backgroundColor: "rgba(54, 162, 235, 0.2)",
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: "top"
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: "Timestamps"
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: "Humidity (%)"
                    },
                    beginAtZero: false
                }
            }
        }
    });
}

// Start het proces
createChart();
