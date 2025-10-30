// src/ai-helper/agent.ts
import type { BaseMessage } from "@langchain/core/messages";
import { SystemMessage } from "@langchain/core/messages";
import type { ToolCall } from "@langchain/core/messages/tool";
import { task } from "@langchain/langgraph";
import { modelWithTools, toolsByName } from "./tools";

/**
 * LLM node — model reasoning
 */
export const callLlm = task({ name: "callLlm" }, async (messages: BaseMessage[]) => {
  const systemPrompt =
    `You are a helpful assistant that uses Spotify tools to find, describe, and manage music content for users.
    When searching for tracks, use the "search_spotify_track" tool.
    If the user mentions a specific number of songs (e.g. "5 songs", "top 10 tracks"), 
    include that number as the "limit" argument.
    If no number is mentioned, default to 10.
    Always use the Spotify tools to perform searches — do not make up song names yourself.`;

  const result = await modelWithTools.invoke([
    new SystemMessage(systemPrompt),
    ...messages,
  ]);

  return result;
});

/**
 * Tool node — executes specific tool requested by LLM
 */
export const callTool = task({ name: "callTool" }, async (toolCall: ToolCall) => {
  const tool = toolsByName[toolCall.name];
  if (!tool) throw new Error(`Unknown tool: ${toolCall.name}`);

  console.log(`🔧 Running tool: ${toolCall.name}`);
  return await tool.invoke(toolCall);
});