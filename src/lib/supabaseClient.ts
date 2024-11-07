import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://nbznhrsjbnsfjqnkcool.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5iem5ocnNqYm5zZmpxbmtjb29sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA4MjkzMjQsImV4cCI6MjA0NjQwNTMyNH0.qSaXfjtX9xCbgCrEIpTqk-FT4nx-8M0FR3ugcgNsUKk"
);
