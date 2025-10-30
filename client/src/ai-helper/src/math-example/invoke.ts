import { HumanMessage } from "@langchain/core/messages";
import agent from "./agent";

const result = await agent.invoke([new HumanMessage("Add 3 and 4.")]);

for (const message of result) {
  console.log(`[${message.type}]: ${message.text}`);
}