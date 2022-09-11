async function getWeather(location) {
    const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=365c088198f2942f06e0b779c8be86fe`,
        { mode: 'cors' }
    );
    const weatherObj = await response.json();
    console.log(weatherObj.wind);
    return weatherObj;
}

document.getElementById('button').addEventListener('click', async () => {
    const city = document.getElementById('weather').value;
    const thisWeather = await getWeather(`${city}`);
    sortWeather(thisWeather);
});


function sortWeather(thisWeather) {
    const tempDisp = document.getElementById('temp');
    const feelsDisp = document.getElementById('tempFeels');
    const windDisp = document.getElementById('wind');
    const sunriseDisp = document.getElementById('sunrise');
    const sunsetDisp = document.getElementById('sunset');
    const locationDisp = document.getElementById('location');
    const descriptionDisp = document.getElementById('description');
    const weatherIconDisp = document.getElementById('weatherIcon');
    const localTime = document.getElementById('localTime');
    const humidityDisp = document.getElementById('humidity');
    const tempC = tempKtoC(thisWeather.main.temp);
    const feelsC = tempKtoC(thisWeather.main.feels_like);
    const windSpeed = windSpeedConverter(thisWeather.wind.speed);
    const windDeg = windConverter(thisWeather.wind.deg);
    const sunrise = timeConverter(thisWeather.sys.sunrise);
    const sunset = timeConverter(thisWeather.sys.sunset);
    const description = thisWeather.weather[0].description;
    const icon = thisWeather.weather[0].icon;
    tempDisp.innerText = `${tempC}°`;
    feelsDisp.innerText = `feels like ${feelsC}°`;
    windDisp.innerText = `wind speed - ${windSpeed} mph
    wind direction - ${windDeg}`;
    sunriseDisp.innerText = `${sunrise}`;
    sunsetDisp.innerText = `${sunset}`;
    descriptionDisp.innerText = description;
    locationDisp.innerText = `${thisWeather.name} , ${thisWeather.sys.country}`;
    weatherIconDisp.innerHTML = `<img src="https://openweathermap.org/img/w/${icon}.png">`;
    localTime.innerText = `${new Date().toLocaleDateString()}`;
    humidityDisp.innerText = `humidity ${thisWeather.main.humidity}%`;
    getImage(description);

    document.getElementById('convertTemp').addEventListener('click', (e) => {
        toggleTemp(thisWeather, tempDisp, feelsDisp);
        getImage(description)
    })
}

function toggleTemp (thisWeather, tempDisp, feelsDisp) {
    const tempF = tempKtoF(thisWeather.main.temp);
    const feelsF = tempKtoF(thisWeather.main.feels_like);
    const tempC = tempKtoC(thisWeather.main.temp);
    const feelsC = tempKtoC(thisWeather.main.feels_like);
    const button = event.target;
    if (button.innerText === 'show ℉') {
    tempDisp.innerText = `${tempF}°`;
    feelsDisp.innerText = `feels like ${feelsF}°`;
    button.innerText = 'show ℃';
    } else {
        tempDisp.innerText = `${tempC}°`;
        feelsDisp.innerText = `feels like ${feelsC}°`;
        button.innerText = 'show ℉';
    }
 }

function tempKtoF(kVal) {
    const cVal = kVal - 273.5;
    const fVal = cVal * 1.8 + 32;
    const temp = `${fVal.toFixed(0)}`;
    return temp;
}

function tempKtoC(kVal) {
    const result = kVal - 273.15;
    let temp = `${result.toFixed(0)}`;
    return temp;
}

function timeConverter(unixTime) {
    return new Date(unixTime * 1e3).toISOString().slice(-13, -8);
}

function windSpeedConverter(mps) {
    const mph = +(2.23694 * mps).toFixed(2);
    return mph;
}

function windConverter(deg) {
    if (deg > 337.5) return 'northerly';
    if (deg > 292.5) return 'north westerly';
    if (deg > 247.5) return 'westerly';
    if (deg > 202.5) return 'south westerly';
    if (deg > 157.5) return 'southerly';
    if (deg > 122.5) return 'south easterly';
    if (deg > 67.5) return 'easterly';
    if (deg > 22.5) return 'north easterly';
    return 'northerly';
}

async function defaultDisplay() {
    const thisWeather = await getWeather(`london`);
    sortWeather(thisWeather);
}
window.onload = defaultDisplay()

async function getImage(type) {
    const response = await fetch(
        `https://api.giphy.com/v1/gifs/translate?api_key=9FQ3YNPxHlSFhcbwKVjp1gKRf86bjYx6&s=${type}`,
        { mode: 'cors' }
    );
    const imageData = await response.json();
    const boss = document.getElementById('boss')
    boss.innerText = imageData.data.images.original.url
    boss.src = imageData.data.images.original.url;
}