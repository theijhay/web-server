const express = require('express');
const axios = require('axios');
const app = express();

app.get('/api/hello', async (req, res) => {
  const visitorName = req.query.visitor_name;
  const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  try {
    // Get location from IP
    const locationResponse = await axios.get(`https://ipapi.co/${clientIp}/json/`);
    const location = locationResponse.data.city;

    // Get weather data
    const weatherResponse = await axios.get(`http://api.weatherapi.com/v1/current.json?key=306178e762614bd7a97195659243006&q=${location}`);
    const temperature = weatherResponse.data.current.temp_c;

    res.json({
      client_ip: clientIp,
      location: location,
      greeting: `Hello, ${visitorName}!, the temperature is ${temperature} degrees Celsius in ${location}`
    });
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving data' });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
