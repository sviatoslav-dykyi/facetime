// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.
import { StreamChat } from "https://esm.sh/stream-chat";

console.log("Hello from Functions!");

Deno.serve(async (req) => {
  const serverClient = StreamChat.getInstance(
    Deno.env.get("qqwzdx29k77s"),
    Deno.env.get(
      "d6bxdpekhbsxcemmbhud9gegme826wt3trjzqhhs3va34p44cu88srwvmmesqpmw"
    )
  );

  const { name } = await req.json();

  const token = serverClient.createToken(name);

  return new Response(JSON.stringify(token), {
    headers: { "Content-Type": "application/json" },
  });
});

// curl -i --location --request POST 'https://zdmdpmqatefodnkfmfwx.supabase.co/functions/v1/stream-token' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkbWRwbXFhdGVmb2Rua2ZtZnd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTgxNDYyODYsImV4cCI6MjAxMzcyMjI4Nn0.03YHGjx_HLnja-nWL7oSG7s2fMVUk_y-NPGmdg5mjBo' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'
