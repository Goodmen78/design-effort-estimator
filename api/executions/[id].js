export default async function handler(req, res) {
  // ✅ CORS headers
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-N8N-API-KEY"
  );

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ error: "Missing execution ID" });
  }

  try {
    const response = await fetch(
      `https://uxlad.app.n8n.cloud/api/v1/executions/${id}?includeData=true`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.N8N_API_KEY}`,
          "X-N8N-API-KEY": process.env.N8N_API_KEY,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`n8n API returned ${response.status}`);
    }

    // ✅ await the JSON response
    const data = await response.json();

    return res.status(200).json(data);
  } catch (error) {
    console.error("Serverless function error:", error);

    return res.status(500).json({
      error: "Failed to fetch execution",
      message: error.message,
    });
  }
}
