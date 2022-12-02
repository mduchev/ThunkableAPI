# ThunkableAPI

## Overview
This solution presents a Node.js server for Thunkable services exercise.
A MongoDB database is being used for persistent storage.

The app consists of 3 microservices - main, longer, estimation.
The only entry point is the main service. As soon as it has an authenticated request, we communicate via sockets to the estimation service. The estimation service provides us with an estimation immediately and depending on the response we either return it, or pass it via RabbitMQ to the longer service. MAIN to ESTIMATION communicate via sockets, since we want to have RTC. MAIN to LONGER communicate via message broker, since we want to have fire and forget logic there.

The important secrets & constants have been moved to .env(.dev) files, which have been included for easier run.
Since we want to have some sort of Authentication, the auth.js middleware takes care of that via JWT auth.
We also have authentication for the socket communication.

## Steps to build & run the express server via npm:
PREREQUISITES - RabbitMQ server & MongoDB instance
1. Install the dependencies
```
npm install
```

2. Start the server
For debug:
```
npm run dev
```
For prod:
```
npm run prod
```

## Steps to build & run via docker-compose:
1. Build the image & run the container via 
```
docker-compose up -d
```

## Additional files
A PostMan collection has been added for easier testing. It uses environment variables, so after you import the collection, create a local environment and create a new secret with key "token".

## Future improvements
- Authentication for RabbitMQ can be added
- Unit & integration tests using either Jest, Mocha, or Jasmine.
- Services monitoring. A widely adopted solution is to use Prometheus + Grafana, both of which are available as Docker images. The 4 most common things to watch for our services are:
  - Error Rate: Because errors are user facing and immediately affect the customers.
  - Response time: Because the latency directly affects the customers and business.
  - Throughput: The traffic helps to understand the context of increased error rates and the latency too.
  - Saturation: It tells how “full” the service is (e.g. CPU is under high load)