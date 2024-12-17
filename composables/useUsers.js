export function useUsers() {
  const { $supabase } = useNuxtApp();
  const users = ref([]);
  const loading = ref(false);

  const getUsers = async () => {
    loading.value = true;
    try {
      const { data, error } = await $supabase.from("profiles").select("*").order("created_at", { ascending: false });

      if (error) throw error;
      users.value = data;
    } catch (error) {
      throw new Error(error.message || "Failed to fetch users");
    } finally {
      loading.value = false;
    }
  };

  const addUser = async ({ email, password, role }) => {
    loading.value = true;
    try {
      // Create auth user
      const { data: authUser, error: signUpError } = await $supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) throw signUpError;

      // Add user profile with role
      const { error: profileError } = await $supabase.from("profiles").update({ role }).eq("id", authUser.user.id);

      if (profileError) throw profileError;

      await getUsers();
    } catch (error) {
      throw new Error(error.message || "Failed to add user");
    } finally {
      loading.value = false;
    }
  };

  const updateUser = async (id, { role }) => {
    loading.value = true;
    try {
      const { error } = await $supabase.from("profiles").update({ role }).eq("id", id);

      if (error) throw error;
      await getUsers();
    } catch (error) {
      throw new Error(error.message || "Failed to update user");
    } finally {
      loading.value = false;
    }
  };

  const deleteUser = async (id) => {
    loading.value = true;
    try {
      const { error } = await $supabase.auth.admin.deleteUser(id);
      if (error) throw error;
      await getUsers();
    } catch (error) {
      throw new Error(error.message || "Failed to delete user");
    } finally {
      loading.value = false;
    }
  };

  return {
    users,
    loading,
    getUsers,
    addUser,
    updateUser,
    deleteUser,
  };
}
