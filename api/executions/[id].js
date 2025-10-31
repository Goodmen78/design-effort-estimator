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

    // ADD THIS: Log everything to see what's happening
    console.log("Status:", response.status);
    console.log("Response:", JSON.stringify(data, null, 2));

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET");

    // Return everything including status
    res.status(200).json({
      httpStatus: response.status,
      data: data,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
}
