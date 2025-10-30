import bodyParser from "body-parser";
import express from "express";
import { workflow } from "./workflow.js";

const app = express();
app.use(bodyParser.json());

app.post("/api/workflow", async (req, res) => {
  const { query } = req.body;
  //const token = req.headers.authorization;

  //if (!token) {
  //  return res.status(401).json({ error: "Missing Authorization header" });
 // }

  try {
    console.log("🧠 Running workflow for query:", query);

    //token

    // Pass the token dynamically into the workflow
    const result = await workflow(query);

    res.json({ result });
  } catch (err) {
    console.error("❌ Error running workflow:", err);
    res.status(500).json({ error: "Workflow execution failed." });
  }
});

const port = process.env.PORT || 4005;
app.listen(port, () => {
  console.log(`🚀 AI Helper API running on http://localhost:${port}`);
});