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
                    // Set Icons
                    setIcons(icon, document.querySelector(".icon"));
                    // Changing the temperature from Celsius to Farenheit
                    temperatureSection.addEventListener("click", () => {
                        if(temperatureSpan.textContent === "F") {
                            temperatureSpan.textContent = "C";
                        } else {
                            temperatureSpan.textContent = "F";
                        }
                    });
            });
        });
    } // else {
      //  Insert Alert here if the user doesn't allow geolocation
    // }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({color: "azure"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
})