import { ChatOpenAI } from "@langchain/openai";

// --- LLM Model ---
const model = new ChatOpenAI({
  model: "gpt-4o-mini",
  temperature: 0,
});

export default model;