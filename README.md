# Flight Booking Microservice

A Node.js microservice for managing flight bookings, built with Express, Sequelize, and MySQL. This service handles booking creation, payment processing, and seat management, and is designed to be integrated with a larger flight management system.

---

## Table of Contents

- [Flight Booking Microservice](#flight-booking-microservice)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Project Structure](#project-structure)
  - [Setup Instructions](#setup-instructions)
  - [Database Setup \& Relations](#database-setup--relations)
  - [API Endpoints](#api-endpoints)
  - [Environment Variables](#environment-variables)
  - [Logging](#logging)
  - [Cron Jobs](#cron-jobs)
  - [Contributing](#contributing)
  - [License](#license)

---

## Features

- Create and manage flight bookings
- Payment processing with idempotency
- Automatic cancellation of expired bookings
- RESTful API endpoints
- Structured logging with Winston
- Sequelize ORM for database operations

---

## Project Structure

```
src/
  config/         # Configuration files (env, logger, server)
  controllers/    # API controllers
  middlewares/    # Express middlewares
  migrations/     # Sequelize migrations
  models/         # Sequelize models
  repositories/   # Data access layer
  routes/         # API route definitions
  seeders/        # Database seeders
  services/       # Business logic
  utils/          # Helpers, error classes, enums, cron jobs
logs/             # Application logs
.env              # Environment variables
```

---

## Setup Instructions

1. **Clone the Repository**
   ```sh
   git clone <your-repo-url>
   cd FlightBookingMicroService
   ```

2. **Install Dependencies**
   ```sh
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory:
   ```
   PORT=4000
   FLIGHT_SERVICE="http://localhost:3000"
   ```

4. **Database Setup**
   - Ensure you have MySQL installed and running.
   - Create a database named `Flights` (or update `src/config/config.json` for your DB name).
   - Update `src/config/config.json` with your MySQL credentials.

5. **Run Migrations**
   ```sh
   npx sequelize-cli db:migrate
   ```

6. **(Optional) Seed the Database**
   ```sh
   npx sequelize-cli db:seed:all
   ```

7. **Start the Server**
   ```sh
   npm run dev
   ```
   The server will run at `http://localhost:4000` (or your configured port).

---

## Database Setup & Relations

- **Model:** `Booking` ([src/models/booking.js](src/models/booking.js))
  - Fields: `flightId`, `userId`, `status`, `noOfSeats`, `totalCost`, `createdAt`, `updatedAt`
  - Status values: `booked`, `cancelled`, `initiated`, `pending`
  - Each booking is linked to a flight (`flightId`) and a user (`userId`).
  - The migration ([src/migrations/20250803125121-create-booking.js](src/migrations/20250803125121-create-booking.js)) creates the `Bookings` table.

- **Relations:**
  - This service expects a separate Flight service (see `FLIGHT_SERVICE` env variable).
  - Bookings reference flights by `flightId` and users by `userId`.
  - Seat management is handled via API calls to the Flight service.

---

## API Endpoints

- `GET /api/v1/info` — Service health check
- `POST /api/v1/bookings` — Create a booking
- `POST /api/v1/bookings/payments` — Make payment for a booking

See [src/routes/v1/booking-routes.js](src/routes/v1/booking-routes.js) for details.

---

## Environment Variables

- `PORT`: Port for the Express server
- `FLIGHT_SERVICE`: Base URL for the Flight service

---

## Logging

- Logs are written to the terminal and to `logs/combined.log` using Winston ([src/config/logger-config.js](src/config/logger-config.js)).

---

## Cron Jobs

- Automatic cancellation of old bookings runs every 20 minutes ([src/utils/common/cron-jobs.js](src/utils/common/cron-jobs.js)).

---

## Contributing

Feel free to fork, open issues, or submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

---

## License

ISC
