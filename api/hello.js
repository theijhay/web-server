export default function handler(req, res) {
    const { visitor_name } = req.query;
    res.status(200).json({ greeting: `Hello, ${visitor_name}!` });
  }
  