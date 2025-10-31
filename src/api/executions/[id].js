// api/executions/[id].js
export default async function handler(req, res) {
  const { id } = req.query;

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

    const data = await response.json();

    // Enable CORS for your frontend
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET");
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch execution status" });
  }
}
