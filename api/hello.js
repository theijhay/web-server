module.exports = async (req, res) => {
  const visitorName = req.query.visitor_name;

  // Mock data
  const clientIp = '127.0.0.1';
  const location = 'New York';
  const temperature = 11; // Celsius

  res.json({
    client_ip: clientIp,
    location: location,
    greeting: `Hello, ${visitorName}!, the temperature is ${temperature} degrees Celsius in ${location}`
  });
};
