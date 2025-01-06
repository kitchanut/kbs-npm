<template>
  <section style="background-image: url('/pattern2.png')">
    <div class="container mx-auto px-4 py-16">
      <h2 class="text-3xl font-bold text-center mb-8">จำนวนสถานประกอบการ</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- ยา -->
        <div
          class="card bg-base-100 shadow-xl hover:shadow-2xl transition-transform transform hover:scale-105 duration-300 rounded-lg overflow-hidden cursor-pointer"
          @click="navigateTo('/business/pharmacy')"
        >
          <div class="card-body items-center text-center">
            <Icon name="medical-icon:i-pharmacy" size="48" class="text-emerald-600 mb-2" />
            <h3 class="card-title mb-2">ยา</h3>
            <div class="flex flex-col items-center">
              <span class="text-3xl font-bold text-emerald-600">{{ counts.pharmacy }}</span>
              <span class="text-gray-500 text-sm">แห่ง</span>
            </div>
          </div>
        </div>

        <!-- อาหาร -->
        <div
          class="card bg-base-100 shadow-xl hover:shadow-2xl transition-transform transform hover:scale-105 duration-300 rounded-lg overflow-hidden cursor-pointer"
          @click="navigateTo('/business/food')"
        >
          <div class="card-body items-center text-center">
            <Icon name="mdi:food-apple" size="48" class="text-red-600 mb-2" />
            <h3 class="card-title mb-2">อาหาร</h3>
            <div class="flex flex-col items-center">
              <span class="text-3xl font-bold text-red-600">{{ counts.food }}</span>
              <span class="text-gray-500 text-sm">แห่ง</span>
            </div>
          </div>
        </div>

        <!-- สถานพยาบาล -->
        <div
          class="card bg-base-100 shadow-xl hover:shadow-2xl transition-transform transform hover:scale-105 duration-300 rounded-lg overflow-hidden cursor-pointer"
          @click="navigateTo('/business/clinic')"
        >
          <div class="card-body items-center text-center">
            <Icon name="material-symbols:local-hospital" size="48" class="text-blue-600 mb-2" />
            <h3 class="card-title mb-2">สถานพยาบาล</h3>
            <div class="flex flex-col items-center">
              <span class="text-3xl font-bold text-blue-600">{{ counts.clinic }}</span>
              <span class="text-gray-500 text-sm">แห่ง</span>
            </div>
          </div>
        </div>

        <!-- เครื่องมือแพทย์ -->
        <div
          class="card bg-base-100 shadow-xl hover:shadow-2xl transition-transform transform hover:scale-105 duration-300 rounded-lg overflow-hidden cursor-pointer"
          @click="navigateTo('/business/equipment')"
        >
          <div class="card-body items-center text-center">
            <Icon name="mdi:medical-bag" size="48" class="text-amber-600 mb-2" />
            <h3 class="card-title mb-2">เครื่องมือแพทย์</h3>
            <div class="flex flex-col items-center">
              <span class="text-3xl font-bold text-amber-600">{{ counts.equipment }}</span>
              <span class="text-gray-500 text-sm">แห่ง</span>
            </div>
          </div>
        </div>

        <!-- เครื่องสำอาง -->
        <div
          class="card bg-base-100 shadow-xl hover:shadow-2xl transition-transform transform hover:scale-105 duration-300 rounded-lg overflow-hidden cursor-pointer"
          @click="navigateTo('/business/cosmetics')"
        >
          <div class="card-body items-center text-center">
            <Icon name="mdi:lipstick" size="48" class="text-pink-600 mb-2" />
            <h3 class="card-title mb-2">เครื่องสำอาง</h3>
            <div class="flex flex-col items-center">
              <span class="text-3xl font-bold text-pink-600">{{ counts.cosmetics }}</span>
              <span class="text-gray-500 text-sm">แห่ง</span>
            </div>
          </div>
        </div>

        <!-- สถานประกอบการเพื่อสุขภาพ -->
        <div
          class="card bg-base-100 shadow-xl hover:shadow-2xl transition-transform transform hover:scale-105 duration-300 rounded-lg overflow-hidden cursor-pointer"
          @click="navigateTo('/business/health')"
        >
          <div class="card-body items-center text-center">
            <Icon name="mdi:spa" size="48" class="text-teal-600 mb-2" />
            <h3 class="card-title mb-2">สถานประกอบการเพื่อสุขภาพ</h3>
            <div class="flex flex-col items-center">
              <span class="text-3xl font-bold text-teal-600">{{ counts.health }}</span>
              <span class="text-gray-500 text-sm">แห่ง</span>
            </div>
          </div>
        </div>

        <!-- วัตถุอันตราย -->
        <div
          class="card bg-base-100 shadow-xl hover:shadow-2xl transition-transform transform hover:scale-105 duration-300 rounded-lg overflow-hidden cursor-pointer"
          @click="navigateTo('/business/hazardous')"
        >
          <div class="card-body items-center text-center">
            <Icon name="material-symbols:warning" size="48" class="text-yellow-600 mb-2" />
            <h3 class="card-title mb-2">วัตถุอันตราย</h3>
            <div class="flex flex-col items-center">
              <span class="text-3xl font-bold text-yellow-600">{{ counts.hazardous }}</span>
              <span class="text-gray-500 text-sm">แห่ง</span>
            </div>
          </div>
        </div>

        <!-- ผลิตภัณฑ์สมุนไพร -->
        <div
          class="card bg-base-100 shadow-xl hover:shadow-2xl transition-transform transform hover:scale-105 duration-300 rounded-lg overflow-hidden cursor-pointer"
          @click="navigateTo('/business/herbal')"
        >
          <div class="card-body items-center text-center">
            <Icon name="game-icons:herbs-bundle" size="48" class="text-green-600 mb-2" />
            <h3 class="card-title mb-2">ผลิตภัณฑ์สมุนไพร</h3>
            <div class="flex flex-col items-center">
              <span class="text-3xl font-bold text-green-600">{{ counts.herbal }}</span>
              <span class="text-gray-500 text-sm">แห่ง</span>
            </div>
          </div>
        </div>
        <!-- สมุนไพรควบคุม -->
        <div
          class="card bg-base-100 shadow-xl hover:shadow-2xl transition-transform transform hover:scale-105 duration-300 rounded-lg overflow-hidden cursor-pointer"
          @click="navigateTo('/business/herbal_control')"
        >
          <div class="card-body items-center text-center">
            <div
              class="rounded-full overflow-hidden border-4 border-red-600 w-16 h-16 flex items-center justify-center"
            >
              <Icon name="game-icons:herbs-bundle" size="42" class="text-red-600" style="aspect-ratio: 1" />
            </div>
            <h3 class="card-title mb-2">สมุนไพรควบคุม</h3>
            <div class="flex flex-col items-center">
              <span class="text-3xl font-bold text-red-600">{{ counts.herbal_control }}</span>
              <span class="text-gray-500 text-sm">แห่ง</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const supabase = useNuxtApp().$supabase;
const counts = ref({
  pharmacy: 0,
  food: 0,
  clinic: 0,
  equipment: 0,
  cosmetics: 0,
  health: 0,
  hazardous: 0,
  herbal: 0,
  herbal_control: 0,
});

const fetchCounts = async () => {
  const { data, error } = await supabase.from("businesses").select("*");
  if (error) {
    console.error("Error fetching counts:", error);
  } else {
    counts.value.pharmacy = data.filter((item) => item.business_type === "pharmacy").length;
    counts.value.food = data.filter((item) => item.business_type === "food").length;
    counts.value.clinic = data.filter((item) => item.business_type === "clinic").length;
    counts.value.equipment = data.filter((item) => item.business_type === "equipment").length;
    counts.value.cosmetics = data.filter((item) => item.business_type === "cosmetics").length;
    counts.value.health = data.filter((item) => item.business_type === "health").length;
    counts.value.hazardous = data.filter((item) => item.business_type === "hazardous").length;
    counts.value.herbal = data.filter((item) => item.business_type === "herbal").length;
    counts.value.herbal_control = data.filter((item) => item.business_type === "herbal_control").length;
  }
};
fetchCounts();
</script>
