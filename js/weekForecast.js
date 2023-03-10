const weekGrid = document.querySelector('#week-grid');


//get location
const getLocation = async () => {
    
    const success = async (pos) => {
        const crd = pos.coords;

        const lat = crd.latitude;
        const long = crd.longitude;

        const weather = await getWeather(lat, long)

        html(weather)
    };
      
    function error() {
    document.querySelector('body').innerHTML += `
    <div id="fail">
        <img src="assets/location.svg" alt="Location not found icon">
        <div>
            It seems like Geolocation, which is required for this page, is not enabled in your browser. Please turn it on.
        </div>
    </div>
    `;
    };

    navigator.geolocation.getCurrentPosition(success, error);

};


//get weather infomation
const getWeather = async (lat, lon) => {

    const api = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m,weathercode`

    const response = await fetch(api)

    const data = await response.json();

    const humidity = await data.hourly.relativehumidity_2m;
    const temp = await data.hourly.temperature_2m;
    const time = await data.hourly.time;
    const wwo = await data.hourly.weathercode;
    
    return {
        humidity,
        temp,
        time,
        wwo
    };

};


//generate html
const html = async (weather) => {

    const wwo = await weather.wwo;
    const temp = await weather.temp;
    const time = await weather.time;

    // day names
    let day1 = getDayName(time[9]);
    let day2 = getDayName(time[33]);
    let day3 = getDayName(time[57]);
    let day4 = getDayName(time[81]);
    let day5 = getDayName(time[105]);
    let day6 = getDayName(time[129]);
    let day7 = getDayName(time[153]);
    
    weekGrid.innerHTML = `

    <div class="day">
                <aside>
                    <img src="assets/weather-icons/${wwo[9]}.svg" alt="">
                    <h2>${day1}</h2>
                </aside>
                <div class="text">
                    <span class="time"><i class="fa-regular fa-clock"></i>  9:00</span>
                    <span class="deg"><i class="fa-solid fa-temperature-three-quarters"></i>  ${temp[9]}&deg;c</span>
                </div>
            </div>
            <div class="day">
                <aside>
                    <img src="assets/weather-icons/${wwo[33]}.svg" alt="">
                    <h2>${day2}</h2>
                </aside>
                <div class="text">
                    <span class="time"><i class="fa-regular fa-clock"></i>  9:00</span>
                    <span class="deg"><i class="fa-solid fa-temperature-three-quarters"></i>  ${temp[33]}&deg;c</span>
                </div>
            </div>

            <div class="day">
                <aside>
                    <img src="assets/weather-icons/${wwo[57]}.svg" alt="">
                    <h2>${day3}</h2>
                </aside>
                <div class="text">
                    <span class="time"><i class="fa-regular fa-clock"></i>  9:00</span>
                    <span class="deg"><i class="fa-solid fa-temperature-three-quarters"></i>  ${temp[57]}&deg;c</span>
                </div>
            </div>
            <div class="day">
                <aside>
                    <img src="assets/weather-icons/${wwo[81]}.svg" alt="">
                    <h2>${day4}</h2>
                </aside>
                <div class="text">
                    <span class="time"><i class="fa-regular fa-clock"></i>  9:00</span>
                    <span class="deg"><i class="fa-solid fa-temperature-three-quarters"></i>  ${temp[81]}&deg;c</span>
                </div>
            </div>

            <div class="day">
                <aside>
                    <img src="assets/weather-icons/${wwo[105]}.svg" alt="">
                    <h2>${day5}</h2>
                </aside>
                <div class="text">
                    <span class="time"><i class="fa-regular fa-clock"></i>  9:00</span>
                    <span class="deg"><i class="fa-solid fa-temperature-three-quarters"></i>  ${temp[105]}&deg;c</span>
                </div>
            </div>
            <div class="day">
                <aside>
                    <img src="assets/weather-icons/${wwo[129]}.svg" alt="">
                    <h2>${day6}</h2>
                </aside>
                <div class="text">
                    <span class="time"><i class="fa-regular fa-clock"></i>  9:00</span>
                    <span class="deg"><i class="fa-solid fa-temperature-three-quarters"></i>  ${temp[129]}&deg;c</span>
                </div>
            </div>

            <div class="day last">
                <aside>
                    <img src="assets/weather-icons/${wwo[153]}.svg" alt="">
                    <h2>${day7}</h2>
                </aside>
                <div class="text">
                    <span class="time"><i class="fa-regular fa-clock"></i>  9:00</span>
                    <span class="deg"><i class="fa-solid fa-temperature-three-quarters"></i>  ${temp[153]}&deg;c</span>
                </div>
            </div>

    `

    removeLoading()

}

getLocation()

