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
            let stroArray = null;
            let isoArray = null;
            let cellArray = null;
            let hemArray = null;
            let binnenTempArray = null;
            const naam0 = "Sensor0";
            const naam = "Sensor1";
            const naam2 = "Sensor2";
            const naam3 = "Sensor3";
            const naam4 = "Sensor4";


// De array van achteren naar voren checken voor de juiste naam (met debugging)
            for (let i = data.length - 1; i >= 0; i--) {
                if (data[i].sensor_name === naam) {
                    stroArray = data[i];
                    console.log("ik draai");
                    break;
                }

            }

            for (let i = data.length - 1; i >= 0; i--) {
                if (data[i].sensor_name === naam2) {
                    isoArray = data[i];
                    console.log("ik draai");
                    break;
                }

            }

            for (let i = data.length - 1; i >= 0; i--) {
                if (data[i].sensor_name === naam3) {
                    cellArray = data[i];
                    console.log("ik draai");
                    break;
                }

            }

            for (let i = data.length - 1; i >= 0; i--) {
                if (data[i].sensor_name === naam4) {
                    hemArray = data[i];
                    console.log("ik draai");
                    break;
                }


            }


            for (let i = data.length - 1; i >= 0; i--) {
                if (data[i].sensor_name === naam0) {
                    binnenTempArray = data[i];
                    console.log("ik draai");
                    break;
                }


            }


// Extra controle
            if (stroArray && stroArray.sensor_name === naam) {
                document.getElementById("hum1").textContent = stroArray.humidity_1 + " %";
                document.getElementById("hum2").textContent = stroArray.humidity_2 + " %";
                document.getElementById("hum3").textContent = stroArray.humidity_3 + " %";
                document.getElementById("temp1").textContent = stroArray.temperature_1 + "°C";
                document.getElementById("temp2").textContent = stroArray.temperature_2 + "°C";
                document.getElementById("temp3").textContent = stroArray.temperature_3 + "°C";
                document.getElementById("binnen").textContent = binnenTempArray.temperature_1 + "°C";
            }

            if (isoArray && isoArray.sensor_name === naam2){
                document.getElementById("hum1_isovlas").textContent = isoArray.humidity_1 + " %";
                document.getElementById("hum2_isovlas").textContent = isoArray.humidity_2 + " %";
                document.getElementById("hum3_isovlas").textContent = isoArray.humidity_3 + " %";
                document.getElementById("temp1_isovlas").textContent = isoArray.temperature_1 + "°C";
                document.getElementById("temp2_isovlas").textContent = isoArray.temperature_2 + "°C";
                document.getElementById("temp3_isovlas").textContent = isoArray.temperature_3 + "°C";
                document.getElementById("binnen_isovlas").textContent = binnenTempArray.temperature_1 + "°C";

            }

            if (cellArray && cellArray.sensor_name === naam3){
                document.getElementById("hum1_cellulose").textContent = cellArray.humidity_1 + " %";
                document.getElementById("hum2_cellulose").textContent = cellArray.humidity_2 + " %";
                document.getElementById("hum3_cellulose").textContent = cellArray.humidity_3 + " %";
                document.getElementById("temp1_cellulose").textContent = cellArray.temperature_1 + "°C";
                document.getElementById("temp2_cellulose").textContent = cellArray.temperature_2 + "°C";
                document.getElementById("temp3_cellulose").textContent = cellArray.temperature_3 + "°C";
                document.getElementById("binnen_cellulose").textContent = binnenTempArray.temperature_1 + "°C";
            }

            if (hemArray && hemArray.sensor_name === naam4){
                document.getElementById("hum1_hemkor").textContent = hemArray.humidity_1 + " %";
                document.getElementById("hum2_hemkor").textContent = hemArray.humidity_2 + " %";
                document.getElementById("hum3_hemkor").textContent = hemArray.humidity_3 + " %";
                document.getElementById("temp1_hemkor").textContent = hemArray.temperature_1 + "°C";
                document.getElementById("temp2_hemkor").textContent = hemArray.temperature_2 + "°C";
                document.getElementById("temp3_hemkor").textContent = hemArray.temperature_3 + "°C";
                document.getElementById("binnen_hemkor").textContent = binnenTempArray.temperature_1 + "°C";
            }


        })

        .catch(error => {
            console.error("Fout bij het ophalen"+ error);

        });
})

