import { createClient } from "@supabase/supabase-js";

// Supabase configuration
// You need to get these values from your Supabase dashboard:
// 1. Go to your Supabase project dashboard
// 2. Click on "Settings" in the left sidebar
// 3. Click on "API"
// 4. Copy the "Project URL" and "anon public" key

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  "https://admehgvqowpibiuwugpv.supabase.co";
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY || "your-anon-key-here";

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Export for use in other files
export default supabase;
