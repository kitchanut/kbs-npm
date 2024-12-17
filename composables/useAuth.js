export const useAuth = () => {
  const { $supabase } = useNuxtApp();
  const user = useState("user", () => null);

  const checkAuth = async () => {
    try {
      const {
        data: { session },
        error,
      } = await $supabase.auth.getSession();
      if (error) throw error;
      if (!session) return null;
      return true;
    } catch (error) {
      return null;
    }
  };

  const changePassword = async (data) => {
    try {
      const { error } = await $supabase.auth.updateUser({
        password: data.newPassword,
      });

      if (error) throw error;
      return { message: "Password updated successfully" };
    } catch (error) {
      throw new Error(error.message || "Failed to change password");
    }
  };

  const logout = async () => {
    try {
      const { error } = await $supabase.auth.signOut();
      if (error) throw error;
      user.value = null;
      return navigateTo("/login");
    } catch (error) {
      throw new Error(error.message || "Failed to logout");
    }
  };

  return {
    user,
    checkAuth,
    changePassword,
    logout,
  };
};
