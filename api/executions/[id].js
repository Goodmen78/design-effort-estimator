export default async function handler(req, res) {
  const { id } = req.query;

  // Add CORS headers first
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    const response = await fetch(
      `https://uxlad.app.n8n.cloud/api/v1/executions/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjZGI3ODQ0OS0wODFjLTQ0NWYtYjA5MC02YmRlZDc1MDdiMzAiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwiaWF0IjoxNzYxODQ5MjMyfQ.xByLCfgYxuTE4yeIjHdTVpKWryUAEY8IVmM9p1fUu7s`,
        },
      }
    );

    if (!response.ok) {
      return res.status(response.status).json({
        error: `n8n API returned ${response.status}`,
      });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching execution:", error);
    return res.status(500).json({
      error: "Failed to fetch execution",
      message: error.message,
    });
  }
}
