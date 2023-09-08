document.addEventListener('DOMContentLoaded', () => {
    const getWeatherButton = document.getElementById('getWeather');
    const cityInput = document.getElementById('cityName');
    const weatherInfo = document.getElementById('weatherInfo');

    getWeatherButton.addEventListener('click',() => {
        const city = cityInput.value;

        if (!city) {
            alert ('Please enter a valid city name');
            return;
        }

        const apiKey = 'WeatherAPI';
        const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q={city}&appid={c3ae464095c2e4d49982c37fea88fd86}`;

        function getWeather () {
            fetch (weatherUrl)
            .then ((response) => {
                if (response.status === 200) {
                return response.json();
        }

        else { 
            throw new Error('Weather update failed.');
        }
    })
    .then ((data) => {

        const temperature = data.list[0].main.temp;
        weatherInfo.innerHTML = 
        `<h2>Weather in ${city}</h2>
        <p>Temperature ${data-temperature}</p> "`;

    })


.catch((error) => {
    console.error('Error getting weather data', error);

        });

    }


     getWeather();
      

        });

    });