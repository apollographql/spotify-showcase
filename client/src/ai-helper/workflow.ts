// src/ai-helper/workflow.ts
import { ToolCall, type BaseMessage } from "@langchain/core/messages";
import { addMessages, entrypoint } from "@langchain/langgraph";
import { callLlm, callTool } from "./agent";

/**
 * Main orchestration loop:
 * - Gets model responses
 * - Detects tool calls
 * - Executes tools
 * - Feeds results back until reasoning finishes
 */
export const workflow = entrypoint({ name: "spotifyWorkflow" }, async (messages: BaseMessage[]) => {
  let modelResponse = await callLlm(messages);
  let step = 0;

  while (true) {
    step++;
    console.log(`\n🧭 Step ${step}: -----------------------`);
    console.log("🧠 Model response:", modelResponse);

    if (!modelResponse.tool_calls?.length) {
      console.log("✅ No tool calls — finishing workflow.");
      break;
    }

    console.log("🔧 Tool calls:");
    modelResponse.tool_calls.forEach((tc: any, i: number) =>
      console.log(`  [${i + 1}] ${tc.name}`, tc.args)
    );

    const toolResults = await Promise.all(
      modelResponse.tool_calls.map((toolCall: ToolCall<string, Record<string, any>>) => callTool(toolCall))
    );

    console.log("🧩 Tool results:", toolResults);
    messages = addMessages(messages, [modelResponse, ...toolResults]);
    modelResponse = await callLlm(messages);
  }

  console.log(`\n✅ Finished after ${step} step(s).\n`);
  return messages;
});