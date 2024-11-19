import { supabase } from "./supabaseClient";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    try {
      const { data, error: dbError } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (dbError) {
        throw dbError;
      }

      if (data) {
        console.log("LOGIN SUCCESSFUL:", data);
        navigate("/dashboard");
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  return login;
};
