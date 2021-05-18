const express = require('express');
const axios = require('axios')
require('dotenv').config()

const router = express.Router();

const BASE_URL = process.env.WEATHER_BASE_URL;
const SECRET_API_KEY = process.env.WEATHER_SECRET;

const getWeather = async (location) => {
    try {
      const response = await axios.get(`${BASE_URL}/weather?q=${location}&appid=${SECRET_API_KEY}`);
  
      const weatherItems = response.data;
  
      console.log(`GET: Here's the list of weather`, weatherItems);
  
      return weatherItems;
    } catch (err) {
      console.error(errors);
      throw err
    }
};

/* GET users listing. */
router.get('/', async (req, res, next) => {
  try{
    console.log(req.query)
    const {location} = req.query;
    const weatherItems = await getWeather(location);
    res.send(weatherItems);
  } catch (err) {
    res.status(400).send('Could not find weather data')
  }
   
});

module.exports = router;
