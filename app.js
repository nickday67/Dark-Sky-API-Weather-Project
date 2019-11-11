"use strict";

window.addEventListener("load", () => {
    const lat;
    const long;

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            lat = position.coords.latitude;
            long = position.coords.longitude;
            // console.log(position);

            const proxy = "https://cors-anywhere.herokuapp.com/";
            const apiKey = `${proxy}https://api.darksky.net/forecast/d6a149f0128cb31a5dc69800b7c63bdb${lat},${long}`;

            fetch(apiKey)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                const {} = data.currently;
            })
        });    
    } // else {
      //  Insert Alert here if the user doesn't allow geolocation
    // }
})