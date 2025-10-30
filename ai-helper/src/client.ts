import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

const MCP_ENDPOINT = process.env.MCP_ENDPOINT || "http://mcp_server:8000/mcp";

// Hold a single active client (global state)
let currentMcpClient: Client | null = null;

export async function createMcpClient(token: string) {
  const transport = new StreamableHTTPClientTransport(
    new URL(MCP_ENDPOINT),
    {
      requestInit: {
        headers: { Authorization: token },
      },
    }
  );

  const mcpClient = new Client({
    name: "spotify-ai-helper",
    version: "1.0.0",
  });

  await mcpClient.connect(transport);
  console.log("✅ Connected to MCP server for request");

  currentMcpClient = mcpClient;  
}

export function getMcpClient(): Client {
  if (!currentMcpClient) {
    throw new Error("❌ MCP client has not been initialized yet.");
  }
  return currentMcpClient;
}