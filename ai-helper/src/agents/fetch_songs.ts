import axios from "axios";
import "dotenv/config";
import { createAgent, tool } from "langchain";


const searchTracks = tool(
  async ({ genre, mood }) => {
    const query = `
      query {
        tracks(genre: "${genre}", mood: "${mood}") {
          id
          name
          artist
        }
      }
    `;
    const res = await axios.post(process.env.SPOTIFY_GRAPHQL_URL, { query });
    return JSON.stringify(res.data.data.tracks, null, 2);
  },
  {
    name: "search_tracks",
    description: "Busca músicas no Spotify GraphQL por gênero e humor",
    schema: z.object({
      genre: z.string(),
      mood: z.string().optional(),
    }),
  }
);

const agent = createAgent({
  model: "openai:gpt-5",
  tools: [searchTracks],
});

const result = await agent.invoke({
  messages: [
    {
      role: "user",
      content: "Quero músicas de rock leve para trabalhar",
    },
  ],
});

console.log(result);