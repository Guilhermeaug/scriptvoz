export default async function handler(req, res) {
  if (req.query.secret !== process.env.REVALIDATE) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  try {
    await res.revalidate('/evaluation');
    await res.revalidate('/diagnostic');
    await res.revalidate('/therapeutic');
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).send('Error revalidating');
  }
}
