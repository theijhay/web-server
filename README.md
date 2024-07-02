# Web Server API Project

This project sets up a basic web server using Node.js and deploys it to Vercel. The server exposes a single API endpoint that returns mock data about the client's IP, location, and a personalized greeting with temperature.

## Project Structure
```
web-server/
├── index.js
└── vercel.json
├── api
│ └── hello.js
├── package.json
└── vercel.json
```

- `index.js`: Contains the Web Server API Project implementation.
- `api/hello.js`: Contains the logic for the API endpoint.
- `package.json`: Lists the project dependencies.
- `vercel.json`: Configuration file for deploying to Vercel.

## API Endpoint

### [GET] /api/hello

**Query Parameters:**

- `visitor_name` (string): The name of the visitor to be included in the greeting.

**Response:**

```json
{
  "client_ip": "102.89.47.244",
  "location": "Lagos",
  "greeting": "Hello, Mark!, the temperature is 27.1 degrees Celsius in Lagos"
}
```

## Getting Started

### Prerequisites

- Node.js
- Vercel CLI

## Installation

1. Clone the repository:

```
git clone <repository-url>
cd web-server

```

2. Install the dependencies:

```
npm install
```
## Development

Run the server locally:
```
vercel dev
```

## Deployment

1. Install Vercel CLI if not already installed:

```
npm install -g vercel
vercel login
```

2. Deploy the project:

```
vercel deploy
```

3. Promote to production:

```
vercel --prod
```

## Configuration Files

`vercel.json`
```
{
  "version": 2,
  "builds": [
    {
      "src": "api/hello.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/hello",
      "dest": "/api/hello.js"
    }
  ]
}

```

`api/hello.js`
```
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

```

`package.json`
```
{
  "name": "web-server",
  "version": "1.0.0",
  "main": "index.js",
  "dependencies": {
    "axios": "^0.21.1"
  }
}

```

## Testing the API

After deployment, you can test the API by visiting:
```
https://<your-vercel-app>.vercel.app/api/hello?visitor_name=Mark
```

- By Dev Isaac.
