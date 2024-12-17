<template>
  <div style="background-image: url('/pattern2.png')">
    <div class="container mx-auto px-4 py-16 text-center">
      <h1 class="text-3xl font-bold underline">{{ title }}</h1>
    </div>
  </div>
  <div class="flex flex-wrap mt-4">
    <!-- Left Section (7/12) -->
    <div class="w-full lg:w-7/12 p-4">
      <div class="card bg-base-100 border border-gray-200">
        <div class="card-body">
          <h2 class="card-title text-2xl mb-4 flex justify-between">
            สถานประกอบการที่ได้รับอนุญาตจาก สสจ.นครพนม
            <button
              v-show="isLoggedIn"
              class="btn btn-active btn-primary text-white"
              @click="
                dialogBusiness = true;
                action = 'create';
              "
            >
              <Icon name="mdi:plus" size="20" />
            </button>
          </h2>
          <table class="table table-xs">
            <thead>
              <tr>
                <th>ชื่อสถานประกอบการ</th>
                <th v-show="props.business_type == 'food'" width="100px">ใบอนุญาต</th>
                <th>
                  <span v-show="props.business_type == 'clinic'">ลักษณะสถานพยาบาล</span>
                  <span v-show="props.business_type != 'clinic'">ประเภท</span>
                </th>
                <th>อำเภอ</th>
                <th v-show="isLoggedIn" width="100px">จัดการ</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(business, index) in paginatedBusinesses" :key="business.id">
                <td>{{ business.name }}</td>
                <td v-show="props.business_type == 'food'">
                  {{ business.license }}
                </td>
                <td>{{ business.type }}</td>
                <td>{{ business.district }}</td>
                <td v-show="isLoggedIn">
                  <button
                    class="btn btn-ghost btn-xs"
                    @click="
                      dialogBusiness = true;
                      action = 'edit';
                      id = business.id;
                    "
                  >
                    <Icon name="mdi:pencil" size="20" class="text-blue-500" />
                  </button>
                  <button class="btn btn-ghost btn-xs" @click="deleteBusiness(business.id)">
                    <Icon name="mdi:delete" size="20" class="text-red-500" />
                  </button>
                </td>
              </tr>

              <tr v-show="businesses.length === 0">
                <td colspan="4" class="text-center">ไม่พบข้อมูล</td>
              </tr>
            </tbody>
            <tfoot>
              <tr></tr>
            </tfoot>
          </table>

          <div class="card-actions justify-end">
            <div class="join flex justify-center mt-4">
              <button class="join-item btn btn-sm" :disabled="currentPage === 1" @click="currentPage--">«</button>
              <button class="join-item btn btn-sm">หน้า {{ currentPage }} จาก {{ totalPages }}</button>
              <button class="join-item btn btn-sm" :disabled="currentPage === totalPages" @click="currentPage++">
                »
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <ModalBusiness
      :dialog="dialogBusiness"
      :id="id"
      :action="action"
      :business_type="props.business_type"
      @close="dialogBusiness = false"
      @success="fetchBusinesses"
    />

    <!-- Right Section (5/12) -->
    <div class="w-full lg:w-5/12 p-4">
      <div class="card bg-base-100 border border-gray-200">
        <div class="card-body">
          <h2 class="card-title text-2xl mb-4">เอกสารคำขอเปิดสถานประกอบการ</h2>
          <div v-show="isLoggedIn">
            <client-only>
              <ckeditor v-if="loadClassicEditor" class="mt-3" v-model="editorData" :editor="ClassicEditor" />
            </client-only>
          </div>

          <button
            v-show="isLoggedIn"
            :disabled="loading"
            class="mb-3 btn btn-primary disabled:bg-primary disabled:text-white disabled:opacity-50 disabled:cursor-not-allowed text-white mt-4"
            @click="handleSubmit"
          >
            <span v-if="loading" class="loading loading-spinner"></span>
            <span>บันทึก</span>
          </button>
          <div v-html="editorData"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  business_type: String,
  title: String,
});
const isLoggedIn = useState("isLoggedIn");
const loadClassicEditor = ref(false);
const editorData = ref("");
let ClassicEditor;

const supabase = useNuxtApp().$supabase;
const { $toast } = useNuxtApp();

let user;
const businesses = ref([]);
const fetchBusinesses = async () => {
  try {
    const { data, error } = await supabase
      .from("businesses")
      .select()
      .eq("business_type", props.business_type)
      .order("id", {
        ascending: true,
      });
    if (error) {
      console.error("Error fetching businesses:", error);
      $toast.error("ไม่สามารถดึงข้อมูลได้");
    } else {
      businesses.value = data;
      console.log(data);
    }
  } catch (error) {
    console.error("Error fetching businesses:", error);
    $toast.error("ไม่สามารถดึงข้อมูลได้");
  }
};

onMounted(async () => {
  ClassicEditor = (await import("@ckeditor/ckeditor5-build-classic")).default;
  loadClassicEditor.value = true;

  user = JSON.parse(localStorage.getItem("user"));
  getForm();
  fetchBusinesses();

  // Function to add target="_blank" to all links
  const addTargetBlank = () => {
    const links = document.querySelectorAll(".card-body a, [v-html] a");
    links.forEach((link) => {
      if (!link.hasAttribute("target")) {
        link.setAttribute("target", "_blank");
      }
    });
  };

  // Add target="_blank" to initial links
  addTargetBlank();

  // Create MutationObserver to watch for dynamically added links
  const observer = new MutationObserver(addTargetBlank);
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
});

// Watch for changes in editorData
watch(editorData, () => {
  nextTick(() => {
    const links = document.querySelectorAll("[v-html] a");
    links.forEach((link) => {
      if (!link.hasAttribute("target")) {
        link.setAttribute("target", "_blank");
      }
    });
  });
});

// get form
const form_id = ref(null);
const loading = ref(false);
const getForm = async () => {
  loading.value = true;
  const { data, error } = await supabase.from("forms").select().eq("type", props.business_type);
  if (error) {
    console.error("Error fetching form:", error);
    $toast.error("ไม่สามารถดึงข้อมูลได้");
  } else if (data.length > 0) {
    editorData.value = data[0].content;
    form_id.value = data[0].id;
  }
  loading.value = false;
};

// Add form submission handler
const handleSubmit = async () => {
  loading.value = true;
  try {
    if (form_id.value) {
      const { data, error } = await supabase
        .from("forms")
        .update({ content: editorData.value })
        .eq("id", form_id.value);
      if (error) {
        console.error("Error updating form:", error);
        $toast.error("ไม่สามารถบันทึกได้");
        return;
      }
    } else {
      const { data, error } = await supabase
        .from("forms")
        .insert({ type: props.business_type, content: editorData.value })
        .select("id")
        .single();
      if (error) {
        console.error("Error inserting form:", error);
        $toast.error("ไม่สามารถบันทึกได้");
        return;
      }
      form_id.value = data.id;
    }

    if (error) {
      console.error("Error saving form:", error);
      $toast.error("ไม่สามารถบันทึกได้");
      return;
    }
  } catch (error) {
    console.error("Error saving form:", error);
  }
  $toast.success("บันทึกสำเร็จ");
  loading.value = false;
};

const id = ref(0);
const dialogBusiness = ref(false);
const action = ref("");

// delete business confirm dialog
const deleteBusiness = async (id) => {
  const confirmDelete = confirm("คุณต้องการลบสถานประกอบการนี้หรือไม่?");
  if (confirmDelete) {
    try {
      console.log(id);
      const { error } = await supabase.from("businesses").delete().eq("id", id);
      if (error) {
        console.error("Error deleting business:", error);
        $toast.error("ไม่สามารถลบสถานประกอบการได้");
      } else {
        $toast.success("ลบสถานประกอบการสําเร็จ");
        fetchBusinesses();
      }
    } catch (error) {
      console.error("Error deleting business:", error);
      $toast.error("ไม่สามารถลบสถานประกอบการได้");
    }
  }
};

// Add these pagination-related refs after the existing refs
const currentPage = ref(1);
const itemsPerPage = ref(10); // Adjust this number as needed

// Add computed properties for pagination
const totalPages = computed(() => (businesses.value ? Math.ceil(businesses.value.length / itemsPerPage.value) : 0));
const paginatedBusinesses = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return businesses.value.slice(start, end);
});
</script>

<style scoped>
:deep(a) {
  color: blue !important;
  /* text-decoration: underline; */
}
:deep(li) {
  list-style-type: disc !important;
  margin-left: 1.5rem;
}
</style>
