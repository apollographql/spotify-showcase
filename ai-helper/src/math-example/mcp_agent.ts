// src/agent_mcp.ts
import { ModelContext } from "@apollo/mcp"; // pacote oficial da Apollo MCP
import { ChatOpenAI } from "@langchain/openai";
import "dotenv/config";

// Initialize the LLM (still OpenAI)
const model = new ChatOpenAI({
  model: "gpt-4o-mini",
  temperature: 0,
});

// Connect the model to your MCP server
// This makes the LLM aware of all GraphQL commands registered in MCP
const mcp = new ModelContext({
  endpoint: process.env.MCP_URL || "http://localhost:8082",
  model,
});

// You can still export a simple invoke wrapper
export const mcpAgent = async (prompt: string) => {
  const response = await mcp.invoke(prompt);
  return response;
};