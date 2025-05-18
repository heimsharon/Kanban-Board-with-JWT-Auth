# Krazy Kanban Board

_A full-stack Kanban board app with secure JWT authentication, user assignment, and sortable/filterable tickets._

![MIT License](https://img.shields.io/badge/license-MIT-green)
![Render Deploy](https://img.shields.io/badge/Deployed-Render-blue)
![Node.js](https://img.shields.io/badge/Node.js-18%2B-brightgreen)
![React](https://img.shields.io/badge/React-18+-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue)
![Student Project](https://img.shields.io/badge/student_project-s_heim-yellow)

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
  - [Screenshots](#screenshots)
    - [Kanban Board](#kanban-board)
  - [Technologies Used](#technologies-used)
  - [Prerequisites](#prerequisites)
  - [Quick Start](#quick-start)
  - [Installation](#installation)
  - [API Documentation](#api-documentation)
  - [Usage](#usage)
  - [License](#license)
  - [Notes](#notes)
  - [Contributing, Support, and FAQ](#contributing-support-and-faq)
  - [Acknowledgments](#acknowledgments)
  - [Author](#author)

---

## Description

**Krazy Kanban Board** is a full-stack application that allows users to manage tasks using a Kanban board interface.
It features secure authentication with JSON Web Tokens (JWT), user-based ticket assignment, and the ability to sort and filter tickets.
The app is built with a TypeScript/React frontend and an Express/Sequelize/PostgreSQL backend.

---

## Features

- Secure login and logout with JWT authentication
- Kanban board with columns for Todo, In Progress, and Done
- Create, edit, and delete tickets
- Assign tickets to users
- Sort tickets by created date, last updated, or ticket name
- Filter tickets by assigned user or unassigned
- Timestamps for ticket creation and last update
- Responsive design for desktop and mobile

---

## Screenshots

### Kanban Board

![Kanban Board Screenshot](./client/src/assets/kanban-board.jpg)

---

## Technologies Used

**Frontend:**

- [React](https://reactjs.org/)
- [React Router](https://reactrouter.com/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)

**Backend:**

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [Sequelize](https://sequelize.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js)
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
- [dotenv](https://github.com/motdotla/dotenv)

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [PostgreSQL](https://www.postgresql.org/) (local or cloud, e.g. Render)
- A GitHub account (for cloning and contributing)

---

## Quick Start

You can get the code by either cloning this repository using Git, or downloading it as a ZIP file from GitHub (click the green "Code" button, then "Download ZIP").
On GitHub, you can also browse the code, view commit history, open issues, and submit pull requests.

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

    This command will install dependencies for both the `client` and `server` folders at once.
    Alternatively, you can install them separately:

    ```bash
    cd client
    npm install
    cd ../server
    npm install
    ```

3. **Set up environment variables:**

    Create a `.env` file in the `server` directory.
    Use the appropriate values for your environment:

    **For development (local):**

    ```env
    DB_URL=postgres://your_db_user:your_db_password@localhost:5432/your_db_name
    JWT_SECRET_KEY=your_development_secret
    CLIENT_URL=http://localhost:3000
    NODE_ENV=development
    ```

    **For production (deployed):**

    ```env
    DB_URL=postgres://your_prod_user:your_prod_password@your-prod-db-host:5432/your_prod_db
    JWT_SECRET_KEY=your_production_secret
    CLIENT_URL=https://your-production-site.com
    NODE_ENV=production
    ```

    > **Note:** Never commit your real `.env` file to version control. Only commit `.env.example` with placeholder values.

4. **Build the project:**

    - **For development:**
      You typically do not need to build the project; use the dev servers instead.

        - Start the backend and frontend in development mode (see step 6).

    - **For production:**
      Build the frontend for production and ensure the backend is ready to serve static files.

        ```bash
        cd client
        npm run build
        cd ../server
        npm run build
        ```

5. **Seed the database (optional for local dev):**

    ```bash
    cd server
    npm run seed
    ```

6. **Start the server(s):**

    - **For development:**
      Start both the backend and frontend dev servers:

        ```bash
        # In one terminal (backend)
        cd server
        npm run dev

        # In another terminal (frontend)
        cd client
        npm run dev
        ```

        - The frontend will run at [http://localhost:3000](http://localhost:3000)
        - The backend will run at [http://localhost:3001](http://localhost:3001)

    - **For production:**
      Start only the backend server (it will serve the built frontend):

        ```bash
        cd server
        npm start
        ```

        - The app will be available at your production URL (e.g., `https://your-production-site.com`)

7. **Open your browser:**

    - **For development:**
      Visit [http://localhost:3000](http://localhost:3000)

    - **For production:**
      Visit your deployed site URL (e.g., `https://your-production-site.com`)

---

## API Documentation

See [API.md](./API.md) for a full list of available endpoints and usage examples.

---

## Usage

1. **Login:**
   Use a seeded user (e.g., `JollyGuru` / `password`) to log in.

2. **Create a Ticket:**
   Click "New Ticket," fill in the details, and assign a user if desired.

3. **Edit or Delete Tickets:**
   Click the edit or delete icon on any ticket.

4. **Sort and Filter:**
   Use the dropdown menus to sort or filter tickets.

5. **Logout:**
   Click the logout button to end your session.

---

## License

This project is licensed under the [MIT License](./LICENSE.txt).

You are free to use, modify, and distribute this software for personal or commercial purposes, provided you include the original copyright
and license notice in any copies or substantial portions of the software.

See the [MIT License text](https://opensource.org/licenses/MIT) for full details.

---

## Notes

- The codebase is heavily commented for educational purposes and future reference.
- The GitHub repository allows you to download, fork, or contribute to the project as needed.

---

## Contributing, Support, and FAQ

- **Contributions:** Pull requests are welcome! Please open an issue or submit a pull request for improvements or bug fixes.
- **Support:** If you encounter any issues or have suggestions, please open an issue on GitHub.
- **FAQ:**
  - _How do I run the program?_
        See the [Installation](#installation) and [Usage](#usage) sections above.
  - _Can I use this for my own project?_
        Yes, this project is MIT licensed. See the [License](#license) section.
  - _I'm having trouble connecting to the database or running the app!_
    - Double-check your `.env` file values, especially `DB_URL` and `JWT_SECRET_KEY`.
    - Make sure PostgreSQL is running and accessible.
    - Try running `npm install` in both `client` and `server` if you see missing module errors.
    - If you need to reset the database, you can re-run the seed command:

         ```bash
            cd server
            npm run seed
        ```

---

## Acknowledgments

Portions of this project were developed using starter code provided by [edX Boot Camps LLC](https://bootcamp.edx.org/) for educational purposes.

---

## Author

Created by Sharon Heim.
For questions or suggestions, please visit my [GitHub profile](https://github.com/heimsharon).

---

© 2025 Krazy Kanban Board Project
