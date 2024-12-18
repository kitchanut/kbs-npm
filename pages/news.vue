<template>
  <div style="background-image: url('/pattern2.png')">
    <div class="container mx-auto px-4 py-16 text-center">
      <h1 class="text-3xl font-bold underline mb-6">ข่าวสาร</h1>
      <button
        v-show="isLoggedIn && role === 'admin'"
        class="btn btn-primary text-white"
        onclick="modal_news.showModal()"
        @click="setCreateMode"
      >
        เพิ่มข่าว
      </button>
    </div>
  </div>

  <div class="container mx-auto px-4 py-8">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="item in news"
        :key="item.id"
        class="card bg-base-100 shadow-xl hover:shadow-2xl transition-transform transform hover:scale-105 duration-300"
      >
        <img :src="item.url" :alt="item.name" class="w-full h-full object-cover" />
        <div v-show="isLoggedIn && role === 'admin'" class="absolute top-2 right-2 flex gap-2">
          <button class="btn btn-circle btn-sm btn-warning" @click="editNews(item)">
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
          <button class="btn btn-circle btn-sm btn-error" @click="deleteNews(item)">
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
  <dialog id="modal_news" class="modal">
    <div class="modal-box">
      <h3 class="text-lg font-bold">{{ isEditing ? "แก้ไขข่าว" : "เพิ่มข่าว" }}</h3>
      <form @submit.prevent="handleSubmit" class="space-y-1 py-4">
        <div class="form-control">
          <label class="label">ชื่อข่าว</label>
          <input v-model="formData.name" type="text" class="input input-bordered" required />
        </div>

        <div class="form-control">
          <label class="label">รูปภาพ</label>
          <input
            type="file"
            accept="image/*"
            class="file-input file-input-bordered w-full"
            @change="handleFileChange"
            required
          />
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
</template>

<script setup>
const supabase = useNuxtApp().$supabase;
const { $toast } = useNuxtApp();
const isLoggedIn = useState("isLoggedIn");
const role = useState("role");
const loading = ref(false);
const isEditing = ref(false);
const editingId = ref(null);

const news = ref([]);
const getNews = async () => {
  loading.value = true;
  try {
    const { data, error } = await supabase.from("news").select("*").order("created_at", { ascending: false });
    if (error) throw error;
    news.value = data;
  } catch (error) {
    console.error("Error fetching news:", error);
    $toast.error("ไม่สามารถดึงข้อมูลได้");
  } finally {
    loading.value = false;
  }
};
getNews();

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

const editNews = (item) => {
  isEditing.value = true;
  editingId.value = item.id;
  formData.value = {
    name: item.name,
    url: item.url,
  };
  document.getElementById("modal_news").showModal();
};

const deleteNews = async (item) => {
  if (!window.confirm("คุณต้องการลบข่าวนี้ใช่หรือไม่?")) return;

  loading.value = true;
  try {
    const { error } = await supabase.from("news").delete().eq("id", item.id);

    if (error) throw error;

    await getNews();
    $toast.success("ลบข่าวเรียบร้อยแล้ว");
  } catch (error) {
    console.error("Error deleting news:", error);
    $toast.error("ไม่สามารถลบข่าวได้");
  } finally {
    loading.value = false;
  }
};

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      formData.value.url = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const handleSubmit = async () => {
  loading.value = true;
  try {
    let error;
    if (isEditing.value) {
      const { error: updateError } = await supabase
        .from("news")
        .update({
          name: formData.value.name,
          url: formData.value.url,
        })
        .eq("id", editingId.value);
      error = updateError;
    } else {
      const { error: insertError } = await supabase.from("news").insert({
        name: formData.value.name,
        url: formData.value.url,
      });
      error = insertError;
    }

    if (error) throw error;

    // Reset form and close modal
    formData.value = { name: "", url: "" };
    closeModal();
    $toast.success(isEditing.value ? "แก้ไขข่าวเรียบร้อยแล้ว" : "บันทึกข่าวเรียบร้อยแล้ว");
    getNews();
  } catch (error) {
    console.error("Error:", error);
    $toast.error(isEditing.value ? "เกิดข้อผิดพลาดในการแก้ไขข่าว" : "เกิดข้อผิดพลาดในการบันทึกข่าว");
  } finally {
    loading.value = false;
  }
};

const closeModal = () => {
  document.getElementById("modal_news").close();
  setCreateMode();
};

onMounted(() => {
  const modal = document.getElementById("modal_news");
  modal.addEventListener("close", () => {
    setCreateMode();
  });
});
</script>
