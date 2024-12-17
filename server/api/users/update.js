// server/api/users/update.js
import { createClient } from "@supabase/supabase-js";

export default defineEventHandler(async (event) => {
  const {
    supabaseServiceRoleKey,
    public: { supabaseUrl },
  } = useRuntimeConfig();
  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
  const authHeader = getHeader(event, "authorization");
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return { status: 401, body: { error: "Authorization token is required" } };
  }
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser(token);

  if (authError || !user) {
    return { status: 401, body: { error: "Unauthorized" } };
  }

  try {
    const { id, email, role, password } = await readBody(event);
    // Update profile information
    const { error: profileError } = await supabase.from("profiles").update({ email, role }).eq("id", id);

    if (profileError) {
      throw profileError;
    }

    // Update password if provided
    if (password) {
      const { error: authUpdateError } = await supabase.auth.admin.updateUserById(id, { password });
      if (authUpdateError) {
        throw authUpdateError;
      }
    }

    return { status: 200, body: { message: "User updated successfully" } };
  } catch (error) {
    console.log(error);
    return { status: 400, body: { error: error.message } };
  }
});
