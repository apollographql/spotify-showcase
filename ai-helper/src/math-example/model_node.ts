import { BaseMessage, SystemMessage } from "@langchain/core/messages";
import { task } from "@langchain/langgraph";
import { modelWithTools } from "./tools";

const callLlm = task({ name: "callLlm" }, async (messages: BaseMessage[]) => {
  return modelWithTools.invoke([
    new SystemMessage(`
      You are an arithmetic assistant.
      Use the available tools ("add", "multiply", "divide") to solve math expressions.
      Always call tools with JSON arguments: { "a": number, "b": number }.
      Never include text outside JSON.
`),
    ...messages,
  ]);
});

export default callLlm;