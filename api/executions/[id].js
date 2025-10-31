export default function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET":
      res.status(200).json({ message: `GET request received`, id });
      break;

    case "POST":
      res
        .status(200)
        .json({ message: `POST request received`, body: req.body, id });
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).json({ error: `Method ${method} not allowed` });
  }
}
