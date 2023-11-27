document.addEventListener('DOMContentLoaded', () => {
    let getWeatherButton = document.getElementById('get-weather');
    let cityInput = document.getElementById('city-name');
    let iconDiv = document.getElementById('weather-icon');
    let forecastContainer = getWeather('forecast');




    function getWeather() {
        const city = cityInput.value;

        if (!city) {
            alert('Please enter a valid city name');
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
                document.getElementById('city-name').textContent = cityInput.value;

                const temperature = data.list[0].main.temp;
                document.getElementById('temperature').textContent = temperature + 'F';
                let icon = data.list[0].weather[0].icon;
                console.log(icon);

                    let iconUrl = `https://openweathermap.org/img/wn/${icon}.png`;
                    let weatherIcon = document.createElement('img');
                    weatherIcon.src = iconUrl;
                    console.log(weatherIcon);
                    iconDiv.appendChild(weatherIcon);

                    let humidity = data.list[0].main.humidity;
                    let humidityEl = document.createElement('p');
                    humidityEl.textContent = humidity + '%';
                    iconDiv.appendChild(humidityEl);
                    console.log(humidity);

                    let windSpeed = data.list[0].wind.speed;
                    let windSpeedEl = document.createElement('p');
                    windSpeedEl.textContent = windSpeed +'MPH';
                    iconDiv.append(windSpeedEl);

                    let timeStamp = data.list[0].dt_txt.split(' ');
                    console.log(timeStamp);

                    for (let i = 0; i < timeStamp.length; i += 8) {
                        let timeStampEl = document.createElement('p');
                        timeStampEl.textContent  = timeStamp[0];
                        iconDiv.append(timeStampEl);
                        
            
                    }


            })

            .catch((error) => {
                console.error('Error getting weather data', error);

            });

    }
    


    function displayForecast(forecastData) {
        
        let currentDay = 1;
        currentDay = forecastItem;

        if (currentDay) {
            forecastItemDiv = document.createElement('div') 
            forecastItemDiv.classList('.forecast-item');
            iconDiv.appendChild(forecastItemDiv)
        }
    
        else {
            currentDay = i++;

        }
    
        };


        getWeatherButton.addEventListener('click', () => {
            getWeather();
            displayForecast();


        });

    });
    