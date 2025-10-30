// Step 1: Define tools and model

import { tool } from "@langchain/core/tools";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import * as z from "zod";
import { MCP_ENDPOINT, SPOTIFY_TOKEN } from "./constants";
import model from "./model";

// --- MCP Client Setup ---
const transport = new StreamableHTTPClientTransport(
  new URL(MCP_ENDPOINT),
  {
    requestInit: {
      headers: {
        Authorization:SPOTIFY_TOKEN,
      },
    },
  }
);

const mcpClient = new Client({
  name: "spotify-langgraph-agent",
  version: "1.0.0",
});

await mcpClient.connect(transport);
console.log("✅ Connected to MCP server");

// --- Tool that calls MCP ---
const searchTrack = tool(
  async ({ query }) => {
    console.log(`🎧 Searching for tracks: ${query}`);
    const result = await mcpClient.callTool({
      name: "Track",
      arguments: { q: query, type: ["TRACK"] },
    });
    return JSON.stringify(result);
  },
  {
    name: "search_spotify_track",
    description: "Searches for Spotify tracks matching a given user query.",
    schema: z.object({
      query: z.string().describe("A search query to find music on Spotify."),
    }),
  }
);

// --- Augment the LLM with this tool ---
const toolsByName = { [searchTrack.name]: searchTrack };
const tools = Object.values(toolsByName);
const modelWithTools = model.bindTools(tools);

export { modelWithTools, toolsByName };
