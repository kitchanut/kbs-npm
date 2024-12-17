<template>
  <section style="background-image: url('/pattern2.png')">
    <div class="container mx-auto px-4 py-16">
      <h2 class="text-3xl font-bold text-center mb-8">สำหรับผู้ประกอบการ</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- ยา -->
        <div
          class="card bg-base-100 shadow-xl hover:shadow-2xl transition-transform transform hover:scale-105 duration-300 rounded-lg overflow-hidden cursor-pointer"
          @click="navigateTo('/business/pharmacy')"
        >
          <div class="card-body items-center text-center">
            <Icon name="medical-icon:i-pharmacy" size="48" class="text-emerald-600 mb-2" />
            <h3 class="card-title">ยา</h3>
            <p class="text-gray-600">ข้อมูลเกี่ยวกับการขออนุญาตผลิตภัณฑ์ยา</p>
          </div>
        </div>

        <!-- อาหาร -->
        <div
          class="card bg-base-100 shadow-xl hover:shadow-2xl transition-transform transform hover:scale-105 duration-300 rounded-lg overflow-hidden cursor-pointer"
          @click="navigateTo('/business/food')"
        >
          <div class="card-body items-center text-center">
            <Icon name="mdi:food-apple" size="48" class="text-red-600 mb-2" />
            <h3 class="card-title">อาหาร</h3>
            <p class="text-gray-600">ข้อมูลเกี่ยวกับการขออนุญาตผลิตภัณฑ์อาหาร</p>
          </div>
        </div>

        <!-- สถานพยาบาล -->
        <div
          class="card bg-base-100 shadow-xl hover:shadow-2xl transition-transform transform hover:scale-105 duration-300 rounded-lg overflow-hidden cursor-pointer"
          @click="navigateTo('/business/clinic')"
        >
          <div class="card-body items-center text-center">
            <Icon name="material-symbols:local-hospital" size="48" class="text-blue-600 mb-2" />
            <h3 class="card-title">สถานพยาบาล</h3>
            <p class="text-gray-600">ข้อมูลเกี่ยวกับการขออนุญาตสถานพยาบาล</p>
          </div>
        </div>

        <!-- เครื่องมือแพทย์ -->
        <div
          class="card bg-base-100 shadow-xl hover:shadow-2xl transition-transform transform hover:scale-105 duration-300 rounded-lg overflow-hidden cursor-pointer"
          @click="navigateTo('/business/equipment')"
        >
          <div class="card-body items-center text-center">
            <Icon name="mdi:medical-bag" size="48" class="text-amber-600 mb-2" />
            <h3 class="card-title">เครื่องมือแพทย์</h3>
            <p class="text-gray-600">ข้อมูลเกี่ยวกับการขออนุญาตเครื่องมือแพทย์</p>
          </div>
        </div>

        <!-- เครื่องสำอาง -->
        <div
          class="card bg-base-100 shadow-xl hover:shadow-2xl transition-transform transform hover:scale-105 duration-300 rounded-lg overflow-hidden cursor-pointer"
          @click="navigateTo('/business/cosmetics')"
        >
          <div class="card-body items-center text-center">
            <Icon name="mdi:lipstick" size="48" class="text-pink-600 mb-2" />
            <h3 class="card-title">เครื่องสำอาง</h3>
            <p class="text-gray-600">ข้อมูลเกี่ยวกับการขออนุญาตเครื่องสำอาง</p>
          </div>
        </div>

        <!-- สถานประกอบการเพื่อสุขภาพ -->
        <div
          class="card bg-base-100 shadow-xl hover:shadow-2xl transition-transform transform hover:scale-105 duration-300 rounded-lg overflow-hidden cursor-pointer"
          @click="navigateTo('/business/health')"
        >
          <div class="card-body items-center text-center">
            <Icon name="mdi:spa" size="48" class="text-teal-600 mb-2" />
            <h3 class="card-title">สถานประกอบการเพื่อสุขภาพ</h3>
            <p class="text-gray-600">ข้อมูลเกี่ยวกับการขออนุญาตสถานประกอบการ</p>
          </div>
        </div>

        <!-- วัตถุอันตราย -->
        <div
          class="card bg-base-100 shadow-xl hover:shadow-2xl transition-transform transform hover:scale-105 duration-300 rounded-lg overflow-hidden cursor-pointer"
          @click="navigateTo('/business/hazardous')"
        >
          <div class="card-body items-center text-center">
            <Icon name="material-symbols:warning" size="48" class="text-yellow-600 mb-2" />
            <h3 class="card-title">วัตถุอันตราย</h3>
            <p class="text-gray-600">ข้อมูลเกี่ยวกับการขออนุญาตวัตถุอันตราย</p>
          </div>
        </div>

        <!-- ผลิตภัณฑ์สมุนไพร -->
        <div
          class="card bg-base-100 shadow-xl hover:shadow-2xl transition-transform transform hover:scale-105 duration-300 rounded-lg overflow-hidden cursor-pointer"
          @click="navigateTo('/business/herbal')"
        >
          <div class="card-body items-center text-center">
            <Icon name="game-icons:herbs-bundle" size="48" class="text-green-600 mb-2" />
            <h3 class="card-title">ผลิตภัณฑ์สมุนไพร</h3>
            <p class="text-gray-600">ข้อมูลเกี่ยวกับการขออนุญาตผลิตภัณฑ์สมุนไพร</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "BusinessSection",
};
</script>
