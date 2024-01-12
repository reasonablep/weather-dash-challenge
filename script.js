document.addEventListener('DOMContentLoaded', () => {

// Define global variables

    let getWeatherButton = document.getElementById('get-weather');
    let cityInput = document.getElementById('city-name');
    let weatherContainer = document.getElementById('location')
    let forecastDiv = document.getElementById('forecast-div');
    let previousSearches = document.getElementById('previous-searches')
    let todayForecast = document.getElementById('today-forecast');

// Retrieve previous searches and define function to retrieve the weather from the openweather API

    updateSearches();

    function getWeather() {

        forecastDiv.innerHTML = '';
        weatherContainer.innerHTML = '';
        todayForecast.innterHTML = '';

// API call to openweather

        const city = cityInput.value;

        if (!city) {
            throw new Error('Please enter a valid city name');
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

// Promise function for data received from API call

            .then((data) => {

                console.log("Data received:", data);

                const cityName = city;
                let cityNameEl = document.createElement('p')
                cityNameEl.textContent = `5 Day Forecast: ${cityName}`;
                weatherContainer.appendChild(cityNameEl);


// Today's weather container

                let todayIcon = document.createElement('img');
                todayForecast.textContent = `Today in ${cityName}:`
                let icon = data.list[0].weather[0].icon;
                let iconUrl = `https://openweathermap.org/img/wn/${icon}.png`;
                todayIcon.src = iconUrl;
                todayIcon.classList.add('w-20', 'h-20');
                todayForecast.appendChild(todayIcon);

                let humidity = data.list[0].main.humidity;
                let humidityEl = document.createElement('p');
                humidityEl.textContent = `Humidity: ${humidity}%`;
                todayForecast.appendChild(humidityEl);

                let temp = data.list[0].main.temp;
                let tempEl = document.createElement('p');
                tempEl.textContent = `Temperature: ${temp} F`;
                todayForecast.appendChild(tempEl);



// For loop to create foreacst elements

                for (let i = 0; i < 39; i += 8) {

                    let iconUrl = `https://openweathermap.org/img/wn/${icon}.png`;

                    let weatherIcon = document.createElement('img');
                    weatherIcon.src = iconUrl;
                    weatherIcon.id = 'weather-icon'

                    let forecastDate = data.list[i].dt_txt.split(' ');
                    let dateEl = document.createElement('p');
                    dateEl.textContent = forecastDate[0];
                    dateEl.classList.add('font-bold');

                    forecastDiv.appendChild(dateEl);
                    forecastDiv.appendChild(weatherIcon);

                    let humidity = data.list[i].main.humidity;
                    let humidityEl = document.createElement('p');
                    humidityEl.textContent = 'Humidity: ' + humidity + '%';
                    humidityEl.classList.add('weather-info');
                    forecastDiv.appendChild(humidityEl);

                    let windSpeed = data.list[i].wind.speed;
                    let windSpeedEl = document.createElement('p');
                    windSpeedEl.textContent = 'Wind Speed: ' + windSpeed + 'MPH';
                    windSpeedEl.classList.add('weather-info');
                    forecastDiv.append(windSpeedEl);

                    const temperature = data.list[i].main.temp;
                    let tempEl = document.createElement('p');
                    tempEl.textContent = 'Current Temperature: ' + temperature + ' F ';
                    tempEl.classList.add('weather-info');
                    forecastDiv.appendChild(tempEl);

                    let dayDiv = document.createElement('div');
                    dayDiv.classList.add('flex', 'flex-col', 'items-center', 'border');

                    dayDiv.appendChild(dateEl);
                    dayDiv.appendChild(weatherIcon);
                    dayDiv.appendChild(humidityEl);
                    dayDiv.appendChild(windSpeedEl)
                    dayDiv.appendChild(tempEl);

                    forecastDiv.appendChild(dayDiv);

                }


// Local storage array that gets previous cities and pushes the new city if it is not in the array currently

                let previousSearchArray = JSON.parse(localStorage.getItem('previousSearches')) || [];
                if (!previousSearchArray.includes(cityName)) {
                    previousSearchArray.push(cityName);
                    localStorage.setItem('previousSearches', JSON.stringify(previousSearchArray));
                }
            })

            .catch((error) => {
                console.error('Error getting weather data', error);

            });
    }

// Function for updating searches and displaying them to the page 

    function updateSearches() {
        let previousSearchArray = JSON.parse(localStorage.getItem('previousSearches')) || []
        previousSearches.innerHTML = '';

        searchBanner = document.createElement('h2');
        searchBanner.textContent = 'Search History';
        searchBanner.classList.add('text-md', 'border', 'rounded-md', 'border-black', 'max-w-md', 'mb-5', 'font-bold');
        previousSearches.appendChild(searchBanner);

        previousSearchArray.forEach(city => {
            let searchName = document.createElement('h3');
            searchName.classList.add('text-sm', 'border', 'rounded-md', 'bg-slate-100', 
            'cursor-pointer', 'max-w-md')
            searchName.textContent = city;
            searchName.setAttribute('data-city', city);
            previousSearches.appendChild(searchName);

            searchName.addEventListener('click', () => {
                cityInput.value = city;
                getWeather();
            })
        });
    };

// Listener for getWeather button

    getWeatherButton.addEventListener('click', () => {
        getWeather();
        updateSearches();
    });
});
