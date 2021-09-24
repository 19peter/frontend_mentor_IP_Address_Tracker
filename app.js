const apiKey = "ULBuQfK6Yf8fcrY242UeBsL2hG0j6";
const access_token = "pk.eyJ1IjoiMTlwZXRlciIsImEiOiJja3R2aTM3MHExazU4MzJxZWFycXIyaTU4In0.dEeBHUrrgCc-AenBW51ZRA"
const btn = document.querySelector(".btn");
const input = document.querySelector(".input");
const addressDetail = document.querySelector(".address-detail");
const locationDetail = document.querySelector(".location-detail");
const timezoneDetail = document.querySelector(".timezone-detail");
const ispDetail = document.querySelector(".isp-detail");


let ip = "";

var mymap;
var marker;

let lat;
let lng;


function updateDetails(data) {
    lat = data.location.lat;
    lng = data.location.lng;


    addressDetail.innerHTML = data.ip;
    locationDetail.innerHTML = data.location.city + ", " + data.location.region;
    timezoneDetail.innerHTML = "UTC " + data.location.timezone
    ispDetail.innerHTML = data.isp;
}

function updatedFetch() {
    ip = input.value;
    fetch(" https://geo.ipify.org/api/v1?apiKey=at_" + apiKey + "&ipAddress=" + ip)
        .then(res => res.json())
        .then(data => {
            updateDetails(data)


            mymap.panTo([lat, lng])
            marker = L.marker([lat, lng]).addTo(mymap);
        })
}


window.onload = () => {
    input.value = "";
}

fetch(" https://geo.ipify.org/api/v1?apiKey=at_" + apiKey + "&ipAddress=" + ip)
    .then(res => res.json())
    .then(data => {


        //details
        updateDetails(data)



        //map
        mymap = L.map('mapid').setView([lat, lng], 13);

        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: access_token
        }).addTo(mymap);
        marker = L.marker([lat, lng]).addTo(mymap);



    })


btn.addEventListener("click", function () {
    updatedFetch()
})

input.addEventListener("keyup", function(e) {
    if (e.keyCode === 13 ){
        updatedFetch()
    } else {

    }
})













