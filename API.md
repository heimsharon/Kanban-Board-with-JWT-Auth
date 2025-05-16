# Krazy Kanban Board API Documentation

> **Note:**
> These API endpoints are intended for use in development mode and can be tested using API clients such as [Insomnia](https://insomnia.rest/) or [Postman](https://www.postman.com/).
> Make sure your server is running, your database is seeded with initial data, and you have a valid JWT token for authenticated routes.

## Authentication

### POST /auth/login

-   **Request:**
    `{ "username": "user", "password": "pass" }`
-   **Response:**
    `{ "token": "JWT_TOKEN" }`

## Tickets

### GET /api/tickets

-   Get all tickets (requires JWT)

### POST /api/tickets

-   Create a ticket (requires JWT)

### PUT /api/tickets/:id

-   Update a ticket (requires JWT)

### DELETE /api/tickets/:id

-   Delete a ticket (requires JWT)

## Users

### GET /api/users

-   Get all users (requires JWT)

### GET /api/users/:id

-   Get user by ID (requires JWT)
