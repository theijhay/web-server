const express = require('express');
const app = express();

// Define the endpoint handler
app.get('/api/hello', (req, res) => {
    const visitorName = req.query.visitor_name || 'Guest';
    const clientIp = req.ip; // Gets the IP address of the requester
    const location = 'New York'; // For simplicity, assume requester's location

    // Simulate fetching temperature (can be extended with real API)
    const temperature = 11;

    // Construct the response object
    const response = {
        client_ip: clientIp,
        location: location,
        greeting: `Hello, ${visitorName}!, the temperature is ${temperature} degrees Celsius in ${location}`
    };

    // Send JSON response
    res.json(response);
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
