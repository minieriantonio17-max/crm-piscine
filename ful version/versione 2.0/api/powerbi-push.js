export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const PBI_URL = process.env.PBI_PUSH_URL;
  if (!PBI_URL) return res.status(500).json({ error: 'Missing PBI_PUSH_URL env var' });
  try {
    const r = await fetch(PBI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });
    const text = await r.text();
    if (!r.ok) return res.status(r.status).send(text);
    return res.status(200).send(text);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}