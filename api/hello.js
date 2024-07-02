const axios = require('axios');

module.exports = async (req, res) => {
  const visitorName = req.query.visitor_name;
  const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  try {
    const locationResponse = await axios.get(`http://ip-api.com/json/${clientIp}`);
    const locationData = locationResponse.data;

    const weatherResponse = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${locationData.lat}&longitude=${locationData.lon}&current_weather=true`);
    const weatherData = weatherResponse.data.current_weather;

    res.json({
      client_ip: clientIp,
      location: locationData.city,
      greeting: `Hello, ${visitorName}!, the temperature is ${weatherData.temperature} degrees Celsius in ${locationData.city}`
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data' });
  }
};
