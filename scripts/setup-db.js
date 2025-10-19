import { sql } from '@vercel/postgres';
import dotenv from 'dotenv';

dotenv.config();

async function setupDatabase() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS challenges (
        id TEXT PRIMARY KEY,
        numbers INTEGER[],
        correct_number INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log('Database table created successfully.');
  } catch (error) {
    console.error('Error setting up the database:', error);
  }
}

setupDatabase();
