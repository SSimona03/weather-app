// function getClock() {
const getClock = () => {
    var d=new Date();
    var nmonth=d.getMonth(),ndate=d.getDate(),nyear=d.getFullYear();
    var nhour=d.getHours(),nmin=d.getMinutes(),ap;
    if(nhour==0){ap=" AM";nhour=12;}
    else if(nhour<12){ap=" AM";}
    else if(nhour==12){ap=" PM";}
    else if(nhour>12){ap=" PM";nhour-=12;}
    
    if(nmin<=9) nmin="0"+nmin;
    
    var clocktext=""+ndate+"/"+(nmonth+1)+"/"+nyear+" "+nhour+":"+nmin+ap+"";
    document.getElementById('clockbox').innerHTML=clocktext;
}


const BASE_URL = 'http://localhost:3000';

const getWeather = async (location) => {
    try {
      const response = await axios.get(`${BASE_URL}/weather?location=${location}`);
      /*const response = {};

      response.data = { "coord":{"lon":2.3488,"lat":48.8534},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"base":"stations","main":{"temp":291.81,"feels_like":291.38,"temp_min":291.15,"temp_max":297.15,"pressure":1000,"humidity":63},"visibility":10000,"wind":{"speed":3.6,"deg":200},"clouds":{"all":0},"dt":1620587554,"sys":{"type":1,"id":6550,"country":"FR","sunrise":1620533834,"sunset":1620587813},"timezone":7200,"id":2988507,"name":"Paris","cod":200}
      */

      const weatherItems = response.data;
  
      console.log(`GET: Here's the list of weather`, weatherItems);
  
      return weatherItems;
    } catch (err) {
      console.error(err);
      throw err
    }
};

const getPollen = async (location) => {
  try {
    const response = await axios.get(`${BASE_URL}/pollen?location=${location}`);
  
    const pollenItems = response.data;

    console.log(`GET: Here's the list of pollen`, pollenItems);

    return pollenItems;
  } catch (err) {
    console.error(err);
    throw err
  }
};

const changeWeatherDetails = (weatherData) => {
  const degreeElement = document.getElementById('degreeText')
  degreeElement.innerHTML = Math.round(weatherData.main.temp - 273.15) + "°";

  const degreeMinElement = document.getElementById('minTemp');
  degreeMinElement.innerHTML = Math.round(weatherData.main.temp_min - 273.15) + "°";


  const degreeMaxElement = document.getElementById('maxTemp');
  degreeMaxElement.innerHTML = Math.round(weatherData.main.temp_max - 273.15) + "°";


  const cityElement = document.getElementById('city');
  cityElement.innerHTML = weatherData.name;


  const descriptionElement = document.getElementById('description');
  descriptionElement.innerHTML = weatherData.weather[0].description;


  const pressureElement = document.getElementById('press');
  pressureElement.innerHTML = weatherData.main.pressure;
}

const removePollenStatusClasses = (element) => {
  element.classList.remove("moderate");
  element.classList.remove("high");
  element.classList.remove("low");
}

const changePollenData = (pollenData) => {
  const treeElement = document.getElementById('treePollenStatus');
  treeElement.innerHTML = pollenData.Risk.tree_pollen;
  removePollenStatusClasses(treeElement);
  treeElement.classList.add(pollenData.Risk.tree_pollen.toLowerCase());

  const grassElement = document.getElementById('grassPollenStatus');
  grassElement.innerHTML = pollenData.Risk.grass_pollen;
  removePollenStatusClasses(grassElement);
  grassElement.classList.add(pollenData.Risk.grass_pollen.toLowerCase());

  const weedElement = document.getElementById('weedPollenStatus');
  weedElement.innerHTML = pollenData.Risk.weed_pollen;
  removePollenStatusClasses(weedElement);
  weedElement.classList.add(pollenData.Risk.weed_pollen.toLowerCase());
}

window.onload = async (event) => {            
    getClock();
    
    setInterval(getClock,1000);

    const citySearchElement = document.getElementById("addCity");

    citySearchElement.addEventListener('change', async (event) => {

      try{
        const cityName = event.target.value;
        
        const weatherData = await getWeather(cityName);
        changeWeatherDetails(weatherData);
        
        const pollenData = await getPollen(cityName);
        changePollenData(pollenData);


        console.log(` ${event.target.value}`);

      } catch (err) {
        console.log(err)
        alert('Could not retrieve weather data')
      }
    });
};
