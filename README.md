# Express MVC Boilerplate

This is a Node.js, Express, and MongoDB-based MVC boilerplate application, serve as a flexible starting point for building complex microservices. The project is structured with scalability and maintainability in mind, making it an excellent foundation for new applications or a showcase of best practices in building microservices.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Notes](#notes)

## Features

- **Modular Structure:** Organized into controllers, models, services, and routes for clean and maintainable code.
- **Authentication:** JWT-based authentication with Passport.js integration.
- **Event Handling:** Centralized event handling using custom event emitters.
- **Email Notifications:** Sends email notifications using NodeMailer for events like user sign-up.
- **Rate Limiting:** Protects endpoints from abuse using `rate-limiter-flexible`.
- **Validation and Sanitization:** Uses Joi for request validation and sanitization with `express-mongo-sanitize`.
- **Logging:** Centralized logging with Winston.
- **Security:** Includes middleware like Helmet and CORS for enhanced security.
- **Error Handling:** Centralized error handling with custom error classes.
- **Extensible:** Easy to add new features and extend existing ones.

## Project Structure

```plaintext
├── src
│   ├── config          # Configuration files (environment variables, logger, etc.)
│   ├── controllers     # Route controllers
│   ├── loaders         # Application loaders (Express, Mongoose, etc.)
│   ├── middlewares     # Express middlewares (auth, error handlers, etc.)
│   ├── models          # Mongoose models (database schemas)
│   ├── routes          # Application routes
│   ├── services        # Service layer (business logic)
│   ├── subscribers     # Event subscribers (e.g., handling user signup events)
│   ├── utils           # Utility functions and classes (error handling, email transport, etc.)
│   ├── validations     # Request validation schemas
│   └── server.js       # Main application server
├── .env                # Environment variables
├── .gitignore          # Git ignore rules
├── .prettierignore     # Prettier ignore rules
├── .prettierrc         # Prettier configuration
├── eslint.config.mjs   # ESLint configuration
├── index.js            # Application entry point
├── package.json        # Project dependencies
├── package-lock.json   # Project dependency lock file
├── logs                # Directory for log files
│   └── access.log      # Access log file
└── README.md           # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (v14 or above)
- MongoDB (locally or using a service like MongoDB Atlas)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/babkristof/node-mvc-boilerplate.git
    cd node-mvc-boilerplate
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and configure your environment variables as shown below:

    ```plaintext
        PORT=3000
        DB_CONNECTION=mongodb://localhost:27017/your-database
        JWT_SECRET=your_jwt_secret
        NODE_ENV=development
        JWT_ACCESS_EXPIRATION_MINUTES=30
        JWT_REFRESH_EXPIRATION_DAYS=30
        MAX_ATTEMPTS_PER_DAY=100
        MAX_ATTEMPTS_BY_IP_USERNAME=10
        MAX_ATTEMPTS_PER_EMAIL=5
        EMAIL=your_email@gmail.com
        EMAIL_PASSWORD=your_email_password
    ```

### Running the Application

Start the application using Nodemon:

```bash
npm start
```
### Scripts
```bash
npm start: Runs the application using Nodemon for hot-reloading.
npm lint: Runs ESLint for code quality and linting.
npm lint:fix: Automatically fixes lint issues using ESLint.
npm prettier: Checks code formatting using Prettier.
npm prettier:fix: Formats code using Prettier.
```

### Environment Variables

The environment variables are configured in a `.env` file in the root directory. Some of the critical variables include:

- **`PORT`**: The port on which the server will run.
- **`DB_CONNECTION`**: MongoDB connection string.
- **`JWT_SECRET`**: Secret key for signing JWT tokens.
- **`NODE_ENV`**: Environment in which the app is running (development, production).
- **`EMAIL`**: Email address for sending notifications.
- **`EMAIL_PASSWORD`**: Password for the email account.

### Notes

- **Event Handling**: The application uses custom events (like user sign-up) handled by subscribers in the `subscribers` directory.
- **Logging**: Log files are stored in the `logs` directory. Ensure appropriate permissions for this directory.
- **Email Notifications**: Configured to use Gmail for sending notifications. Update `EMAIL` and `EMAIL_PASSWORD` in the `.env` file as needed.
