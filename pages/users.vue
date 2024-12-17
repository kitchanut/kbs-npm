<template>
  <div class="bg-custom">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 p-8">
      <div class="lg:col-span-4 bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-bold mb-6">ข้อมูลผู้ใช้และเปลี่ยนรหัสผ่าน</h2>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">อีเมล</label>
            <input
              type="email"
              v-model="formData.email"
              disabled
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 bg-gray-50"
            />
          </div>
          <div>
            <div class="relative">
              <label class="block text-sm font-medium text-gray-700">รหัสผ่านเดิม</label>
              <input
                v-model="formData.oldPassword"
                :type="showPassword.old ? 'text' : 'password'"
                required
                class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#6BBD6A] focus:outline-none focus:ring-1 focus:ring-[#6BBD6A]"
              />
              <button type="button" class="absolute right-2 top-9" @click="showPassword.old = !showPassword.old">
                <Icon :name="showPassword.old ? 'mdi:eye-off' : 'mdi:eye'" size="16" />
              </button>
            </div>
          </div>
          <div class="relative">
            <label class="block text-sm font-medium text-gray-700">รหัสผ่านใหม่</label>
            <input
              v-model="formData.newPassword"
              :type="showPassword.new ? 'text' : 'password'"
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#6BBD6A] focus:outline-none focus:ring-1 focus:ring-[#6BBD6A]"
            />
            <button type="button" class="absolute right-2 top-9" @click="showPassword.new = !showPassword.new">
              <Icon :name="showPassword.new ? 'mdi:eye-off' : 'mdi:eye'" size="16" />
            </button>
          </div>
          <div class="relative">
            <label class="block text-sm font-medium text-gray-700">ยืนยันรหัสผ่านใหม่</label>
            <input
              v-model="formData.confirmPassword"
              :type="showPassword.confirm ? 'text' : 'password'"
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#6BBD6A] focus:outline-none focus:ring-1 focus:ring-[#6BBD6A]"
            />
            <button type="button" class="absolute right-2 top-9" @click="showPassword.confirm = !showPassword.confirm">
              <Icon :name="showPassword.confirm ? 'mdi:eye-off' : 'mdi:eye'" />
            </button>
          </div>
          <button
            class="w-full bg-[#6BBD6A] text-white rounded-md py-2 px-4 hover:bg-[#5ba959] transition-colors duration-300"
            @click="handleChangePassword"
            :disabled="loading"
            :class="{ 'bg-gray-400 cursor-not-allowed': loading }"
          >
            เปลี่ยนรหัสผ่าน
          </button>
          <button
            @click="logout"
            class="w-full bg-red-500 text-white rounded-md py-2 px-4 hover:bg-red-600 transition-colors duration-300"
          >
            ออกจากระบบ
          </button>
        </div>
      </div>

      <div class="lg:col-span-8 bg-white rounded-lg shadow p-6">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-bold">รายชื่อผู้ใช้ทั้งหมด</h2>
          <button
            @click="showAddUserModal = true"
            class="bg-[#6BBD6A] text-white rounded-md py-2 px-4 hover:bg-[#5ba959] transition-colors duration-300"
          >
            เพิ่มผู้ใช้
          </button>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th width="200" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  อีเมล
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">บทบาท</th>
                <th width="100" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  การกระทำ
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="(user, key) in users" :key="user.id">
                <td class="px-6 py-4 whitespace-nowrap">{{ user?.email }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ user?.role }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <button @click="openEditModal(user)" class="text-indigo-600 hover:text-indigo-900">แก้ไข</button>
                  <button
                    v-if="key > 0"
                    @click="handleDeleteUser(user.id)"
                    class="ml-4 text-red-600 hover:text-red-900"
                  >
                    ลบ
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Add User Modal -->
    <div v-if="showAddUserModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 class="text-lg font-bold mb-4">เพิ่มผู้ใช้ใหม่</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">อีเมล</label>
            <input
              v-model="newUser.email"
              type="email"
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#6BBD6A] focus:outline-none focus:ring-1 focus:ring-[#6BBD6A]"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">รหัสผ่าน</label>
            <input
              v-model="newUser.password"
              type="password"
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#6BBD6A] focus:outline-none focus:ring-1 focus:ring-[#6BBD6A]"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">บทบาท</label>
            <select
              v-model="newUser.role"
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#6BBD6A] focus:outline-none focus:ring-1 focus:ring-[#6BBD6A]"
            >
              <option value="admin">Admin</option>
              <!-- <option value="user">User</option> -->
            </select>
          </div>
          <div class="flex justify-end space-x-3 mt-6">
            <button
              @click="showAddUserModal = false"
              class="bg-gray-200 text-gray-700 rounded-md py-2 px-4 hover:bg-gray-300 transition-colors duration-300"
            >
              ยกเลิก
            </button>
            <button
              @click="handleAddUser"
              class="bg-[#6BBD6A] text-white rounded-md py-2 px-4 hover:bg-[#5ba959] transition-colors duration-300"
            >
              เพิ่มผู้ใช้
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit User Modal -->
    <div v-if="showEditUserModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 class="text-lg font-bold mb-4">แก้ไขผู้ใช้</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">อีเมล</label>
            <input
              v-model="editingUser.email"
              type="email"
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#6BBD6A] focus:outline-none focus:ring-1 focus:ring-[#6BBD6A]"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">รหัสผ่านใหม่ (เว้นว่างถ้าไม่ต้องการเปลี่ยน)</label>
            <input
              v-model="editingUser.password"
              type="password"
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#6BBD6A] focus:outline-none focus:ring-1 focus:ring-[#6BBD6A]"
            />
          </div>
          <!-- <div>
            <label class="block text-sm font-medium text-gray-700">บทบาท</label>
            <select
              v-model="editingUser.role"
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#6BBD6A] focus:outline-none focus:ring-1 focus:ring-[#6BBD6A]"
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div> -->
          <div class="flex justify-end space-x-3 mt-6">
            <button
              @click="showEditUserModal = false"
              class="bg-gray-200 text-gray-700 rounded-md py-2 px-4 hover:bg-gray-300 transition-colors duration-300"
            >
              ยกเลิก
            </button>
            <button
              @click="handleEditUser"
              :disabled="loading"
              :class="{ 'bg-gray-400 cursor-not-allowed': loading }"
              class="bg-[#6BBD6A] text-white rounded-md py-2 px-4 hover:bg-[#5ba959] transition-colors duration-300"
            >
              <icon v-if="loading" name="material-symbols:hourglass-bottom" class="animate-spin h-5 w-5 mr-2" />บันทึก
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const { $supabase } = useNuxtApp();
const { $toast } = useNuxtApp();

const users = ref([]);
const loading = ref(false);
const currentUser = ref(null);
const isLoggedIn = useState("isLoggedIn");

// Get current user
const getCurrentUser = async () => {
  const {
    data: { user },
    error,
  } = await $supabase.auth.getUser();
  if (!error) {
    currentUser.value = user;
    formData.email = user?.email;
  }
};

// Fetch all users
const getUsers = async () => {
  loading.value = true;
  try {
    const { data, error } = await $supabase.from("profiles").select("id, email, role").order("id", { ascending: true });

    if (error) throw error;
    users.value = data;
  } catch (error) {
    console.error("Error fetching users:", error);
  } finally {
    loading.value = false;
  }
};

// Form state
const formData = reactive({
  email: "",
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
});

const showPassword = reactive({
  old: false,
  new: false,
  confirm: false,
});

// Modal state
const showAddUserModal = ref(false);
const showEditUserModal = ref(false);

// Change password handler
const handleChangePassword = async () => {
  if (!formData.oldPassword || !formData.newPassword || !formData.confirmPassword) {
    alert("กรุณากรอกข้อมูลให้ครบถ้วน");
    return;
  }

  if (formData.newPassword !== formData.confirmPassword) {
    alert("รหัสผ่านใหม่ไม่ตรงกัน");
    return;
  }

  loading.value = true;
  try {
    const { error } = await $supabase.auth.updateUser({
      password: formData.newPassword,
    });

    if (error) throw error;

    alert("เปลี่ยนรหัสผ่านสำเร็จ");
    formData.email = currentUser.value?.email;
    formData.oldPassword = "";
    formData.newPassword = "";
    formData.confirmPassword = "";
  } catch (error) {
    console.error("Error changing password:", error);
    alert("เกิดข้อผิดพลาดในการเปลี่ยนรหัสผ่าน");
  } finally {
    loading.value = false;
  }
};

// Add new user handler
const newUser = ref({
  email: "",
  password: "",
  role: "admin",
});

const handleAddUser = async () => {
  const {
    data: { session },
    error,
  } = await $supabase.auth.getSession();
  console.log(session);
  if (!newUser.value.email || !newUser.value.password) {
    alert("กรุณากรอกข้อมูลให้ครบถ้วน");
    return;
  }

  loading.value = true;
  try {
    const { data, error } = await $fetch("/api/users/create", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session?.access_token}`,
      },
      body: {
        email: newUser.value.email,
        password: newUser.value.password,
        user_metadata: {
          role: newUser.value.role,
        },
      },
    });

    if (error) throw error;

    const { error: profileError } = await $supabase.from("profiles").insert({
      id: data.user.id,
      email: newUser.value.email,
      role: newUser.value.role,
    });

    if (profileError) throw profileError;

    showAddUserModal.value = false;
    newUser.value = {
      email: "",
      password: "",
      role: "admin",
    };
    await getUsers();
  } catch (error) {
    console.error("Error adding user:", error);
    alert("เกิดข้อผิดพลาดในการเพิ่มผู้ใช้");
  } finally {
    loading.value = false;
  }
};

// Edit user handler
const editingUser = ref({
  id: null,
  email: "",
  password: "",
  role: "",
});

const openEditModal = (user) => {
  editingUser.value = {
    id: user.id,
    email: user.email,
    password: "",
    role: user.role,
  };
  showEditUserModal.value = true;
};

const handleEditUser = async () => {
  if (!editingUser.value.email) {
    $toast.warning("กรุณากรอกอีเมล");
    return;
  }
  loading.value = true;

  const {
    data: { session },
    error,
  } = await $supabase.auth.getSession();

  try {
    const { data, error } = await $fetch("/api/users/update", {
      headers: {
        Authorization: `Bearer ${session?.access_token}`,
      },
      method: "POST",
      body: {
        id: editingUser.value.id,
        email: editingUser.value.email,
        role: editingUser.value.role,
        password: editingUser.value.password || "",
      },
    });
    if (error) throw error;
    showEditUserModal.value = false;
    await getUsers();
  } catch (error) {
    console.error("Error updating user:", error);
    $toast.error("เกิดข้อผิดพลาดในการแก้ไขผู้ใช้");
  } finally {
    loading.value = false;
    $toast.success("แก้ไขสําเร็จ");
  }
};

// Delete user handler
const handleDeleteUser = async (userId) => {
  if (!confirm("คุณแน่ใจหรือไม่ที่จะลบผู้ใช้นี้?")) return;

  loading.value = true;
  try {
    const { error: authError } = await $supabase.auth.admin.deleteUser(userId);
    if (authError) throw authError;

    const { error: profileError } = await $supabase.from("profiles").delete().eq("id", userId);

    if (profileError) throw profileError;

    await getUsers();
  } catch (error) {
    console.error("Error deleting user:", error);
    alert("เกิดข้อผิดพลาดในการลบผู้ใช้");
  } finally {
    loading.value = false;
  }
};

// Logout handler
const logout = async () => {
  try {
    const { error } = await $supabase.auth.signOut();
    if (error) throw error;
    isLoggedIn.value = false;
    navigateTo("/login");
  } catch (error) {
    console.error("Error during logout:", error);
    alert("เกิดข้อผิดพลาดในการออกจากระบบ");
  }
};

// Initialize data
onMounted(async () => {
  await getCurrentUser();
  await getUsers();
});
</script>

<style scoped>
.bg-custom {
  background-image: url("/pattern2.png");
}
</style>
