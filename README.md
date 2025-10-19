# Digital Authentication Service

This is a digital authentication service built with Node.js for Vercel deployment.

## Getting Started

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Set up the database:**
    - Create a `.env` file in the root of the project.
    - Add your Vercel Postgres connection string to the `.env` file:
      ```
      POSTGRES_URL="your-postgres-url-here"
      ```
    - Run the database setup script:
      ```bash
      node scripts/setup-db.js
      ```

3.  **Run the development server:**
    ```bash
    npm start
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## API Usage

### `POST /api/challenge`

Creates a new authentication challenge.

**Returns:**
```json
{
  "challengeId": "...",
  "correctNumber": 2
}
```

### `POST /api/verify`

Verifies an authentication challenge.

**Request Body:**
```json
{
  "challengeId": "...",
  "selectedNumber": 2
}
```

**Returns:**
```json
{
  "success": true
}
```
