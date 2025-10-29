import type { ToolCall } from "@langchain/core/messages/tool";
import { task } from "@langchain/langgraph";
import { toolsByName } from "./tools";

const callTool = task({ name: "callTool" }, async (toolCall: ToolCall) => {
  const tool = toolsByName[toolCall.name];
  return tool.invoke(toolCall);
});

export default callTool;