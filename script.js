let userContainer = document.getElementById('weather');
let updateWeather = document.getElementById('update-button');

function getApi() {
    var requestUrl = "https://api.openweathermap.org/data/2.5/forecast?q={city name},{state code},{country code}&appid={c3ae464095c2e4d49982c37fea88fd86}";
    
    fetch (requestUrl)
    .then (function (response) {
        return response.json();
    })
}
    // .then (function (data {
    //     console.log(data); 
    //     for (let i=0; i < data.length; i++) {
    //         let userData = document.createElement('h2');
    //         userData.textContent = data [i]
    //     }

    // }