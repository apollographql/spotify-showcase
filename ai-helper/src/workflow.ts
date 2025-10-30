import { HumanMessage, type BaseMessage } from "@langchain/core/messages";
import { addMessages, entrypoint } from "@langchain/langgraph";
import { callLlm, callTool } from "./agent";

/**
 * Spotify Workflow
 * ----------------
 * Receives a user prompt, handles reasoning loop,
 * executes MCP tools when invoked by the LLM,
 * and returns the final result message.
 */
export const workflow = async (prompt: string) => {
  const messages: BaseMessage[] = [new HumanMessage(prompt)];

  // Define the workflow graph
  const runWorkflow = entrypoint({ name: "spotifyWorkflow" }, async (msgs: BaseMessage[]) => {
    let modelResponse = await callLlm(msgs);
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
        modelResponse.tool_calls.map((toolCall: any) => callTool(toolCall))
      );

      console.log("🧩 Tool results:", toolResults);

      msgs = addMessages(msgs, [modelResponse, ...toolResults]);
      modelResponse = await callLlm(msgs);
    }

    console.log(`\n✅ Finished after ${step} step(s).\n`);
    return msgs;
  });

  // 🧠 invoke the LangGraph entrypoint
  const result = await runWorkflow.invoke(messages);

  const finalMessage = result[result.length - 1];
  return finalMessage?.content ?? "No response generated.";
};