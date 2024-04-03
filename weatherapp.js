const buttonclick = document.querySelector(".searchIcon")
const inputInfo = document.querySelector(".textInput")
const imageInfo = document.querySelector(".weatherImage")
const weatherInfo = document.querySelector(".weatherDescription")
const cityInfo = document.querySelector(".cityDisplay")


inputInfo.addEventListener("keypress", function() {
    if (event.key === "Enter") {
        cityNamer = inputInfo.value;
        fetchMyWeather(cityNamer)
        inputInfo.value = ""
        imageInfo.innerHTML = ""
    }
})

buttonclick.addEventListener("click", function() {
        cityNamer = inputInfo.value;
        fetchMyWeather(cityNamer)
        inputInfo.value = ""
        imageInfo.innerHTML = ""
})

const apiKey = "7a734a1d8597923e6afbf4328ad6258e";


//First needed to get the Latitude and Longitude to access the other data
async function fetchMyWeather(cityName) {
    if (cityName.includes(",")) {
        cityName = cityName.split(',')
    } else {
        cityName = cityName.split(' ')
    };
    
    const apiLat = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName[0]},${cityName[1]}&limit=1&appid=${apiKey}`
    const response = await fetch(apiLat)
    const data = await response.json()
    if (data.length === 0) {
        cityDescription = ("")
        weatherInfo.innerHTML = ("Please Enter a Valid City")
        cityInfo.innerHTML = ('')
    };
    lat = data[0].lat
    lon = data[0].lon


//Nested async function to fetch the temperature data
    async function fetchMyTemp() {
        const apiTemp = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
        const apiTemp1 = await fetch(apiTemp)
        const temp = await apiTemp1.json()

        let temperature = (temp.main.temp)
        let mainWeather = (temp.weather[0].main)
        let weather12 = (temp.weather[0])
        // The temperature is in kelvin so I changed it to farenheit
        temperature -= 273.15;
        temperature *= 1.8;
        temperature += 32;
        temperature = Math.round(temperature)

        let cityDescriptionStarter = "It is";
        let cityDescription = "";
        // Code to changes the display to actually show the weather
        if (mainWeather === "Clouds") {
            imageInfo.innerHTML = "<img src='cloudy.png' alt='clouds' height='400px'>"
            cityDescription = cityDescriptionStarter.concat(" ", temperature, " and Cloudy in ", cityName[0])
            weatherInfo.innerHTML = cityName[0]
            cityInfo.innerHTML = cityDescription
            cityInfo.classList.add("weatherAnimation");
            weatherInfo.classList.add("weatherAnimation");
            imageInfo.classList.add("weatherAnimation");

        } else if (mainWeather === "Clear") {
            imageInfo.innerHTML = "<img src='sunny.png' alt='sunny' height='400px'>"
            cityDescription = cityDescriptionStarter.concat(" ", temperature, " and Sunny in ", cityName[0])
            weatherInfo.innerHTML = cityName[0]
            cityInfo.innerHTML = cityDescription
            cityInfo.classList.add("weatherAnimation");
            weatherInfo.classList.add("weatherAnimation");
            imageInfo.classList.add("weatherAnimation");

        } else if (mainWeather === "Rain" || mainWeather === "Drizzle") {
            imageInfo.innerHTML = "<img src='raining.png' alt='rain' height='400px'>"
            cityDescription = cityDescriptionStarter.concat(" ", temperature, " and Rainy in ", cityName[0])
            weatherInfo.innerHTML = cityName[0]
            cityInfo.innerHTML = cityDescription
            cityInfo.classList.add("weatherAnimation");
            weatherInfo.classList.add("weatherAnimation");
            imageInfo.classList.add("weatherAnimation");

        } else if (mainWeather === "Thunderstorm") {
            imageInfo.innerHTML = "<img src='thunderbolt.png' alt='thunderstorm' height='400px'>"
            cityDescription = cityDescriptionStarter.concat(" ", temperature, " and there is a Thunderstorm in ", cityName[0])
            weatherInfo.innerHTML = cityName
            cityInfo.innerHTML = cityDescription
            cityInfo.classList.add("weatherAnimation");
            weatherInfo.classList.add("weatherAnimation");
            imageInfo.classList.add("weatherAnimation");

        } else if (mainWeather === "Snow") {
            imageInfo.innerHTML = "<img src='hailstorm.png' alt='Snow' height='400px'>"
            cityDescription = cityDescriptionStarter.concat(" ", temperature, " and there is Snow in ", cityName[0])
            weatherInfo.innerHTML = cityName[0]
            cityInfo.innerHTML = cityDescription
            cityInfo.classList.add("weatherAnimation");
            weatherInfo.classList.add("weatherAnimation");
            imageInfo.classList.add("weatherAnimation");

        } else {
            imageInfo.innerHTML = "<img src='windy.png' alt='Atmosphere' height='400px'>"
            cityDescription = cityDescriptionStarter.concat(" ", temperature, " and ", mainWeather, " in ", cityName[0])
            weatherInfo.innerHTML = cityName[0]
            cityInfo.innerHTML = cityDescription
            cityInfo.classList.add("weatherAnimation");
            weatherInfo.classList.add("weatherAnimation");
            imageInfo.classList.add("weatherAnimation");

        };

    }
    cityInfo.classList.remove("weatherAnimation");
    weatherInfo.classList.remove("weatherAnimation");
    imageInfo.classList.remove("weatherAnimation");
    fetchMyTemp()
}

fetchMyWeather("Chicago")