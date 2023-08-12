"use strict";

const ipRegex = /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/;
const submitBtn = document.getElementById("submit-btn");
const rawIP = document.getElementById("input-ip");
const outputIP = document.getElementById("ip-address-output");
const outputCity = document.getElementById("city-output");
const outputState = document.getElementById("state-output");
const outputPostal = document.getElementById("postal-output");
const outputCountry = document.getElementById("country-output");
const outputTimezone = document.getElementById("timezone-output");

// Default map display
var map = L.map('map', { zoomControl: false }).setView([41.403706, 2.173504], 16);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19
}).addTo(map);
L.marker([41.403706, 2.173504]).addTo(map);

// Address lookup
const addressLookup = async (userIP) => {
    const ipInfoUrl = `https://ipapi.co/${userIP}/json/`
    try {
        const response = await fetch(ipInfoUrl);
        const data = await response.json();
        console.log(data);

        // display values
        outputIP.textContent = data.ip;
        outputCity.textContent = data.city;
        outputState.textContent = data.region_code;
        outputPostal.textContent = data.postal;
        outputCountry.textContent = data.country_name;
        outputTimezone.textContent = data.utc_offset;
        
        const latitude = data.latitude;
        const longitude = data.longitude;
        displayMap(latitude, longitude);
    } catch (err) {
        console.error(`Error: ${err}`);
    }    
}

// Update map display based on input
const displayMap = (latitude, longitude) => {
    console.log(`Lat: ${latitude} ; Lon: ${longitude}`);
    map.setView([latitude, longitude], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19
}).addTo(map);
    L.marker([latitude, longitude]).addTo(map);
}

submitBtn.addEventListener("click", (e)=> {
    e.preventDefault();
    console.log("Submit button clicked");
    let userIP = rawIP.value;
    console.log(`Input value: ${userIP}`);

    if (ipRegex.test(userIP)) {
        rawIP.classList.remove("show");
        console.log("Valid IP");
        addressLookup(userIP);
    } else {
        console.log("Invalid IP");
        alert("Invalid IP Address")
        rawIP.classList.add("show");
    }
})
