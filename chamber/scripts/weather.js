const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('#weather-desc');

const apiKey = 'd050edeeb4a01c9df7de7dd231adaf5c';
const lat = '0.3476'; // Jinja, Uganda latitude
const lon = '33.2038'; // Jinja, Uganda longitude

const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

async function apiFetch() {
    if (!currentTemp || !weatherIcon || !captionDesc) return;

    try {
        // Fetch current weather
        const currentResponse = await fetch(currentWeatherUrl);
        if (currentResponse.ok) {
            const currentData = await currentResponse.json();
            displayCurrentWeather(currentData);
            document.getElementById('city-name').textContent = currentData.name;

            const descElement = document.getElementById('description');
            if (descElement) {
                descElement.textContent = currentData.weather[0].description;
            }
        } else {
            throw Error(await currentResponse.text());
        }

        // Fetch forecast data
        const forecastResponse = await fetch(forecastUrl);
        if (forecastResponse.ok) {
            const forecastData = await forecastResponse.json();
            displayForecast(forecastData);
        } else {
            throw Error(await forecastResponse.text());
        }
    } catch (error) {
        console.log(error);
    }
}

function displayCurrentWeather(data) {
    currentTemp.innerHTML = Math.round(data.main.temp);
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    let desc = data.weather[0].description;

    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.textContent = desc.toUpperCase();
}

function displayForecast(data) {
    // Get unique dates for the next 3 days
    const forecastList = data.list;
    const dailyForecasts = {};

    forecastList.forEach(forecast => {
        const date = new Date(forecast.dt * 1000);
        const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

        // Store only the first forecast for each day (to get consistent data)
        if (!dailyForecasts[dateStr]) {
            const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
            dailyForecasts[dateStr] = {
                date: dateStr,
                dayName: dayName,
                temp: Math.round(forecast.main.temp),
                tempMax: Math.round(forecast.main.temp_max),
                tempMin: Math.round(forecast.main.temp_min),
                description: forecast.weather[0].description
            };
        }
    });

    // Get the next 3 days
    const forecastDays = Object.values(dailyForecasts).slice(0, 3);

    // Create or update forecast display
    let forecastContainer = document.getElementById('forecast-container');
    if (!forecastContainer) {
        forecastContainer = document.createElement('div');
        forecastContainer.id = 'forecast-container';
        forecastContainer.style.cssText = 'display: flex; gap: 15px; margin-top: 20px; flex-wrap: wrap;';
        const weatherCard = document.querySelector('.weather-card');
        if (weatherCard && weatherCard.parentElement) {
            weatherCard.parentElement.appendChild(forecastContainer);
        }
    }

    forecastContainer.innerHTML = '';

    forecastDays.forEach((day) => {
        const forecastDay = document.createElement('div');
        forecastDay.style.cssText = 'flex: 1; min-width: 150px; padding: 15px; background-color: #f0f0f0; border-radius: 8px; text-align: center;';
        forecastDay.innerHTML = `
            <h4 style="margin: 0 0 10px 0; font-size: 14px; color: #333;">
                ${day.dayName} - ${day.date}
            </h4>
            <p style="margin: 5px 0; font-size: 18px; font-weight: bold; color: #1976d2;">
                ${day.tempMax}°C / ${day.tempMin}°C
            </p>
            <p style="margin: 5px 0; font-size: 12px; color: #666; text-transform: capitalize;">
                ${day.description}
            </p>
        `;
        forecastContainer.appendChild(forecastDay);
    });
}

apiFetch();