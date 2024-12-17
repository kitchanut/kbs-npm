<template>
  <section class="bg-base-100">
    <div class="container mx-auto px-4 pt-16 pb-8">
      <div class="flex flex-wrap gap-6 justify-center lg:justify-between">
        <!-- Card 1: e-Queuing -->
        <div
          class="bg-blue-100 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex items-center w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] cursor-pointer border border-blue-200"
          onclick="window.open('https://docs.google.com/forms/d/e/1FAIpQLScGMzmWjtGg5zmbgDUhrd2wunnIGLK44lqZwOMdc3iSQz_OuQ/viewform', '_blank')"
        >
          <div class="w-24 h-24 flex items-center justify-center flex-shrink-0">
            <Icon name="material-symbols:calendar-month" size="48" class="text-blue-600" />
          </div>
          <div class="p-4">
            <h2 class="text-xl font-semibold text-blue-800">จองคิวเพื่อเข้ารับบริการที่ศูนย์ OSSC</h2>
            <p class="text-blue-500">e-Queuing</p>
          </div>
        </div>

        <!-- Card 2: e-Tracking ใบอนุญาต -->
        <div
          class="bg-red-100 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex items-center w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] cursor-pointer border border-red-200"
          onclick="window.open('https://script.google.com/macros/s/AKfycbzQufi89SrOzPFpftdjEwzNB8pMdH1Igd17i-KKPWFxQnL7t9VAvOG1GV9nekqGBvdo/exec', '_blank')"
        >
          <div class="w-24 h-24 flex items-center justify-center flex-shrink-0">
            <Icon name="material-symbols:description-outline" size="48" class="text-red-600" />
          </div>
          <div class="p-4">
            <h2 class="text-xl font-semibold text-red-800">ติดตามสถานะคำขอใบอนุญาต</h2>
            <p class="text-red-500">e-Tracking</p>
          </div>
        </div>

        <!-- Card 3: e-Tracking เรื่องร้องเรียน -->
        <div
          class="bg-orange-100 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex items-center w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] cursor-pointer border border-orange-200"
          onclick="window.open('https://script.google.com/macros/s/AKfycbwR-I4QIvtJs-Of-syIv7hFp18ODIquZAf5zLCMi-34Gw1PVq8aQmfbv5OuY5gl08g/exec?fbclid=IwZXh0bgNhZW0CMTAAAR1qa7vrQ81W4WdwrQHq4-2U4lhuBeZdGIpsWTQWO9Ge4gdWfH58GsolA4E_aem_AQLxPQUUYkzOSl-rTs47BlRfd8PVGGn0hAunKaHvqpZo7GjmCATcKq', '_blank')"
        >
          <div class="w-24 h-24 flex items-center justify-center flex-shrink-0">
            <Icon name="material-symbols:comment-outline" size="48" class="text-orange-600" />
          </div>
          <div class="p-4">
            <h2 class="text-xl font-semibold text-orange-800">ติดตามสถานะเรื่องร้องเรียน</h2>
            <p class="text-orange-500">e-Tracking</p>
          </div>
        </div>

        <!-- Card 4: Line Official -->
        <div
          class="bg-green-100 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex items-center w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] cursor-pointer border border-green-200"
        >
          <div class="w-24 h-24 flex items-center justify-center flex-shrink-0">
            <Icon name="ic:baseline-qr-code-2" size="48" class="text-green-600" />
          </div>
          <div class="p-4">
            <h2 class="text-xl font-semibold text-green-800">ติดต่อเจ้าหน้าที่ผ่าน Line Official</h2>
            <p class="text-green-500">e-Consult</p>
          </div>
        </div>
      </div>
      <div class="flex justify-end mt-8 mr-2">
        <a
          class="text-lg text-error hover:scale-105 transition-transform duration-300"
          href="https://npmpho.moph.go.th/kbs_complaints/"
          target="_blank"
        >
          ผู้บริโภคร้องเรียน คลิกที่นี่ !!
        </a>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "PublicSection",
};
</script>
