window.addEventListener('DOMContentLoaded', () => {
    const api = {
        key: '3441620f0eb56118165eee892eb1544a',
        baseurl: 'https://api.openweathermap.org/data/2.5/',
    };

    const searchBox = document.querySelector('.search-box');
    const searchBtn = document.querySelector('.search-btn');

    let now = new Date();
    let date = document.querySelector(".location .date");
    date.innerHTML = dateBuilder(now);

    searchBox.addEventListener('keypress', setQuery);
    searchBtn.addEventListener('keypress', setQuery);

    function setQuery(e) {
        if (e.keyCode == 13) {
            getResults(searchBox.value);
            // console.log(searchBox.value);
        }
        searchBtn.addEventListener('click', function(){
            getResults(searchBox.value);
            // console.log(searchBox.value);
        })
    }

    function getResults(query) {
        fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)
            .then((weather) => {
                return weather.json();
            })
            .then(displayResults);
    }

    function displayResults(weather) {
        // console.log(weather);
        let city = document.querySelector(".location .city");
        city.innerHTML = `${weather.name}, ${weather.sys.country}`;

        let now = new Date();
        let date = document.querySelector(".location .date");
        date.innerHTML = dateBuilder(now);

        let temp = document.querySelector(".temp");
        temp.innerHTML = `${Math.round(weather.main.temp)} <span class="fw-light">°C</span>`;

        let weatherEl = document.querySelector(".weather");
        weatherEl.innerHTML = `${weather.weather[0].main}`;

        let hilow = document.querySelector(".hi-low");
        hilow.innerHTML = `${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`;
    }

    function dateBuilder(c) {
        let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        let day = days[c.getDay()];
        let date = c.getDate();
        let month = months[c.getMonth()];
        let year = c.getFullYear();

        return `${day} ${date} ${month} ${year}`
    }

})