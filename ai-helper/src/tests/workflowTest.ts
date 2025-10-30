// src/ai-helper/tests/workflowTest.ts
import "dotenv/config";
import { generatePlaylistWorkflow } from "../api_workflows.js";

async function main() {
  try {
    console.log("🚀 Running Spotify Workflow test...\n");

    // Example prompt for the agent to handle
    const prompt =
      "Find some upbeat rock songs that are great for a morning workout.";

    console.log("🎧 Prompt:", prompt);

    // Run the workflow
    const result = await generatePlaylistWorkflow.invoke(prompt);

    console.log("\n✅ Final Result:\n");
    console.log(result);
  } catch (err) {
    console.error("\n❌ Error running workflow test:");
    console.error(err);
  }
}

main();