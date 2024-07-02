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
  "client_ip": "127.0.0.1",
  "location": "New York",
  "greeting": "Hello, Mark!, the temperature is 11 degrees Celsius in New York"
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
