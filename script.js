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

                })

                .catch((error) => {
                    console.error('Error getting weather data', error);

                });

        }

        function displayForecast(forecastData) {
            forecastContainer.innerHTML = '';
            const iconDiv = document.getElementById('weather-icon');
            iconDiv.innerHTML = '';

            const dailyForecasts = {};

            forecastData.forEach((forecastItem) => {
                const timeStamp = forecastItem.dt;
                const date = new Date(timeStamp * 1000);
                const dateKey = formatDate(date);

                if (!dailyForecasts[dateKey]) {
                    dailyForecasts[dateKey] = {
                        date: date,
                        temperatureSum: 0,
                        temperatureCount: 0,
                        weatherIcons: []
                    };
                }


                const temperature = forecastItem.main.temp;
                const weatherIconCode = forecastItem.weather[0].icon;

                dailyForecasts[dateKey].temperatures.push(temperature);
                dailyForecasts[dateKey].weatherIcons.push(weatherIconCode);

            });

            for (const dateKey in dailyForecasts) {

                if (dailyForecasts.hasOwnProperty(dateKey)) {
                    const forecast = dailyForecasts[dateKey];
                    const averageTemperature = forecast.temperatureSum / forecast.temperatureCount;
                    const weatherIconCode = getMostCommonWeatherIcon (forecast.weatherIcons);
                
            

                const forecastItemDiv = document.createElement('div');
                forecastItemDiv.className = 'forecast-item';

                const forecastDate = document.createElement('p');
                forecastDate.textContent = formatDate(date);

                const forecastTemp = document.createElement('p');
                forecastTemp.textContent = averageTemperature.toFixed(2) + 'F';

                const iconUrl = `https://openweathermap.org/img/wn/${weatherIconCode}.png`;
                const weatherIcon = document.createElement('img');
                weatherIcon.src = iconUrl;

            
                iconDiv.appendChild(weatherIcon);

                forecastItemDiv.appendChild(forecastDate);
                forecastItemDiv.appendChild(weatherIcon);
                forecastItemDiv.appendChild(forecastTemp);
                forecastContainer.appendChild(forecastItemDiv);


            }

        }

    }

        function formatDate(date) {

            const options = { weekday: 'long', hour: 'numeric', minute: 'numeric' };
            return date.toLocaleDateString('en-US', options);
        }

        function getMostCommonWeatherIcon (icons) {

            const iconCounts = {};
            for (const icon of icons) {
                if (iconCounts[icon]) {
                    iconCounts[icon]++;
                    } else {
                        iconCounts[icon] = 1;

                }
            }
    
            let mostCommonIcon = '';
            let maxCount = 0
            for (const icon in iconCounts) {
                if (iconCounts[icon] > maxCount) {
                    mostCommonIcon = icon;
                    maxCount = iconCounts[icon];
                }
            }

            return mostCommonIcon;
        }

        getWeather();


    });

});