import bodyParser from "body-parser";
import express from "express";
import { generatePlaylistWorkflow } from "./api_workflows";
import { createMcpClient } from "./client";

const app = express();
app.use(bodyParser.json());

app.post("/api/suggest-playlist", async (req, res) => {
  const { query } = req.body;
  const token = req.headers.authorization as string;

  if (!token) {
    return res.status(401).json({ error: "Missing Spotify Auth Token" });
  }

  try {
    console.log("🧠 Running workflow for query:", query);
    
    // Create a new MCP client for this request
    await createMcpClient(token as string);

    // Pass the token dynamically into the workflow
    const result = await generatePlaylistWorkflow.invoke(query);

    res.json({ result });
  } catch (err) {
    console.error("❌ Error running workflow:", err);
    res.status(500).json({ error: "Workflow execution failed." });
  }
});

app.post("/api/confirm-playlist", async (req, res) => {

});

const port = process.env.PORT || 4005;
app.listen(port, () => {
  console.log(`🚀 AI Helper API running on http://localhost:${port}`);
});