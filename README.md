# Omniloq - Backend

This is the backend for **Omniloq**, a secure password manager. The backend is built using **Express**, **Prisma**, and **PostgreSQL**, with password encryption handled by **CryptoJS**.

## Features

- **Express** for handling HTTP requests.
- **Prisma** ORM for interacting with the PostgreSQL database.
- **PostgreSQL** for secure and reliable data storage.
- **CryptoJS** for encrypting and decrypting passwords.

## Technologies Used

- Node.js
- Express
- Prisma
- PostgreSQL
- CryptoJS

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/omniloq-backend.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up your environment variables:

   ```bash
   DATABASE_URL="postgresql://username:password@host:port/database"
   ```

4. Migrate your database schema:

   ```bash
   npx prisma migrate dev
   ```

5. Start the server:

   ```bash
   npm start
   ```
