"use strict";

const apiKey = "d6a149f0128cb31a5dc69800b7c63bdb"

window.addEventListener("load", () => {
    const lat;
    const long;

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            lat = position.coords.latitude;
            long = position.coords.longitude;
            // console.log(position);
        });
    } // else {
      //  Insert Alert here if the user doesn't allow geolocation
    // }
})