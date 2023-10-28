import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://zdmdpmqatefodnkfmfwx.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkbWRwbXFhdGVmb2Rua2ZtZnd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTgxNDYyODYsImV4cCI6MjAxMzcyMjI4Nn0.03YHGjx_HLnja-nWL7oSG7s2fMVUk_y-NPGmdg5mjBo";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
