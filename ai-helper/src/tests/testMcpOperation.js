// src/test-mcp-client.ts
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
const SPOTIFY_TOKEN = "BQCi1-MOAmohsGxs-m9AHfkrhujd6BbYjmeWJifuIJYj1clOeBIHcKovG0dr6an826XHXFuexkvUzyS_gppaX_6gbgv1B9BfWtdJBmtlNWHOubXjqlIfQLdOgO4YgkkWqxWCmLY9SQoDAOFemPIy34-hRFwLOtVAAcwtjEQuc-64We20jLlHOPHw2v3B51f32iT8fPkqdF5MFxKZgya2k8ZB7fyEmzQ6GHEpBm6Sz3K5mT3ZW8gyTerAHsqaB6R0iWUwOrvOgCEy_l1n3lGfQv1nhlkVaxtyUk6_6xB_7TtBNvCu8QZso9vAcrOXjdi_8dUCHHtdwTNTkNY6Kd2sxbTr0OcUOrjfFl3_yfY";
async function main() {
    const MCP_URL = process.env.MCP_URL || "http://127.0.0.1:8000/mcp";
    const requestInit = {
        headers: {
            Authorization: SPOTIFY_TOKEN,
        },
    };
    console.log(`🔌 Connecting to MCP server at ${MCP_URL}...`);
    // transporte correto pro seu caso
    const transport = new StreamableHTTPClientTransport(new URL(MCP_URL), { requestInit });
    const client = new Client({
        name: "spotify-mcp-client",
        version: "1.0.0",
    });
    await client.connect(transport);
    console.log("✅ Connected to MCP server");
    // lista ferramentas
    const toolResponse = await client.listTools();
    const tools = toolResponse.tools || [];
    console.log("🧩 Available tools:");
    if (tools.length === 0) {
        console.log("⚠️ No tools found.");
    }
    else {
        console.table(tools.map((t) => ({ name: t.name, description: t.description })));
    }
    // chama a tool Track
    console.log("\n🎶 Calling Track tool...");
    const result = await client.callTool({
        name: "Track",
        arguments: {
            q: "chill acoustic",
            type: ["TRACK"]
        },
    });
    console.log("\n✅ Result:");
    console.dir(result, { depth: null });
    await client.close();
    console.log("👋 Connection closed");
}
main().catch((err) => {
    console.error("❌ MCP Client error:", err);
    process.exit(1);
});
