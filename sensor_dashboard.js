// De pagina word eerst geladen
document.addEventListener("DOMContentLoaded", () => {

    console.log("Hij laadt");

// Hiermee halen we de API op via php
    fetch("sensor_api.php")
        .then(response => response.json())
        // data is response. Response is voor gemak omgezet naar json
        .then(data => {
// console log in de browser (alleen voor debuggen)
            console.log("Hij laadt");
            console.log(data)
            console.log(document.getElementById("hum1"))
// Variabelen oproepen
            let eerst = null;
            let eerst2 = null;
            let eerst3 = null;
            let eerst4 = null;
            const naam = "Sensor1";
            const naam2 = "Sensor2";
            const naam3 = "Sensor3";
            const naam4 = "Sensor4";


// De array van achteren naar voren checken voor de juiste naam (met debugging)
            for (let i = data.length - 1; i >= 0; i--) {
                if (data[i].sensor_name === naam) {
                    eerst = data[i];
                    console.log("ik draai");
                    break;
                }

            }

            for (let i = data.length - 1; i >= 0; i--) {
                if (data[i].sensor_name === naam2) {
                    eerst2 = data[i];
                    console.log("ik draai");
                    break;
                }

            }

            for (let i = data.length - 1; i >= 0; i--) {
                if (data[i].sensor_name === naam3) {
                    eerst3 = data[i];
                    console.log("ik draai");
                    break;
                }

            }

            for (let i = data.length - 1; i >= 0; i--) {
                if (data[i].sensor_name === naam4) {
                    eerst4 = data[i];
                    console.log("ik draai");
                    break;
                }

            }
// Extra controle
            if (eerst && eerst.sensor_name === naam) {
                document.getElementById("hum1").textContent = eerst.humidity_1 + " %";
                document.getElementById("hum2").textContent = eerst.humidity_2 + " %";
                document.getElementById("hum3").textContent = eerst.humidity_3 + " %";
                document.getElementById("temp1").textContent = eerst.temperature_1 + "°C";
                document.getElementById("temp2").textContent = eerst.temperature_2 + "°C";
                document.getElementById("temp3").textContent = eerst.temperature_3 + "°C";
            }

            if (eerst2 && eerst2.sensor_name === naam2){
                document.getElementById("hum1_isovlas").textContent = eerst2.humidity_1 + " %";
                document.getElementById("hum2_isovlas").textContent = eerst2.humidity_2 + " %";
                document.getElementById("hum3_isovlas").textContent = eerst2.humidity_3 + " %";
                document.getElementById("temp1_isovlas").textContent = eerst2.temperature_1 + "°C";
                document.getElementById("temp2_isovlas").textContent = eerst2.temperature_2 + "°C";
                document.getElementById("temp3_isovlas").textContent = eerst2.temperature_3 + "°C";
            }

            if (eerst3 && eerst3.sensor_name === naam3){
                document.getElementById("hum1_cellulose").textContent = eerst3.humidity_1 + " %";
                document.getElementById("hum2_cellulose").textContent = eerst3.humidity_2 + " %";
                document.getElementById("hum3_cellulose").textContent = eerst3.humidity_3 + " %";
                document.getElementById("temp1_cellulose").textContent = eerst3.temperature_1 + "°C";
                document.getElementById("temp2_cellulose").textContent = eerst3.temperature_2 + "°C";
                document.getElementById("temp3_cellulose").textContent = eerst3.temperature_3 + "°C";
            }

            if (eerst4 && eerst4.sensor_name === naam4){
                document.getElementById("hum1_hemkor").textContent = eerst4.humidity_1 + " %";
                document.getElementById("hum2_hemkor").textContent = eerst4.humidity_2 + " %";
                document.getElementById("hum3_hemkor").textContent = eerst4.humidity_3 + " %";
                document.getElementById("temp1_hemkor").textContent = eerst4.temperature_1 + "°C";
                document.getElementById("temp2_hemkor").textContent = eerst4.temperature_2 + "°C";
                document.getElementById("temp3_hemkor").textContent = eerst4.temperature_3 + "°C";
            }


        })

        .catch(error => {
            console.error("Fout bij het ophalen"+ error);

        });
})

