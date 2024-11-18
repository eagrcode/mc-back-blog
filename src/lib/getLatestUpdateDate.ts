import { supabase } from "./supabaseClient";

export const getLatestUpdateDate = async (): Promise<Date | null> => {
  const { data, error } = await supabase
    .from("posts")
    .select("updated_at")
    .not("updated_at", "is", null)
    .order("updated_at", { ascending: false })
    .limit(1);

  if (error) {
    throw error;
  }

  if (!data || data.length === 0) {
    return null;
  }

  const latestUpdatedAt = data[0].updated_at;
  console.log("LATEST UPDATE: ", latestUpdatedAt);

  return latestUpdatedAt ? new Date(latestUpdatedAt) : null;
};
