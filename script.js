let weather = {
    "apiKey": "94db51cc95758ce6f0a1ba508beb178b",
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" 
            + city 
            + "&units=metric&appid=" 
            + this.apiKey
        )
            .then((response) => { if (!response.ok) {
                alert("No weather found.");
                throw new Error("No weather found.");
              }
              return response.json();
            })
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".container__weather__city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".container__weather__description").innerText = description;
        document.querySelector(".container__weather__temp").innerText = temp + " °C";
        document.querySelector(".container__weather__humidity").innerText = "Humidity: " + humidity + " %";
        document.querySelector(".container__weather__wind").innerText = "Wind speed: " + speed + " km/h";
        document.querySelector(".container__weather").classList.remove("loading");
    },
    search: function () {
        this.fetchWeather(document.querySelector(".container__search--search-bar").value);
    },
};

document.querySelector(".container__search--btn").addEventListener("click", function () {
    weather.search();
});

document.querySelector(".container__search--search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.search();
    }
    });

weather.fetchWeather("Warsaw");
