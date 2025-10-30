// Step 1: Define tools and model

import { tool } from "@langchain/core/tools";
import * as z from "zod";
//import { getAccessToken } from "../auth";
import { getMcpClient } from "./client";
import model from "./model";

// --- Tool that calls MCP ---
const searchTrack = tool(
  async ({ query, limit }) => {
    const finalLimit = limit ?? 10; // default fallback
     console.log(`🎧 Searching for tracks: "${query}" (limit=${finalLimit})`);

    const result = await getMcpClient().callTool({
      name: "Track",
      arguments: { 
        q: query,
        limit: finalLimit,
        type: ["TRACK"] }
    });
    return JSON.stringify(result);
  },
  {
    name: "search_spotify_track",
    description: "Searches for Spotify tracks matching a given user query.",
    schema: z.object({
      query: z.string().describe("A search query to find music on Spotify."),
      limit: z.number().optional().describe("Max number of tracks to return (default 10).")
    }),
  }
);

// --- Augment the LLM with this tool ---
const toolsByName = { [searchTrack.name]: searchTrack };
const tools = Object.values(toolsByName);
const modelWithTools = model.bindTools(tools);

export { modelWithTools, toolsByName };
