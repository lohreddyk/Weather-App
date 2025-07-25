const inpt = document.querySelector("input");
const btn = document.querySelector("button");
const temp = document.querySelector(".temp");
const desc = document.querySelector(".description");
const hum = document.querySelector(".hum");
const wind = document.querySelector(".wind");
const place = document.querySelector(".city");
const body = document.querySelector("body");
const img = document.querySelector("#weather-icon");

const apiKey = "054e9868acc66f09f5ac67f07f31ab39"; // Your provided API key

btn.addEventListener("click", async () => {
    btn.disabled = true;
    btn.innerText = "Loading...";
    let city = inpt.value.trim();
    
    if (!city) {
        alert("Please enter a city name.");
        btn.disabled = false;
        btn.innerText = "Search";
        return;
    }

    city = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await axios.get(url);
        const data = response.data;

        // Update weather icon
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        img.setAttribute("src", iconUrl);
        img.setAttribute("alt", `Weather icon for ${data.weather[0].main}`);

        // Update background based on weather and temperature
        const tempVal = data.main.temp;
        const weather = data.weather[0].main;

        if (weather === "Rain") {
            body.style.backgroundColor = "#7DA0CA";
        } else if (weather === "Clouds") {
            body.style.backgroundColor = tempVal > 38 ? "#FF914D" : "#9DB2BF";
        } else if (weather === "Clear") {
            if (tempVal > 38) body.style.backgroundColor = "#FF914D";
            else if (tempVal > 15) body.style.backgroundColor = "#87CEEB";
            else if (tempVal > 5) body.style.backgroundColor = "#3A82D7";
            else body.style.backgroundColor = "#005792";
        } else if (weather === "Snow") {
            body.style.backgroundColor = "#F5F5F5";
        } else if (weather === "Mist" || weather === "Fog") {
            body.style.backgroundColor = "#B0C4DE";
        } else if (weather === "Thunderstorm") {
            body.style.backgroundColor = "#4B0082";
        } else {
            body.style.backgroundColor = "#A9A9A9";
        }

        // Update UI elements
        temp.innerHTML = `${data.main.temp} °C`;
        desc.innerHTML = data.weather[0].main;
        hum.innerHTML = `<i class="fa-solid fa-droplet"></i> Humidity: ${data.main.humidity}%`;
        wind.innerHTML = `<i class="fa-solid fa-wind"></i> Wind: ${data.wind.speed} m/s`;
        place.innerHTML = `<i class="fa-solid fa-location-dot"></i> ${city}`;
        
        // Show extra details
        document.querySelector(".extra").classList.add("show");

        // Clear input
        inpt.value = "";

        // Reset button
        btn.disabled = false;
        btn.innerText = "Search";
    } catch (error) {
        console.error("Error fetching weather data:", error);
        let errorMsg = "An error occurred. Please try again.";
        if (error.response) {
            if (error.response.status === 401) {
                errorMsg = "Invalid API key. Please check your API key.";
            } else if (error.response.status === 404) {
                errorMsg = `City not found: ${city}. Please enter a valid city name.`;
            }
        }
        alert(errorMsg);
        btn.disabled = false;
        btn.innerText = "Search";
    }
});
