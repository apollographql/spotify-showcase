// src/ai-helper/tests/workflowTest.ts
import "dotenv/config";
import { workflow } from "../workflow.js";
async function main() {
    try {
        console.log("🚀 Running Spotify Workflow test...\n");
        // Example prompt for the agent to handle
        const prompt = "Find some upbeat rock songs that are great for a morning workout.";
        console.log("🎧 Prompt:", prompt);
        // Run the workflow
        const result = await workflow(prompt);
        console.log("\n✅ Final Result:\n");
        console.log(result);
    }
    catch (err) {
        console.error("\n❌ Error running workflow test:");
        console.error(err);
    }
}
main();
