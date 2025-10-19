import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { challengeId, selectedNumber } = req.body;

  if (!challengeId || selectedNumber === undefined) {
    return res.status(400).json({ error: 'Missing required parameters.' });
  }

  try {
    const { rows } = await sql`
      SELECT correct_number FROM challenges WHERE id = ${challengeId};
    `;

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Challenge not found.' });
    }

    const correctNumber = rows[0].correct_number;
    const isCorrect = parseInt(selectedNumber) === correctNumber;

    res.status(200).json({ success: isCorrect });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
