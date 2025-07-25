let inpt = document.querySelector("input");
let btn = document.querySelector("span");
let temp = document.querySelector(".temp");
let desc = document.querySelector(".description");
let hum = document.querySelector(".hum");
let wind = document.querySelector(".wind");
let place = document.querySelector(".city");
let body = document.querySelector("body");


const apiKey = "";

btn.addEventListener("click", async () => {
    let city = inpt.value;
    console.log(city);
    let img = document.querySelector("img")
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        let response = await axios.get(url);
        
        let data = response.data;
        
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        img.setAttribute("src",iconUrl);        

        let tempVal = data.main.temp;
        let weather = data.weather[0].main;

        if (weather === "Rain") {
            body.style.backgroundColor = "#7DA0CA"; 
        } else if (weather === "Clouds") {
            if (tempVal > 38) {
                body.style.backgroundColor = "#FF914D";
            } else {
                body.style.backgroundColor = "#9DB2BF";
            }
        } else if (weather === "Clear") {
            if (tempVal > 38) {
                body.style.backgroundColor = "#FF914D";
            } else if (tempVal > 15) {
                body.style.backgroundColor = "#87CEEB";
            } else if (tempVal > 5) {
                body.style.backgroundColor = "#3A82D7";
            } else { 
                body.style.backgroundColor = "#005792";
            }
        } else {
            body.style.backgroundColor = "#A9A9A9";
        }


        temp.innerHTML = `${data.main.temp} &deg;C`;
        desc.innerHTML = data.weather[0].main;
        hum.innerHTML = `<i class="fa-solid fa-droplet"></i>  Humidity: ${data.main.humidity}%`;
        wind.innerHTML = `<i class="fa-solid fa-wind"></i>  Wind: ${data.wind.speed} m/s`;
        place.innerHTML = `<i class="fa-solid fa-location-dot"></i> : ${city}`;

        document.querySelector(".extra").classList.add("show");
    }

    catch {
        console.log("City not found..")
    }
});
