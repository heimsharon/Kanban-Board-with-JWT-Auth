# Krazy Kanban Board

A full-stack Kanban board app with secure JWT authentication, user assignment, and sortable/filterable tickets.

![MIT License](https://img.shields.io/badge/license-MIT-green)
![Render Deploy](https://img.shields.io/badge/Deployed-Render-blue)

**Live Demo:** [Krazy Kanban Board on Render](https://kanban-board-with-jwt-auth.onrender.com)

> **Demo Login:**
> Username: `JollyGuru`
> Password: `password`

---

## Table of Contents

- [Krazy Kanban Board](#krazy-kanban-board)
  - [Table of Contents](#table-of-contents)
  - [Description](#description)
  - [Features](#features)
  - [Prerequisites](#prerequisites)
  - [Technologies Used](#technologies-used)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Screenshots](#screenshots)
    - [Kanban Board](#kanban-board)
  - [License](#license)
  - [Contributing](#contributing)

---

## Description

**Krazy Kanban Board** is a full-stack application that allows users to manage tasks using a Kanban board interface.
It features secure authentication with [JSON Web Tokens (JWT)](https://jwt.io/), user-based ticket assignment, and the ability to sort and filter tickets.
The app is built with a TypeScript/React frontend and an [Express](https://expressjs.com/)/[Sequelize](https://sequelize.org/)/[PostgreSQL](https://www.postgresql.org/) backend.

---

## Features

-   Secure login and logout with JWT authentication
-   Kanban board with columns for Todo, In Progress, and Done
-   Create, edit, and delete tickets
-   Assign tickets to users
-   Sort tickets by created date, last updated, or ticket name
-   Filter tickets by assigned user or unassigned
-   Timestamps for ticket creation and last update
-   Responsive design for desktop and mobile

---

## Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or higher)
-   [npm](https://www.npmjs.com/) (comes with Node.js)
-   [PostgreSQL](https://www.postgresql.org/) (local or cloud, e.g. Render)
-   A GitHub account (for cloning and contributing)

---

## Technologies Used

**Frontend:**

-   [React](https://reactjs.org/)
-   [React Router](https://reactrouter.com/)
-   [Vite](https://vitejs.dev/)
-   [TypeScript](https://www.typescriptlang.org/)

**Backend:**

-   [Node.js](https://nodejs.org/)
-   [Express.js](https://expressjs.com/)
-   [Sequelize](https://sequelize.org/)
-   [PostgreSQL](https://www.postgresql.org/)
-   [bcrypt](https://github.com/kelektiv/node.bcrypt.js)
-   [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
-   [dotenv](https://github.com/motdotla/dotenv)

---

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/kanban-board-with-jwt-auth.git
    cd kanban-board-with-jwt-auth
    ```

2. **Install dependencies for both client and server:**

    ```bash
    npm run install
    ```

3. **Set up environment variables:**
   Create a `.env` file in the `server` directory with:

    ```env
    DB_URL=<your-postgres-connection-string>
    JWT_SECRET_KEY=<your-secret-key>
    ```

4. **Build the project:**

    ```bash
    npm run build
    ```

5. **Seed the database (optional for local dev):**

    ```bash
    npm run seed
    ```

6. **Start the development server:**

    ```bash
    npm run start:dev
    ```

7. **Open your browser:**
    ```
    http://localhost:3000
    ```

---

## Usage

1. **Login:**

    - Use one of the seeded users (e.g., `JollyGuru` / `password`) to log in.

2. **Manage Tickets:**

    - Create, edit, and delete tickets.
    - Assign tickets to users.

3. **Sort and Filter:**

    - Use the dropdowns to sort tickets by date, name, or last updated.
    - Filter tickets by assigned user or show only unassigned tickets.

4. **Logout:**
    - Click the logout button to end your session.

---

## Screenshots

### Kanban Board

![Kanban Board Screenshot](./client/src/assets/kanban-board.jpg)

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---
