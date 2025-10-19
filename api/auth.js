import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  const { challengeId } = req.query;

  if (!challengeId) {
    return res.status(400).send('Missing challengeId');
  }

  try {
    const { rows } = await sql`
      SELECT numbers FROM challenges WHERE id = ${challengeId};
    `;

    if (rows.length === 0) {
      return res.status(404).send('Challenge not found.');
    }

    const numbers = rows[0].numbers;
    const buttons = numbers.map(number =>
      `<button class="number-button" data-number="${number}">${number}</button>`
    ).join('');

    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Authentication</title>
        <style>
          body { font-family: sans-serif; display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh; }
          .numbers { display: flex; gap: 20px; }
          .number-button { font-size: 3rem; padding: 20px; cursor: pointer; }
          .message { margin-top: 20px; font-size: 1.5rem; }
        </style>
      </head>
      <body>
        <div class="numbers">${buttons}</div>
        <div class="message"></div>
        <script>
          const challengeId = "${challengeId}";
          document.querySelectorAll('.number-button').forEach(button => {
            button.addEventListener('click', async (event) => {
              const selectedNumber = event.target.dataset.number;
              const response = await fetch('/api/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ challengeId, selectedNumber })
              });
              const { success } = await response.json();
              document.querySelector('.message').textContent = success ? 'Success!' : 'Failure!';
            });
          });
        </script>
      </body>
      </html>
    `;

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}
