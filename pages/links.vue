<template>
  <ClientOnly>
    <div style="background-image: url('/pattern2.png')">
      <div class="container mx-auto px-4 py-16 text-center">
        <h1 class="text-3xl font-bold underline mb-6">แบบฟอร์มกรอกข้อมูล</h1>
        <button
          v-show="isLoggedIn && role === 'admin'"
          class="btn btn-primary text-white"
          onclick="modal_links.showModal()"
          @click="setCreateMode"
        >
          เพิ่มลิงก์
        </button>
      </div>
    </div>
    <div class="container mx-auto px-4 py-8">
      <div class="space-y-4">
        <div
          v-for="link in links"
          :key="link.id"
          class="card bg-base-100 transition-transform transform hover:scale-105 duration-300 rounded-lg border border-gray-200 overflow-hidden relative"
        >
          <div class="card-body items-center text-center">
            <h3 class="card-title mb-2">{{ link.name }}</h3>
            <a :href="link.url" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:text-blue-700">{{
              link.url
            }}</a>
          </div>
          <div v-show="isLoggedIn && role === 'admin'" class="absolute top-2 right-2 flex gap-2">
            <button class="btn btn-circle btn-sm btn-warning" @click="editLink(link)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </button>
            <button class="btn btn-circle btn-sm btn-error" @click="deleteLink(link.id)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- DaisyUI Modal -->
    <dialog id="modal_links" class="modal">
      <div class="modal-box">
        <h3 class="text-lg font-bold">{{ isEditing ? "แก้ไขลิงก์" : "เพิ่มลิงก์" }}</h3>
        <form @submit.prevent="handleSubmit" class="space-y-1 py-4">
          <div class="form-control">
            <label class="label">ชื่อลิงก์</label>
            <input v-model="formData.name" type="text" class="input input-bordered" required />
          </div>

          <div class="form-control">
            <label class="label">URL</label>
            <input v-model="formData.url" type="url" class="input input-bordered" required />
          </div>

          <div class="modal-action pt-8">
            <button type="button" class="btn" @click="closeModal">ยกเลิก</button>
            <button type="submit" class="btn btn-primary text-white" :disabled="loading">
              <span v-if="loading" class="loading loading-spinner"></span>
              <span>{{ isEditing ? "บันทึกการแก้ไข" : "บันทึก" }}</span>
            </button>
          </div>
        </form>
      </div>
    </dialog>
  </ClientOnly>
</template>

<script setup>
const supabase = useNuxtApp().$supabase;
const { $toast } = useNuxtApp();
const isLoggedIn = useState("isLoggedIn");
const role = useState("role");
const loading = ref(false);
const isEditing = ref(false);
const editingId = ref(null);

const links = ref([]);
const getLinks = async () => {
  loading.value = true;
  try {
    const { data, error } = await supabase.from("links").select("*").order("created_at", { ascending: false });
    if (error) throw error;
    links.value = data;
  } catch (error) {
    console.error("Error fetching links:", error);
    $toast.error("ไม่สามารถดึงข้อมูลได้");
  } finally {
    loading.value = false;
  }
};

const formData = ref({
  name: "",
  url: "",
});

const setCreateMode = () => {
  isEditing.value = false;
  editingId.value = null;
  formData.value = {
    name: "",
    url: "",
  };
};

const editLink = (item) => {
  isEditing.value = true;
  editingId.value = item.id;
  formData.value = {
    name: item.name,
    url: item.url,
  };
  document.getElementById("modal_links").showModal();
};

const deleteLink = async (id) => {
  if (!confirm("คุณต้องการลบลิงก์นี้ใช่หรือไม่?")) return;

  loading.value = true;
  try {
    const { error } = await supabase.from("links").delete().eq("id", id);

    if (error) throw error;

    $toast.success("ลบลิงก์เรียบร้อยแล้ว");
    await getLinks();
  } catch (error) {
    console.error("Error deleting link:", error);
    $toast.error("ไม่สามารถลบลิงก์ได้");
  } finally {
    loading.value = false;
  }
};

const handleSubmit = async () => {
  loading.value = true;
  try {
    if (isEditing.value) {
      const { error } = await supabase
        .from("links")
        .update({
          name: formData.value.name,
          url: formData.value.url,
        })
        .eq("id", editingId.value);
      if (error) throw error;
      $toast.success("แก้ไขข้อมูลสำเร็จ");
    } else {
      const { error } = await supabase.from("links").insert({
        name: formData.value.name,
        url: formData.value.url,
      });
      if (error) throw error;
      $toast.success("เพิ่มข้อมูลสำเร็จ");
    }
    closeModal();
    getLinks();
  } catch (error) {
    console.error("Error submitting form:", error);
    $toast.error("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
  } finally {
    loading.value = false;
  }
};

const closeModal = () => {
  document.getElementById("modal_links").close();
  setCreateMode();
};

onMounted(() => {
  if (!isLoggedIn.value) {
    navigateTo("/");
  }
  getLinks();
});
</script>
