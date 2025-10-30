import { HumanMessage } from "@langchain/core/messages";
import { workflow } from "../workflow";

const result = await workflow.invoke([
  new HumanMessage("Find chill acoustic guitar tracks to relax."),
]);

for (const msg of result) {
  console.log(`[${msg.getType()}]: ${msg.text}`);
}