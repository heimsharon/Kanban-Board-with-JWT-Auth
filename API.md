# Krazy Kanban Board API Documentation

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
