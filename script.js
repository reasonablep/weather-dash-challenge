document.addEventListener('DOMContentLoaded', () => {
    let getWeatherButton = document.getElementById('get-weather');
    let cityInput = document.getElementById('city-name');
    let weatherContainer = document.getElementById('location')
    let iconDiv = document.getElementById('conditions');
    let forecastDiv = document.getElementById('forecast-div');




    function getWeather() {
        const city = cityInput.value;

        if (!city) {
            throw new Error('Please enter a valid city name');
            return;
        }
        const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=c3ae464095c2e4d49982c37fea88fd86&units=imperial`;


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

                const cityName = city;
                let cityNameEl = document.createElement('p')
                cityNameEl.textContent = cityName;
                weatherContainer.appendChild(cityNameEl);

                const temperature = data.list[0].main.temp;
                let tempEl = document.createElement('p');
                tempEl.textContent = 'Current Temperature: ' + temperature + 'F ';
                tempEl.classList.add('weather-info');
                iconDiv.appendChild(tempEl);

                for (let i = 0; i < 39; i+=8) {

                    let icon = data.list[i].weather[0].icon;

                    let iconUrl = `https://openweathermap.org/img/wn/${icon}.png`;

                    let weatherIcon = document.createElement('img');
                    weatherIcon.src = iconUrl;

                    let forecastDate = data.list[i].dt_txt.split(' ');
                    let dateEl = document.createElement('p');
                    dateEl.textContent = forecastDate[0];



                    forecastDiv.appendChild(dateEl);

                    forecastDiv.appendChild(weatherIcon);

                }



                let humidity = data.list[0].main.humidity;
                let humidityEl = document.createElement('p');
                humidityEl.textContent = 'Humidity: ' + humidity + '%';
                humidityEl.classList.add('weather-info');
                iconDiv.appendChild(humidityEl);
            

                let windSpeed = data.list[0].wind.speed;
                let windSpeedEl = document.createElement('p');
                windSpeedEl.textContent = 'Wind Speed: ' + windSpeed + 'MPH';
                windSpeedEl.classList.add('weather-info');
                iconDiv.append(windSpeedEl);

                let timeStamp = data.list[0].dt_txt.split(' ');
                console.log(timeStamp);
                let timeStampEl = document.createElement('p');
                timeStampEl.textContent = timeStamp[0];
                weatherContainer.append(timeStampEl);



            })

            .catch((error) => {
                console.error('Error getting weather data', error);

            });

    }

    getWeatherButton.addEventListener('click', () => {
        getWeather();


    });

});
