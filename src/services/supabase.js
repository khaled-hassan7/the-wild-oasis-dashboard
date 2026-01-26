import { createClient } from "@supabase/supabase-js";
 export const supabaseUrl = "https://qzamhnfwkokabcliqtbi.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6YW1obmZ3a29rYWJjbGlxdGJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkwOTkwMDAsImV4cCI6MjA4NDY3NTAwMH0.iRqw9pm9YAGlaN4Puet8un0cbgTQKGVKbKBusuwBprI";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
