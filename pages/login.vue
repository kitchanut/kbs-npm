<template>
  <div class="bg-custom">
    <!-- Header section with green background -->
    <div class="w-full flex items-center justify-center px-4 py-12">
      <h1 class="text-3xl font-bold">เข้าสู่ระบบ</h1>
    </div>

    <!-- Login form card -->
    <div class="container mx-auto px-4 pb-16">
      <div class="max-w-md mx-auto bg-white rounded-lg shadow-lg border border-gray-200 p-8">
        <div class="mb-6 text-center">
          <img src="/public/logo.png" alt="Logo" class="h-16 w-16 mx-auto mb-4" />
          <h2 class="text-xl font-bold text-gray-800">One Stop Service Center (OSSC)</h2>
          <p class="text-gray-500">สำนักงานสาธารณสุขจังหวัดครพนม</p>
        </div>

        <form class="space-y-4" @submit.prevent="handleLogin">
          <div>
            <label for="username" class="block text-sm font-medium text-gray-700">ชื่อผู้ใช้</label>
            <input
              v-model="formData.username"
              type="text"
              id="username"
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#6BBD6A] focus:outline-none focus:ring-1 focus:ring-[#6BBD6A]"
            />
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">รหัสผ่าน</label>
            <div class="relative">
              <input
                v-model="formData.password"
                :type="showPassword ? 'text' : 'password'"
                id="password"
                class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#6BBD6A] focus:outline-none focus:ring-1 focus:ring-[#6BBD6A]"
              />
              <button type="button" class="absolute right-2 top-3" @click="showPassword = !showPassword">
                <Icon :name="showPassword ? 'mdi:eye-off' : 'mdi:eye'" size="16" />
              </button>
            </div>
          </div>

          <div v-if="error" class="text-red-500 text-sm text-center">
            {{ error }}
          </div>

          <button
            type="submit"
            class="w-full bg-[#6BBD6A] text-white rounded-md py-2 px-4 hover:bg-[#5ba959] transition-colors duration-300"
            :disabled="loading"
          >
            {{ loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ" }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
const router = useRouter();
const { $supabase } = useNuxtApp();
const isLoggedIn = useState("isLoggedIn");
const role = useState("role");

if (isLoggedIn.value) {
  router.push("/");
}

const showPassword = ref(false);
const loading = ref(false);
const error = ref("");
const formData = ref({
  username: "",
  password: "",
});

async function handleLogin() {
  loading.value = true;
  error.value = "";

  try {
    const { data, error: supabaseError } = await $supabase.auth.signInWithPassword({
      email: formData.value.username,
      password: formData.value.password,
    });

    if (supabaseError) {
      throw supabaseError;
    }

    // Login successful
    isLoggedIn.value = true;
    role.value = data.user.user_metadata.role;
    router.push("/");
  } catch (err) {
    error.value = err.message || "Login failed. Please check your credentials.";
  } finally {
    loading.value = false;
  }
}
</script>
<style scoped>
.bg-custom {
  background-image: url("/pattern2.png");
}
</style>
