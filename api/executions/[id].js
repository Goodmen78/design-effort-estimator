export default async function handler(req, res) {
  const { id } = req.query;

  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    console.log("Fetching execution:", id);

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

    console.log("n8n response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("n8n error:", errorText);
      return res.status(response.status).json({
        error: `n8n API error: ${response.status}`,
        details: errorText,
      });
    }

    const data = await response.json();
    console.log("n8n data:", data);

    return res.status(200).json(data);
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });
  }
}
