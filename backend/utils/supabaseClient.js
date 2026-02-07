import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey =
  process.env.SUPABASE_KEY ||
  process.env.VITE_SUPABASE_SERVICE_ROLE_KY ||
  process.env.VITE_SUPABASE_ANON_KEY ||
  process.env.VITE_SUPABASE_ANON_KY;


let supabase;

if (!supabaseUrl || !supabaseKey) {
  console.error("⚠️  WARNING: Supabase URL or Key is missing in .env file.");
  console.error(
    "Please add SUPABASE_URL and SUPABASE_KEY (or VITE_SUPABASE_URL/VITE_SUPABASE_ANON_KEY) to backend/.env to use Quiz features.",
  );
  console.error(
    "Validation failed for: URL=" + !!supabaseUrl + ", KEY=" + !!supabaseKey,
  );

  // Return a proxy that throws informative error when used
  supabase = {
    from: () => {
      throw new Error(
        "Supabase client is not initialized. Please configure SUPABASE_URL and SUPABASE_KEY in backend/.env",
      );
    },
  };
} else {
  supabase = createClient(supabaseUrl, supabaseKey);
}

export default supabase;
