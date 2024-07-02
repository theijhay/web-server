const axios = require('axios');

module.exports = async (req, res) => {
  const visitorName = req.query.visitor_name;

  // Retrieve the client's IP address
  const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  // Mock data for demonstration purposes
  const location = 'New York';
  const temperature = 11; // Celsius

  res.json({
    client_ip: clientIp,
    location: location,
    greeting: `Hello, ${visitorName}!, the temperature is ${temperature} degrees Celsius in ${location}`
  });
};
