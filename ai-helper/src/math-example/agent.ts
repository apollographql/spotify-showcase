import { type BaseMessage } from "@langchain/core/messages";
import { addMessages, entrypoint } from "@langchain/langgraph";
import callLlm from "./model_node";
import callTool from "./tool_node";

const agent = entrypoint({ name: "agent" }, async (messages: BaseMessage[]) => {
  let modelResponse = await callLlm(messages);
  let step = 0;

  while (true) {
    step++;
    console.log(`\n🧭 Step ${step}: -----------------------`);

    if (!modelResponse) {
      console.log("⚠️ No model response, stopping.");
      break;
    }

    // Log model response summary
    console.log("Model response:", modelResponse);

    // Check for tool calls
    if (!("tool_calls" in modelResponse) || !modelResponse.tool_calls?.length) {
      console.log("✅ No tool calls detected — finishing workflow.");
      break;
    }

    // Log tool calls
    console.log("🔧 Tool calls detected:");
    modelResponse.tool_calls.forEach((tc: any, i: number) => {
      console.log(`  [${i + 1}] Tool: ${tc.name} Args:`, tc.args);
    });

    // Execute tools
    const toolResults = await Promise.all(
      modelResponse.tool_calls.map((toolCall) => callTool(toolCall))
    );

    console.log("🧩 Tool results:", toolResults);

    // Add messages for next iteration
    messages = addMessages(messages, [modelResponse, ...toolResults]);
    modelResponse = await callLlm(messages);
  }

  console.log("\n✅ Workflow finished after", step, "steps.\n");
  return messages;
});

export default agent;