// server/api/updateEmail.ts
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

  const { userId } = await readBody(event);
  const { data, error } = await supabase.auth.admin.deleteUser(userId);

  if (error) {
    return { status: 400, error: error.message };
  }

  return { status: 200, body: { message: "delete successfully", data } };
});
