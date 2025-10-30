import { HumanMessage, type BaseMessage } from "@langchain/core/messages";
import { addMessages, entrypoint } from "@langchain/langgraph";
import { callLlm, callTool } from "./agent.js";
import type { SuggestedSong } from "./types.js";

const generatePlaylistWorkflow = entrypoint(
  { name: "generatePlaylist" },
  async (input: string | BaseMessage[]): Promise<SuggestedSong[]> => {
    // 🔄 Normalize: convert string → HumanMessage[]
    let msgs: BaseMessage[] = typeof input === "string"
      ? [new HumanMessage(input)]
      : input;

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

      // 🔁 Feed everything back into context
      msgs = addMessages(msgs, [modelResponse, ...toolResults]);
      modelResponse = await callLlm(msgs);
    }

    console.log(`\n✅ Finished after ${step} step(s).\n`);

    // 🧠 Ask model to format the result
    const formatPrompt = `
Format the final output as a valid JSON array of objects.
Each object must include:
- id: string (Spotify track ID, or empty if unknown)
- name: string
- artist: string
Return ONLY valid JSON, no commentary.
`;
    const formatted = await callLlm([...msgs, new HumanMessage(formatPrompt)]);

    let parsed: SuggestedSong[] = [];
    try {
      const text =
        typeof formatted.content === "string"
          ? formatted.content
          : JSON.stringify(formatted.content);
      parsed = JSON.parse(text);
    } catch (e) {
      console.warn("⚠️ Failed to parse model JSON output:", e);
    }

    return parsed;
  }
);

export { generatePlaylistWorkflow };
