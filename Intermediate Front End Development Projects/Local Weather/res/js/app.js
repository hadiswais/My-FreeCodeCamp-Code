
// init url, api key, var
var FORECAST_URL = 'https://api.darksky.net/forecast/';
var FORECAST_API = '8241fc7041a7541489166b97fee79293';
var latitude, longitude;
var gmap;
var unit = 'auto';
var weatherData = null;
var skycons = new Skycons({ "color": "white" });
var fullAddress = '';
var imgArr = [
    'url("http://i.imgur.com/DKqVx1Q.jpg")',
    'url("http://i.imgur.com/5MOIkk6.jpg")',
    'url("http://i.imgur.com/voCuONs.jpg")',
    'url("http://i.imgur.com/VNyUztK.jpg")',
];

// get latitude and longitude
function getLocation() {
    if (navigator.geolocation)
        navigator.geolocation.getCurrentPosition(success);
    else
        alert('Geolocation not supported');

    function success(position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;

        // send latitude and longitude to gmap to get full address
        gmap = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude;

        //call fetchWeather to get the data
        fetchWeather();

        // cal getAddress to get full address
        getAddress();
    }
}

// get full address from gmap
function getAddress() {
    $.ajax({
        url: gmap,
        dataType: "json",
        success: function (data) {
            var result = data.results[0];
            fullAddress = result.formatted_address;
        },
        error: function () {
            alert("something wrong happened with Address, try again!");
        }
    });
}

// get the weather data from darkSky api
function fetchWeather() {
    $.ajax({
        url: FORECAST_URL + FORECAST_API + '/' + latitude + ',' + longitude + '?' + 'units=' + unit,
        dataType: "jsonp",
        success: function (data) {
            weatherData = data;
            currentWeather();
            setBackgroud();
        },
        error: function () {
            alert("something wrong happened with weather data, try again!");
        }
    });
}

// round the temperature
function round(number, points) {
    return number.toFixed(points);
}

// set cuurent weather data to the html
function currentWeather() {

    $('#fullAddress').text(fullAddress);
    switch (weatherData.currently.icon) {
        case 'clear-night':
            skycons.add("icon", Skycons.CLEAR_NIGHT);
            break;
        case 'clear-day':
            skycons.add("icon", Skycons.CLEAR_DAY);
            break;
        case 'partly-cloudy-day':
            skycons.add("icon", Skycons.PARTLY_CLOUDY_DAY);
            break;
        case 'partly-cloudy-night':
            skycons.add("icon", Skycons.PARTLY_CLOUDY_NIGHT);
            break;
        case 'cloudy':
            skycons.add("icon", Skycons.CLOUDY);
            break;
        case 'rain':
            skycons.add("icon", Skycons.RAIN);
            break;
        case 'sleet':
            skycons.add("icon", Skycons.SLEET);
            break;
        case 'snow':
            skycons.add("icon", Skycons.SNOW);
            break;
        case 'wind':
            skycons.add("icon", Skycons.WIND);
            break;
        case 'fog':
            skycons.add("icon", Skycons.FOG);
            break;
    }
    skycons.play();

    $('#temp').text(round(weatherData.currently.temperature, 0));

    if (weatherData.flags.units == 'si')
        $('#unit').html('&#8451;');

    else if (weatherData.flags.units == 'us')
        $('#unit').html('&#8457;');

    $('#sum').text(weatherData.currently.summary);
}

// chaneg between weather units
$("#unit").click(function () {
    if (weatherData.flags.units === 'si')
        unit = 'us';
    else
        unit = 'si'
    fetchWeather();
});

// set background based on temperature
function setBackgroud() {
    var tempArr;
    var curTemp = round(weatherData.currently.temperature, 0);

    if (weatherData.flags.units == 'si')
        tempArr = [32, 21, 0];
    else
        tempArr = [90, 70, 32];

    if (curTemp >= tempArr[0])
        $('body').css('background-image', imgArr[0]);
    else if (curTemp < tempArr[0] && curTemp >= tempArr[1])
        $('body').css('background-image', imgArr[1]);
    else if (curTemp < tempArr[1] && curTemp >= tempArr[2])
        $('body').css('background-image', imgArr[2]);
    else if (curTemp < tempArr[2])
        $('body').css('background-image', imgArr[3]);
}

// call getLocation when page is ready
$(document).ready(function () {
    getLocation();
});