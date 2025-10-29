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
const final = await workflow.invoke("(2 * 3) + 5");
console.log("✅ Final answer:", final);