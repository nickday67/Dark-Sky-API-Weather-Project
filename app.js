"use strict";

window.addEventListener("load", () => {
    let lat;
    let long;
    const locationTimezone = document.querySelector(".location-timezone");
    const temperatureDegree = document.querySelector(".temperature-degree");
    const temperatureDescription = document.querySelector(".temperature-description");
    const temperatureSection = document.querySelector(".temperature-section");
    const temperatureSpan = document.querySelector(".temperature-section span");

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            lat = position.coords.latitude;
            long = position.coords.longitude;
            console.log(position);

            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/d6a149f0128cb31a5dc69800b7c63bdb/${lat},${long}`;

            fetch(api)
                .then(response => {
                return response.json();
                })
                .then(data => {
                    console.log(data);
                    const {temperature, summary, icon} = data.currently;
                    // Set DOM Elements from the API
                    locationTimezone.textContent = data.timezone;
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    // Celsius to Farenheit Formula
                    let celsius = (temperature - 32) * (5/9);
                    // Set Icons
                    setIcons(icon, document.querySelector(".icon"));
                    // Changing the temperature from Celsius to Farenheit
                    temperatureSection.addEventListener("click", () => {
                        if(temperatureSpan.textContent === "F") {
                            temperatureSpan.textContent = "C";
                            temperatureDegree.textContent = Math.floor(celsius);
                        } else {
                            temperatureSpan.textContent = "F";
                            temperatureDegree.textContent = temperature;
                        }
                    });
            });
        });
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({            
            "color": {
                "main" : "azure",
                "sun" : "yellow",
                "snow" : "white",
                "light_cloud" : "lightgrey",
                "cloud" : "grey",
                "dark_cloud" : "#444444",
                "rain" : "powderblue",
                "thunder" : "yellow",
                "wind" : "green",
                "moon" : "#f5f3ce"
            }        
        });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
})