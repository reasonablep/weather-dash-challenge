document.addEventListener('DOMContentLoaded', () => {
    let getWeatherButton = document.getElementById('get-weather');
    let cityInput = document.getElementById('city-name');
    let weatherContainer = document.getElementById('location')
    let iconDiv = document.getElementById('conditions');
    let forecastDiv = document.getElementById('forecast-div');
    let previousSearches = document.getElementById('previous-searches')


    updateSearches();



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

                for (let i = 0; i < 39; i += 8) {

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


                //    document.getElementById('previous-searches').setAttribute('href=');


                let previousSearchArray = JSON.parse(localStorage.getItem('previousSearches')) || [];
                if (previousSearchArray.includes(cityName)) {
                    previousSearchArray.push(cityName);
                    localStorage.setItem('previousSearches', JSON.stringify(previousSearchArray));
                }





            })

            .catch((error) => {
                console.error('Error getting weather data', error);

            });

    }

    function updateSearches() {
        let previousSearchArray = JSON.parse(localStorage.getItem('previousSearches')) || []


        previousSearches.innerHTML = '';

        previousSearchArray.forEach(city => {
            let searchName = document.createElement('h3');
            searchName.setAttribute('data-city', city);
            previousSearches.appendChild(searchName);

            searchName.addEventListener('click', () => {
                cityInput.value = city;
                getWeather();
            })
        });
    };

    getWeatherButton.addEventListener('click', () => {
        getWeather();
        updateSearches();


    });

});
