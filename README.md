# Express SOLA Boilerplate

This is a robust Node.js, Express, and MongoDB-based backend boilerplate application, structured as a Service-Oriented Layered Architecture (SOLA). The architecture is designed for scalability, performance, and maintainability, incorporating modern development practices such as event-driven processing and caching. This setup ensures efficient background processing, improved response times, and a decoupled service design that promotes modularity and extensibility.

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

- **Service-Oriented Architecture:** Modular services for handling different business functionalities like user management, blog operations, and background tasks.
- **Layered Design:** Clear separation of concerns across layers—Controllers, Services, Models, and Middlewares—ensuring maintainability and scalability.
- **Event-Driven Processing:** Uses `bullmq` with Redis to handle asynchronous background tasks such as image processing and caching, enabling efficient resource utilization and decoupled service execution.
- **Caching for Performance Optimization:** Implements Redis for caching frequently accessed data, significantly improving API response times.
- **Image Upload and Processing: :** Supports image uploads with multer and processes them using sharp for efficient image compression.
- **Authentication & Authorization:** JWT-based authentication with Passport.js integration for secure and scalable user management.
- **Centralized Logging:** Utilizes Winston for detailed and structured logging across all services.
- **Rate Limiting & Security:** Protects endpoints from abuse with `rate-limiter-flexible` and enhances security with Helmet and CORS.
- **Comprehensive Validation & Sanitization:** Uses Joi for request validation and sanitization with `express-mongo-sanitize`.
- **Extensive Error Handling:** Centralized error handling with custom error classes for clear and consistent error management.
- **Extensible:** Easy to add new features and extend existing ones.

## Project Structure

```plaintext
├── src
│   ├── background-tasks   # Background job processing with bullmq and Redis
│   │   ├── index.js       # Initialization of background tasks
│   │   ├── queues         # Queue definitions for tasks
│   │   └── workers        # Workers that process queued jobs
│   ├── config             # Configuration files (environment variables, logger, etc.)
│   ├── controllers        # Route controllers
│   ├── loaders            # Application loaders (Express, Mongoose, etc.)
│   ├── middlewares        # Express middlewares (auth, error handlers, caching, etc.)
│   ├── models             # Mongoose models (database schemas)
│   ├── routes             # Application routes
│   ├── services           # Business logic layer
│   ├── subscribers        # Event subscribers (e.g., user signup events)
│   ├── utils              # Utility functions and classes (error handling, image processing, etc.)
│   ├── validations        # Request validation schemas
│   └── server.js          # Main application server
├── uploads                # Directory for uploaded images
├── .env                   # Environment variables
├── .gitignore             # Git ignore rules
├── .prettierignore        # Prettier ignore rules
├── .prettierrc            # Prettier configuration
├── eslint.config.mjs      # ESLint configuration
├── index.js               # Application entry point
├── package.json           # Project dependencies
├── package-lock.json      # Dependency lock file
└── README.md              # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (v14 or above)
- MongoDB (locally or using a service like MongoDB Atlas)
- Redis (locally or using a managed Redis service)

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
        REDIS_HOST=localhost
        REDIS_PORT=6379
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
- **`REDIS_HOST`**: Host address for the Redis server.
- **`REDIS_PORT`**: Port for the Redis server.

### Notes

- **Service-Oriented Design**: The application is structured to handle distinct business functionalities as separate services, allowing for easy scalability and maintenance.
- **Event-Driven Processing**: Utilizes bullmq for handling background tasks such as image processing and data caching, decoupling these operations from the main request lifecycle and improving performance.
- **Image Processing**: Image uploads are handled using multer, and processed using sharp for compression and resizing.
- **Caching**: Redis is used for caching frequently accessed data, improving performance by reducing database load and speeding up response times.
- **Logging**: Log files are stored in the `logs` directory. Ensure appropriate permissions for this directory.
- **Email Notifications**: Configured to use Gmail for sending notifications. Update `EMAIL` and `EMAIL_PASSWORD` in the `.env` file as needed.
