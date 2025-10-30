// Step 1: Define tools and model

import { tool } from "@langchain/core/tools";
import * as z from "zod";
//import { getAccessToken } from "../auth";
import { getMcpClient } from "./client";
import model from "./model";

// --- Tool that calls MCP ---
const searchTrack = tool(
  async ({ query }) => {
    console.log(`🎧 Searching for tracks: ${query}`);
    const result = await getMcpClient().callTool({
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
