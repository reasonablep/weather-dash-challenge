document.addEventListener('DOMContentLoaded', () => {
    const getWeatherButton = document.getElementById('get-weather');
    const cityInput = document.getElementById('city-name');
    const weatherInfo = document.getElementById('weather-info');
    const forecastContainer = document.getElementById('forecast');

    getWeatherButton.addEventListener('click', () => {
        const city = cityInput.value;


        if (!city) {
            alert('Please enter a valid city name');
            return;
        }

        const apiKey = 'WeatherAPI';
        const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=c3ae464095c2e4d49982c37fea88fd86&units=imperial`;


        function getWeather() {
            fetch(weatherUrl)
                .then((response) => {
                    if (response.status === 200) {
                        return response.json();
                    }

                    else {
                        throw new Error('Weather update failed.');
                    }
                })
                .then((data) => {
                    console.log("Data received:", data);

                    const temperature = data.list[0].main.temp;
                    document.getElementById('temperature').textContent = temperature + 'F';

                    displayForecast(data.list)

                    function displayForecast (forecastData) {

                        const forecastContainer = document.getElementById('forecast');
                        forecastContainer.innerHTML(" ");

                    forecastData.forEach((forecastItem) => {
                        const timeStamp = forecastItem.dt;
                        const date = new date (timeStamp);
                        const temperature = forecastItem.main.temp;
                        const weatherIconCode = forecastItem.weather[0].icon;

                        const forecastItemDiv = document.createElement('div');
                        forecastItemDiv.className =  'forecast-item';
                    }

                    const forecastDate = document.createElement ('p');
                    forecastDate.textContent = formatDate (date);

                    const forecastTemp = document.createElement ('p');
                    forecastTemp.textContent = temperature + 'F';

                    const weatherIconCode = data.list[0].weather[0].icon;
                    const iconUrl = `https://www.openweathermap.org/img/w/${weatherIconCode}.png`;
                    const weatherIcon = document.createElement('img');
                    weatherIcon.src = iconUrl;

                    const iconDiv = document.getElementById ('weather-icon');
                    iconDiv.innerHTML = '';
                    iconDiv.appendChild (weatherIcon);

                    forecastItemDiv.appendChild (forecastDate);
                    forecastItemDiv.appendChild(weatherIcon);
                    forecastItemDiv.appendChild(forecastTemp);
                    forecastItemDiv.appendChild(forecastItemDiv);


        //             weatherInfo.innerHTML =
        //                 `<h2>Weather in ${city}</h2>
        // <p>Temperature ${temperature}F°</p> "`;

        console.log("Weather data updated:");


        

                });

        }

        function formatDate (date) {

            const options = {weekday: 'long', hour: numeric};
        }


                .catch((error) => {
                    console.error('Error getting weather data', error);

                });

        }


        getWeather();


    });