document.addEventListener("DOMContentLoaded", async () => {


    Chart.register(
        window['chartjs-plugin-annotation']
    );

    Chart.register(
        {

        id: 'zeroLinePlugin',
        beforeDraw: (chart) => {
            const { ctx, chartArea: { left, right }, scales: { y } } = chart;
            const zeroY = y.getPixelForValue(0);

            ctx.save();
            ctx.beginPath();
            ctx.moveTo(left, zeroY);
            ctx.lineTo(right, zeroY);
            ctx.lineWidth = 3;
            ctx.strokeStyle = 'lightgray';
            ctx.stroke();
            ctx.restore();
        }
    });

const ctx = document.getElementById('stookChart').getContext('2d');

const stookChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "24:00"],
        datasets: [
            {
                label: 'Energieprijs (€/kWh)',
                data: [],
                borderColor: '#000000',
                yAxisID: 'y',
                fill: false,
                tension: 0.4
            },
            {
                label: 'Warmtevraag (%)',
                data: [],
                borderColor: 'red',
                yAxisID: 'y1',
                fill: false,
                tension: 0.4
            }
        ]
    },
    options: {
        responsive: true,
        interaction: {
            mode: 'index',
            intersect: false
        },
        stacked: false,
        scales: {
            y: {
                type: 'linear',
                position: 'left',
                title: {
                    display: true,
                    text: 'Energieprijs in €/kWh'
                },
                min: -0.2,
                max: 0.3,
                beginAtZero: false
            },
            y1: {
                type: 'linear',
                position: 'right',
                title: {
                    display: true,
                    text: 'Warmtevraag (°C)'
                },
                min: -8,
                max: 8,
                beginAtZero: false,
                grid: {
                    drawOnChartArea: false
                }
            }
        }

    }
});


    function formaatDate(offset = 0) {
        const date = new Date();
        date.setDate(date.getDate() + offset);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');


        return `${year}-${month}-${day}`;
    }

    const today = formaatDate(0);
    const tomorrow = formaatDate(1);

    const energiepijzenAPI = `https://api.energyzero.nl/v1/energyprices?fromDate=${today}T00%3A00%3A00.000Z&tillDate=${tomorrow}T00%3A00%3A00.000Z&interval=4&usageType=1&inclBtw=true`;
    const weerGeschiedenisAPI = `http://api.weatherapi.com/v1/history.json?key=57af711d34e54bb0aeb174631252306&q=Almere&dt=${today}`;

    async function fetchWeer() {
        try {
            const res = await fetch(weerGeschiedenisAPI);
            const data = await res.json();
            // console.log("Weerdata:", data);
            return data;
        } catch (error) {
            // console.log("Error bij weerdata:", error);
            return null;
        }
    }

    const weer24h = await fetchWeer();
    if (!weer24h) return;



fetch(energiepijzenAPI)
    .then(result => result.json())
    .then(data=> {


        // console.log(data)
        //
        // console.log(data.Prices[0])
        //
        // console.log(data.Prices[23])

        const prijzen = [];
        const statusWeer = [];
        const stookscore = [];

        let i = 0;
        let d = 0;
        while (i < 25) {
            const dagPrijs = data.Prices[i];
            const dagWeer = weer24h.forecast.forecastday[0].hour[d].temp_c;
            const dagWeerConditie = weer24h.forecast.forecastday[0].hour[d].condition.text;


            // console.log(dagPrijs)
            // console.log(i)
            // console.log(weer24h)
            // console.log(dagWeer)
            // console.log(dagWeerConditie)


            if (dagWeerConditie === "Sunny"){
                warmteVraag =  (18 - dagWeer - 4)
            } else {
                warmteVraag = (18 - dagWeer)
            }

            prijzen.push(dagPrijs.price);
            statusWeer.push(warmteVraag);
            stookscore.push(dagPrijs.price * warmteVraag);

            if (d === 20){
                d += 3
            } else{
                d += 4
            }
            i += 4
            // console.log(warmteVraag)
            console.log(stookscore)
        }

        const top3Indices = [...stookscore.entries()]
            .sort((a, b) => a[1] - b[1])
            .slice(0, 3)
            .map(entry => entry[0]);


        // let voordeel = prijzen * statusWeer
        stookChart.data.datasets[0].data = prijzen;
        stookChart.data.datasets[1].data = statusWeer;

        stookChart.options.plugins = {
            annotation: {
                annotations: top3Indices.map(idx => ({
                    type: 'box',
                    xMin: idx - 0.4,
                    xMax: idx + 0.4,
                    backgroundColor: 'rgba(0, 255, 0, 0.3)',
                    borderColor: 'lightgreen',
                    width: 100,
                    borderWidth: 1,
                    xScaleID: 'x',
                }))
            }
        };


        // Bepaal het volgende stookmoment
        const labels = stookChart.data.labels;
        const huidigeUur = new Date().getHours();

        // Tijd per index koppelen aan daadwerkelijk uur
        const indexToHour = [0, 4, 8, 12, 16, 20, 24];

        // Zoek de eerstvolgende stooktijd die nog moet komen
        const volgendeIndex = top3Indices.find(idx => indexToHour[idx] > huidigeUur);

        let volgendeMoment = "Geen meer vandaag";
        if (volgendeIndex !== undefined) {
            volgendeMoment = labels[volgendeIndex];
        }





        stookChart.update();


        let kachelAan = false;

        for (const idx of top3Indices) {
            const stookUur = indexToHour[idx];

            // Controleer of huidigeUur binnen 1 uur vóór tot 1 uur ná het stookmoment valt
            if (huidigeUur >= stookUur - 1 && huidigeUur <= stookUur + 1) {
                kachelAan = true;
                break;  // Stop de loop zodra één match is gevonden
            }
        }



        // Bereken de besparing vandaag
        const andereIndices = stookscore
            .map((_, idx) => idx)
            .filter(idx => !top3Indices.includes(idx));

        const gemiddeldeTop3 = top3Indices
            .map(idx => stookscore[idx])
            .reduce((acc, val) => acc + val, 0) / top3Indices.length;

        const gemiddeldeAndere = andereIndices.length > 0
            ? andereIndices
            .map(idx => stookscore[idx])
            .reduce((acc, val) => acc + val, 0) / andereIndices.length
            : 0;

        const besparingen = gemiddeldeAndere - gemiddeldeTop3;


        const huidigePrijs = data.Prices[huidigeUur].price;

        document.getElementById("huidigePrijs").textContent = "€" + huidigePrijs;
        document.getElementById("volgendeStookmoment").textContent = volgendeMoment;
        document.getElementById("statusKachel").textContent = kachelAan ? "AAN" : "UIT";
        document.getElementById("besparingenVandaag").textContent = "€" + besparingen.toFixed(2);


    })
    .catch(error => {
    console.error("Fout bij ophalen energieprijzen:", error);
    });

});


