
const apiUrl = "https://x8ki-letl-twmt.n7.xano.io/api:_PE0roiD/meter1warmte";
// Api voor buitentemperatuur door knmi gemeten
// const apiLive = "https://api.open-meteo.com/v1/forecast?latitude=52.3702&longitude=5.2141&hourly=temperature_2m&start_date=2024-11-07&end_date=2024-11-08&models=knmi_seamless";

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
    const data = await fetchData();

    // Controleer of data bestaat
    if (!data) return;

    // Extract tijdstempels en vochtigheidswaarden
    const timestamps = data.filter(entry => entry["Time"] !== "0:0:0").filter(entry => entry["Time"] !== "Time").map(entry => entry["Time"]); // Tijdstempels
    // const datestamps = data.map(entry => entry["Date"]);
    const temperature1 = data.map(entry => parseFloat(entry["Sensor_1"].split(":")[0]));
    const temperature2 = data.map(entry => parseFloat(entry["Sensor_2"].split(":")[0]));
    const temperature3 = data.map(entry => parseFloat(entry["Sensor_3"].split(":")[0]));

    // Maak de grafiek
    const ctx = document.getElementById("temperatureChart").getContext("2d");
    new Chart(ctx, {
        type: "line",
        data: {
            labels: timestamps,
            datasets: [
                {
                    label: "Sensor_1",
                    data: temperature1,
                    borderColor: "rgba(75, 192, 192, 1)",
                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                    fill: false
                },
                {
                    label: "Sensor_2",
                    data: temperature2,
                    borderColor: "rgba(255, 99, 132, 1)",
                    backgroundColor: "rgba(255, 99, 132, 0.2)",
                    fill: false
                },
                {
                    label: "Sensor_3",
                    data: temperature3,
                    borderColor: "rgba(54, 162, 235, 1)",
                    backgroundColor: "rgba(54, 162, 235, 0.2)",
                    fill: false
                },
                {
                    label: "Buitentemperatuur",
                    data: [5,5,5,5,4.6,3.8,3.8,4.2,5.1,5.1,5.1,5.1,5.1,5.1,5.1,5.1,5.1,5.1,5.1,5.1,5.1,5.1,5.1,5.1,5.4,5.4,5.4,5.4,5.4,5.4],
                    borderColor: "orange",
                    backgroundColor: "rgb(255, 213, 128)",
                    fill: false
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
                        text: "Temperature (°C)"
                    },
                    beginAtZero: false,
                    suggestedMin: 5,
                    suggestedMax: 20
                }
            }
        }
    });
}

// Start het proces
createChart();
