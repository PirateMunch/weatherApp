

async function getWeather (location) {
    const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=365c088198f2942f06e0b779c8be86fe`,
        { mode: 'cors' }
    );
    const weatherObj = await response.json();
    console.log(weatherObj.wind)
    return weatherObj
};


document.getElementById('button').addEventListener('click', async () => {
    const city =  document.getElementById('weather').value
    const thisWeather = await getWeather(`${city}`)
    console.log(thisWeather)
    sortWeather(thisWeather)

})

function sortWeather (thisWeather) {
    const tempDisp = document.getElementById('temp');
    const windDisp = document.getElementById('wind');
    const sunriseDisp = document.getElementById('sunrise');
    const sunsetDisp = document.getElementById('sunset');
    const temp = tempKtoC(thisWeather.main.temp);
    const windSpeed = thisWeather.wind.speed;
    const windDeg = windConverter(thisWeather.wind.deg);
    const sunrise = timeConverter(thisWeather.sys.sunrise)
    const sunset = timeConverter(thisWeather.sys.sunset);
    console.log(temp, wind, sunrise, sunset)

    tempDisp.innerText = temp
    windDisp.innerText = `speed ${windSpeed} direction ${windDeg}`
    sunriseDisp.innerText = sunrise
    sunsetDisp.innerText = sunset
}

function tempFtoC(fval) {
    return (fval -32) / 1.8;
}

function tempCtoF(cVal) {
    return (cVal * 1.8) +32;
}

function tempKtoC(kVal) {
    const result = kVal - 273.15
    let temp = `${result.toFixed(2)} ℃`
    return temp;
}

function timeConverter(unixTime) {
    return new Date(unixTime * 1e3).toISOString().slice(-13, -5);
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