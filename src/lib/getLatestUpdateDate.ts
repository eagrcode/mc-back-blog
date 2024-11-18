import { supabase } from "./supabaseClient";

export const getLatestUpdateDate = async (): Promise<Date | null> => {
  const { data, error } = await supabase
    .from("posts")
    .select("updated_at")
    .not("updated_at", "is", null)
    .order("updated_at", { ascending: false })
    .limit(1)
    .single();

  if (error) {
    throw error;
  }

  const latestUpdatedAt = data?.updated_at;
  console.log("LATEST UPDATE: ", latestUpdatedAt);

  return latestUpdatedAt ? new Date(latestUpdatedAt) : null;
};
