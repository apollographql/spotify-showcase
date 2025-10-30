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

    console.log(`\n✅ Finished after ${step} tool call(s).\n`);

    // 🧠 Ask model to format the result
    const formatPrompt = `
      Format the final output as a valid JSON array of objects.
      Return ONLY raw JSON without markdown code fences or commentary.
      Each object must include:
      - id: string (Spotify track ID, or empty if unknown)
      - name: string
      - artist: string
      Use the following format: {
        "result:" [
          { "id": "track_id", "name": "track name", "artist": "artist name" },
          ...
        ]
      }
    `;
    const formatted = await callLlm([...msgs, new HumanMessage(formatPrompt)]);

    console.log("\n🧠 Raw model formatting response:");
    console.log("Type:", typeof formatted.content);
    console.log("Content:", formatted.content);
    console.log("Full object:", JSON.stringify(formatted, null, 2));

    let parsed: SuggestedSong[] = [];
    try {
      let text =
        typeof formatted.content === "string"
          ? formatted.content
          : JSON.stringify(formatted.content);

      // 🧹 remove qualquer bloco de markdown e espaços extras
      text = text.replace(/```[a-z]*|```/gi, "").trim();

      // Tenta encontrar o primeiro array JSON na resposta
      const match = text.match(/\[.*\]/s);
      if (match) {
        parsed = JSON.parse(match[0]);
      } else {
        throw new Error("No JSON array found in model output");
      }
    } catch (e) {
      console.warn("⚠️ Failed to parse model JSON output:", e);
    }

    return parsed;
  }
);

export { generatePlaylistWorkflow };
