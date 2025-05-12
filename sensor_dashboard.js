// De pagina word eerst geladen
document.addEventListener("DOMContentLoaded", () => {


// Hiermee halen we de API op via php
    fetch("sensor_api.php")
        .then(response => response.json())
        // data is response. Response is voor gemak omgezet naar json
        .then(data => {
// console log in de browser (alleen voor debuggen)
            console.log(data)
            console.log(document.getElementById("hum1"))
// Variabelen oproepen
            let eerst = null;
            const naam = document.body.dataset.sensor;


// De array van achteren naar voren checken voor de juiste naam (met debugging)
            for (let i = data.length - 1; i >= 0; i--) {
                if (data[i].sensor_name === naam) {
                    eerst = data[i];
                    console.log("ik draai");
                    break;
                }

            }
// Extra controle
            if (eerst.sensor_name === naam) {
// html tekst vervangen met api data
                document.getElementById("hum1").textContent = eerst.humidity_1 + " %";
                document.getElementById("hum2").textContent = eerst.humidity_2 + " %";
                document.getElementById("hum3").textContent = eerst.humidity_3 + " %";
                document.getElementById("temp1").textContent = eerst.temperature_1 + "°C";
                document.getElementById("temp2").textContent = eerst.temperature_2 + "°C";
                document.getElementById("temp3").textContent = eerst.temperature_3 + "°C";
            }

        })

        .catch(error => {
            console.error("Fout bij het ophalen"+ error);

        });
})

