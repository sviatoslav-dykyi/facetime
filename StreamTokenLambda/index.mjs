//.mjs - this extension allows us to do import export statements

import { StreamChat } from "stream-chat";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL ?? "";
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY ?? "";

const STREAM_API_KEY = process.env.STREAM_API_KEY ?? "";
const STREAM_API_SECRET = process.env.STREAM_API_SECRET ?? "";

const serverClient = StreamChat.getInstance(STREAM_API_KEY, STREAM_API_SECRET);

export const handler = async (event) => {
  const authToken = event.queryStringParameters?.token;

  if (!authToken) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: "Auth token not provided" }),
    };
  }

  try {
    const supabaseClient = createClient(
      SUPABASE_URL,
      SUPABASE_ANON_KEY,
      // Create client with Auth context of the user that called the function
      {
        global: { headers: { Authorization: `Bearer ${authToken}` } },
      }
    );

    const {
      data: { user },
    } = await supabaseClient.auth.getUser();

    if (!user) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "User not found" }),
      };
    }

    // передаємо id юзака із сесії supabase
    const token = serverClient.createToken(user.id);

    const response = {
      statusCode: 200,
      body: JSON.stringify({ token }),
    };
    return response;
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Unexpected Error" }),
    };
  }
};
