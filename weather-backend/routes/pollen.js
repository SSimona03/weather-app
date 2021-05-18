const express = require('express');
const axios = require('axios')
require('dotenv').config()

const router = express.Router();

const BASE_URL = process.env.POLLEN_BASE_URL;
const SECRET_API_KEY = process.env.POLLEN_SECRET;

const getPollen = async (location) => {
    const options = { headers: { 'x-api-key': SECRET_API_KEY, 'Content-type': 'application/json'}};
    
    try {
        const response = await axios.get(`${BASE_URL}/pollen/by-place?place=${location}`, options);
        /*const response = {};
        response.data =
        {
   "message":"success",
   "lat":51.4828358,
   "lng":-0.3882062,
   "data":[
      {
         "Count":{
            "grass_pollen":37,
            "tree_pollen":175,
            "weed_pollen":19
         },
         "Risk":{
            "grass_pollen":"Moderate",
            "tree_pollen":"Moderate",
            "weed_pollen":"Low"
         },
         "Species":{
            "Grass":{
               "Grass / Poaceae":37
            },
            "Others":0,
            "Tree":{
               "Alder":0,
               "Birch":38,
               "Cypress":0,
               "Elm":0,
               "Hazel":0,
               "Oak":61,
               "Pine":57,
               "Plane":19,
               "Poplar / Cottonwood":0
            },
            "Weed":{
               "Chenopod":0,
               "Mugwort":0,
               "Nettle":19,
               "Ragweed":0
            }
         },
         "updatedAt":"2021-05-18T21:18:41.000Z"
      }
   ]
}
*/

        const pollenItems = response.data.data[0];

        console.log(`GET: Here's the list of pollen data`, pollenItems);

        return pollenItems;
    } catch (err) {
        console.error(errors);
        throw err
    }
};

/* GET users listing. */
router.get('/', async (req, res, next) => {
    try {
        console.log(req.query)
        const { location } = req.query;
        const pollenItems = await getPollen(location);
        res.send(pollenItems);
    } catch (err) {
        res.status(400).send('Could not find weather data')
    }

});

module.exports = router;



