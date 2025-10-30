import { HumanMessage } from "@langchain/core/messages";
import { entrypoint, task } from "@langchain/langgraph";
import "dotenv/config";
import agent from "./agent"; // your math agent with add/multiply/divide tools

// Task 1: Ask the LLM to plan the calculation
const planCalculation = task("planCalculation", async (expression: string) => {
  const messages = await agent.invoke([
    new HumanMessage(
      `Solve the following mathematical expression step by step using your tools: ${expression}`
    ),
  ]);

  // agent.invoke returns an array of messages, so get the final one
  const last = messages[messages.length - 1];
  return (last.content as string) ?? "";
});

// Task 2: Evaluate the result numerically
const evaluateExpression = task("evaluateExpression", async (expression: string) => {
  const messages = await agent.invoke([
    new HumanMessage(`Calculate the numeric result of: ${expression}`),
  ]);
  const last = messages[messages.length - 1];
  return (last.content as string) ?? "";
});

// Workflow
const workflow = entrypoint("mathWorkflow", async (expression: string) => {
  const plan = await planCalculation(expression);
  console.log("🔹 Plan:", plan);

  const result = await evaluateExpression(expression);
  console.log("🔹 Result:", result);

  return result;
});

// Run
const stream = await workflow.stream("(2 * 3) + 5", { streamMode: "updates" });

// Log everything that LangGraph emits step-by-step
for await (const step of stream) {
  console.log("\n🧭 --- Workflow update ---");
  console.log(JSON.stringify(step, null, 2));

  // Optional: extract each task name and result cleanly
  for (const [taskName, output] of Object.entries(step ?? {})) {
    console.log(`🧩 Step: ${taskName}`);

    if (typeof output === "string") {
      console.log("Output:", output);
    } else if (output && typeof output === "object") {
      console.log("Output (object):", JSON.stringify(output, null, 2));
    } else {
      console.log("Output: [unknown type]");
    }
  }
}