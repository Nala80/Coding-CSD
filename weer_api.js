weer_API = ("https://weerlive.nl/api/weerlive_api_v2.php?key=cd356cbcde&locatie=52.3532452,5.1483313")
/*
fetch(weer_API)
    .then(r => r.json())
    .then(x => {
        let huidige_weer;
        huidige_weer = x.liveweer[0]

        console.log(huidige_weer)
        console.log(huidige_weer.temp)

        document.getElementById("buiten").textContent = huidige_weer.temp + "°C";
            document.getElementById("buiten_isovlas").textContent = huidige_weer.temp
            document.getElementById("buiten_cellulose").textContent = huidige_weer.temp
            document.getElementById("buiten_hemkor").textContent = huidige_weer.temp
    })
*/

async function fetchWeerApi() {
    try {
        const res = await fetch(weer_API)
        const data = await res.json()
        let huidige_weer;
        huidige_weer = data.liveweer[0]
        console.log(data)
        console.log(huidige_weer.temp)
        const now = new Date()
        console.log("Het is nu: " + now.toLocaleTimeString());

        document.getElementById("buiten").textContent = huidige_weer.temp + "°C";
        document.getElementById("buiten_isovlas").textContent = huidige_weer.temp
        document.getElementById("buiten_cellulose").textContent = huidige_weer.temp
        document.getElementById("buiten_hemkor").textContent = huidige_weer.temp
    } catch (error) {
        console.log("Error " + error)
    }
}

fetchWeerApi();
setInterval(fetchWeerApi, 600000);

