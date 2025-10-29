import { BaseMessage, SystemMessage } from "@langchain/core/messages";
import { task } from "@langchain/langgraph";
import { modelWithTools } from "./tools";

const callLlm = task({ name: "callLlm" }, async (messages: BaseMessage[]) => {
  return modelWithTools.invoke([
    new SystemMessage(
      "You are a helpful assistant tasked with performing arithmetic on a set of inputs."
    ),
    ...messages,
  ]);
});

export default callLlm;