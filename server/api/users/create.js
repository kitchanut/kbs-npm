// server/api/updateEmail.ts
import { createClient } from "@supabase/supabase-js";

export default defineEventHandler(async (event) => {
  const {
    supabaseServiceRoleKey,
    public: { supabaseUrl },
  } = useRuntimeConfig();

  // error punycode
  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
  // error punycode

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

  const { email, password, user_metadata } = await readBody(event);
  const { data, error } = await supabase.auth.admin.createUser({
    email: email,
    password: password,
    user_metadata: user_metadata,
    email_confirm: true,
  });

  if (error) {
    return { status: 400, error: error.message };
  }

  return { status: 200, data };
});
