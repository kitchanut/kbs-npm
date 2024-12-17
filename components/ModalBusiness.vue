<template>
  <dialog id="modal_business" class="modal">
    <div class="modal-box">
      <h3 class="text-lg font-bold">{{ action === "create" ? "เพิ่มสถานประกอบการ" : "แก้ไขสถานประกอบการ" }}</h3>

      <form @submit.prevent="handleSubmit" class="space-y-1 py-4">
        <div class="form-control">
          <label class="label">ชื่อสถานประกอบการ</label>
          <input v-model="form.name" type="text" class="input input-bordered" required />
        </div>

        <div v-if="props.business_type === 'food'" class="form-control">
          <label class="label">ใบอนุญาต</label>
          <input v-model="form.license" type="text" class="input input-bordered" required />
        </div>

        <div v-if="props.business_type === 'pharmacy'" class="form-control">
          <label class="label">ประเภท</label>
          <select v-model="form.type" class="select select-bordered" required>
            <option value="ขย.1">ขย.1</option>
            <option value="ขย.2">ขย.2</option>
            <option value="ขย.3">ขย.3</option>
          </select>
        </div>

        <div v-if="props.business_type === 'clinic'" class="form-control">
          <label class="label">ลักษณะสถานพยาบาล</label>
          <input v-model="form.type" type="text" class="input input-bordered" required />
        </div>

        <div v-else class="form-control">
          <label class="label">ประเภท</label>
          <input v-model="form.type" type="text" class="input input-bordered" required />
        </div>

        <div class="form-control">
          <label class="label">อำเภอ</label>
          <select v-model="form.district" class="select select-bordered" required>
            <option value="เมืองนครพนม">เมืองนครพนม</option>
            <option value="ท่าอุเทน">ท่าอุเทน</option>
            <option value="นาแก">นาแก</option>
            <option value="นาทม">นาทม</option>
            <option value="นาหว้า">นาหว้า</option>
            <option value="ธาตุพนม">ธาตุพนม</option>
            <option value="บ้านแพง">บ้านแพง</option>
            <option value="ปลาปาก">ปลาปาก</option>
            <option value="โพนสวรรค์">โพนสวรรค์</option>
            <option value="เรณูนคร">เรณูนคร</option>
            <option value="วังยาง">วังยาง</option>
            <option value="ศรีสงคราม">ศรีสงคราม</option>
          </select>
        </div>

        <div class="form-control">
          <label class="label">พิกัด (ละติจูด, ลองจิจูด)</label>
          <div class="flex gap-2">
            <input
              v-model.number="form.lat"
              type="number"
              step="any"
              class="input input-bordered w-1/2"
              placeholder="ละติจูด"
            />
            <input
              v-model.number="form.lng"
              type="number"
              step="any"
              class="input input-bordered w-1/2"
              placeholder="ลองจิจูด"
            />
          </div>
        </div>

        <div class="modal-action pt-8">
          <button type="button" class="btn" @click="closeModal">ยกเลิก</button>
          <button type="submit" class="btn btn-primary text-white" :disabled="loading">
            <span v-if="loading" class="loading loading-spinner"></span>
            <span>บันทึก</span>
          </button>
        </div>
      </form>
    </div>
  </dialog>
</template>

<script setup>
const props = defineProps({
  dialog: Boolean,
  id: Number,
  action: String,
  business_type: String,
});
const supabase = useNuxtApp().$supabase;
const { $toast } = useNuxtApp();
const emit = defineEmits(["close", "success"]);
const loading = ref(false);
const form = ref({
  name: "",
  business_type: props.business_type,
  type: "",
  license: "",
  district: "",
  lat: null,
  lng: null,
});

const handleSubmit = async () => {
  loading.value = true;
  try {
    if (props.action === "create") {
      form.value.business_type = props.business_type;
      const { data, error } = await supabase.from("businesses").insert(form.value, {
        returning: "representation",
        upsert: true,
      });
      if (error) {
        console.error("Failed to create business:", error);
        $toast.error("ไม่สามารถสร้างสถานประกอบการได้");
      } else {
        $toast.success("สถานประกอบการถูกบันทึกเรียบร้อย");
      }
    } else {
      const { data, error } = await supabase.from("businesses").update(form.value).eq("id", props.id).single();
      if (error) {
        console.error("Failed to update business:", error);
        $toast.error("ไม่สามารถแก้ไขสถานประกอบการได้");
      } else {
        $toast.success("สถานประกอบการถูกแก้ไขเรียบร้อย");
      }
    }

    emit("success");
    closeModal();
  } catch (error) {
    console.error("Failed to submit business:", error);
    $toast.error("เกิดข้อผิดพลาดในการบันทึกสถานประกอบการ");
  } finally {
    loading.value = false;
  }
};

const closeModal = () => {
  document.getElementById("modal_business").close();
};

onMounted(() => {
  const modal = document.getElementById("modal_business");
  modal.addEventListener("close", () => {
    emit("close");
  });
});

watch(
  () => props.dialog,
  async (newVal) => {
    if (newVal) {
      form.value = {};
      document.getElementById("modal_business").showModal();
      if (props.action === "edit") {
        loading.value = true;
        const { data, error } = await supabase.from("businesses").select().eq("id", props.id).single();
        if (error) {
          console.error("Failed to fetch business:", error);
          $toast.error("ไม่สามารถดึงข้อมูลสถานประกอบการได้");
        } else {
          form.value = data;
        }
        loading.value = false;
      }
    } else {
      document.getElementById("modal_business").close();
    }
  }
);
</script>
