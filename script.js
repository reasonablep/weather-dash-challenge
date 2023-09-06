let userContainer = document.getElementById('weather');
let updateWeather = docuemnt.getElementById('update-button');

function getApi() {
    let requestUrl = "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key";
    
    fetch (requestUrl)
}