"use strict";

window.addEventListener("load", () => {
    let lat;
    let long;
    const locationTimezone = document.querySelector(".location-timezone");
    const temperatureDegree = document.querySelector(".temperature-degree");
    const temperatureDescription = document.querySelector(".temperature-description");

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
                    const {temperature, summary} = data.currently;
                    // Set DOM Elements from the API
                    locationTimezone.textContent = data.timezone;
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;                
            });
        });    
    } // else {
      //  Insert Alert here if the user doesn't allow geolocation
    // }
})