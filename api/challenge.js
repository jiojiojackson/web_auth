import { sql } from '@vercel/postgres';
import { v4 as uuidv4 } from 'uuid';

function generateRandomNumbers() {
  const numbers = new Set();
  while (numbers.size < 3) {
    numbers.add(Math.floor(Math.random() * 10));
  }
  return Array.from(numbers);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const numbers = generateRandomNumbers();
    const correctNumber = numbers[Math.floor(Math.random() * numbers.length)];
    const challengeId = uuidv4();

    await sql`
      CREATE TABLE IF NOT EXISTS challenges (
        id TEXT PRIMARY KEY,
        numbers INTEGER[],
        correct_number INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await sql`
      INSERT INTO challenges (id, numbers, correct_number)
      VALUES (${challengeId}, ${numbers}, ${correctNumber});
    `;

    res.status(200).json({ challengeId, numbers, correctNumber });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
