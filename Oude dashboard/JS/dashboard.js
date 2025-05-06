const weatherApiKey = "af9bf2f1eed4d142071d5dc69e0bc5b1";
const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Amsterdam&units=metric&appid=${weatherApiKey}`;
const sensorApiUrl =
    "https://x8ki-letl-twmt.n7.xano.io/api:_PE0roiD/meter1warmte";
const HumidityUrl =
    "https://x8ki-letl-twmt.n7.xano.io/api:_PE0roiD/meter2vocht";
const sunLightApiUrl =
    "https://x8ki-letl-twmt.n7.xano.io/api:_PE0roiD/meter3zonwarmte";
const roomApiUrl =
    "https://x8ki-letl-twmt.n7.xano.io/api:_PE0roiD/meter4ruimte";

async function fetchCombinedData() {
    try {
        const [
            weatherResponse,
            sensorResponse,
            humidityResponse,
            sunLightResponse,
            roomResponse,
        ] = await Promise.all([
            fetch(weatherApiUrl),
            fetch(sensorApiUrl),
            fetch(HumidityUrl),
            fetch(sunLightApiUrl),
            fetch(roomApiUrl),
        ]);

        if (!weatherResponse.ok) {
            throw new Error(
                `Weather API error! Status: ${weatherResponse.status}`
            );
        }
        if (!sensorResponse.ok) {
            throw new Error(
                `Sensor API error! Status: ${sensorResponse.status}`
            );
        }
        if (!humidityResponse.ok) {
            throw new Error(
                `Humidity API error! Status: ${humidityResponse.status}`
            );
        }
        if (!sunLightResponse.ok) {
            throw new Error(
                `Sunlight API error! Status: ${sunLightResponse.status}`
            );
        }
        if (!roomResponse.ok) {
            throw new Error(`Room API error! Status: ${roomResponse.status}`);
        }

        const weatherData = await weatherResponse.json();
        const sensorData = await sensorResponse.json();
        const humidityData = await humidityResponse.json();
        const sunlightData = await sunLightResponse.json();
        const roomData = await roomResponse.json();

        console.log(sunlightData);

        const liveOutsideTemp = weatherData.main.temp;
        const lastSensorObject = sensorData[sensorData.length - 1];
        const lastHumidityObject = humidityData[humidityData.length - 1];
        const lastSunlightObject = sunlightData[sunlightData.length - 1];
        const lastRoomObject = roomData[roomData.length - 1];

        console.log(lastSunlightObject);

        document.getElementById("buiten").textContent =
            liveOutsideTemp.toFixed(1);
        document.getElementById("binnen").textContent = lastRoomObject.Temp
            ? lastRoomObject.Temp.toFixed(1) + "℃"
            : "N/A";
        document.getElementById("sb").textContent = lastSensorObject.Sensor_1
            ? lastSensorObject.Sensor_1 + "℃"
            : "N/A";
        document.getElementById("ms").textContent = lastSensorObject.Sensor_2
            ? lastSensorObject.Sensor_2 + "℃"
            : "N/A";
        document.getElementById("bs").textContent = lastSensorObject.Sensor_3
            ? lastSensorObject.Sensor_3 + "℃"
            : "N/A";
        document.getElementById("lv").textContent =
            lastHumidityObject._Humidity1_58_03 || "N/A";
        document.getElementById("zl").textContent =
            lastSunlightObject._Licht_lux || "N/A";
    } catch (error) {
        console.error("Error fetching combined data:", error);

        ["buiten", "binnen", "sb", "ms", "bs", "lv", "zl"].forEach((id) => {
            document.getElementById(id).textContent = "N/A";
        });
    }
}

setInterval(fetchCombinedData, 30000);
fetchCombinedData();