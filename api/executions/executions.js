// api/executions.js
export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "Missing execution ID" });
  }

  try {
    const n8nResponse = await fetch(
      `https://uxlad.app.n8n.cloud/api/v1/executions/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjZGI3ODQ0OS0wODFjLTQ0NWYtYjA5MC02YmRlZDc1MDdiMzAiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwiaWF0IjoxNzYxODQ5MjMyfQ.xByLCfgYxuTE4yeIjHdTVpKWryUAEY8IVmM9p1fUu7s",
        },
      }
    );

    if (!n8nResponse.ok) {
      return res.status(n8nResponse.status).json({
        error: `n8n API error: ${n8nResponse.status}`,
      });
    }

    const data = await n8nResponse.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      error: "Failed to fetch execution",
      message: error.message,
    });
  }
}
