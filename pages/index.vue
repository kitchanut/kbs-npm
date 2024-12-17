<template>
  <div>
    <!-- <div>
      <img src="/public/background.jpeg" alt="สํานักงานคณะกรรมการอาหารและยา จังหวัดนครพนม" />
    </div> -->

    <div class="bg-[#6BBD6A] min-h-[320px] w-full flex flex-col md:flex-row justify-between items-center py-8 md:py-0">
      <div class="text-center md:text-left mb-6 md:mb-0 md:w-8/12 md:ml-[110px]">
        <h1 class="text-2xl md:text-3xl font-bold text-white">กลุ่มงานคุ้มครองผู้บริโภคและเภสัชสาธารณสุข</h1>
        <p class="text-lg text-white">สำนักงานสาธารณสุขจังหวัดครพนม</p>
      </div>
      <div class="hidden md:block md:w-4/12">
        <img src="/public/cover.png" alt="cover" class="w-full h-[320px] object-cover" />
      </div>
    </div>
    <div class="container mx-auto px-4 flex flex-col lg:flex-row justify-center gap-6 -mt-12">
      <!-- Card 1: e-Queuing -->
      <div
        class="bg-blue-100 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex items-center w-full cursor-pointer border border-blue-200"
        onclick="window.open('https://docs.google.com/forms/d/e/1FAIpQLScGMzmWjtGg5zmbgDUhrd2wunnIGLK44lqZwOMdc3iSQz_OuQ/viewform', '_blank')"
      >
        <div class="w-20 md:w-24 h-20 md:h-24 flex items-center justify-center flex-shrink-0">
          <Icon name="material-symbols:calendar-month" size="36" class="text-blue-600 md:text-[48px]" />
        </div>
        <div class="p-3 md:p-4">
          <h2 class="text-lg md:text-xl font-semibold text-blue-800">จองคิวเพื่อเข้ารับบริการที่ศูนย์ OSSC</h2>
          <p class="text-blue-500">e-Queuing</p>
        </div>
      </div>

      <!-- Card 2: e-Tracking ใบอนุญาต -->
      <div
        class="bg-red-100 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex items-center w-full cursor-pointer border border-red-200"
        onclick="window.open('https://script.google.com/macros/s/AKfycbzQufi89SrOzPFpftdjEwzNB8pMdH1Igd17i-KKPWFxQnL7t9VAvOG1GV9nekqGBvdo/exec', '_blank')"
      >
        <div class="w-20 md:w-24 h-20 md:h-24 flex items-center justify-center flex-shrink-0">
          <Icon name="material-symbols:description-outline" size="36" class="text-red-600 md:text-[48px]" />
        </div>
        <div class="p-3 md:p-4">
          <h2 class="text-lg md:text-xl font-semibold text-red-800">ติดตามสถานะคำขอใบอนุญาต</h2>
          <p class="text-red-500">e-Tracking</p>
        </div>
      </div>

      <!-- Card 3: e-Tracking เรื่องร้องเรียน -->
      <div
        class="bg-orange-100 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex items-center w-full cursor-pointer border border-orange-200"
        onclick="window.open('https://script.google.com/macros/s/AKfycbwR-I4QIvtJs-Of-syIv7hFp18ODIquZAf5zLCMi-34Gw1PVq8aQmfbv5OuY5gl08g/exec?fbclid=IwZXh0bgNhZW0CMTAAAR1qa7vrQ81W4WdwrQHq4-2U4lhuBeZdGIpsWTQWO9Ge4gdWfH58GsolA4E_aem_AQLxPQUUYkzOSl-rTs47BlRfd8PVGGn0hAunKaHvqpZo7GjmCATcKq', '_blank')"
      >
        <div class="w-20 md:w-24 h-20 md:h-24 flex items-center justify-center flex-shrink-0">
          <Icon name="material-symbols:comment-outline" size="36" class="text-orange-600 md:text-[48px]" />
        </div>
        <div class="p-3 md:p-4">
          <h2 class="text-lg md:text-xl font-semibold text-orange-800">ติดตามสถานะเรื่องร้องเรียน</h2>
          <p class="text-orange-500">e-Tracking</p>
        </div>
      </div>

      <!-- Card 4: Line Official -->
      <div
        class="bg-green-100 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex items-center w-full cursor-pointer border border-green-200"
        onclick="window.open('https://line.me/ti/p/@fda_nkp', '_blank')"
      >
        <div class="w-20 md:w-24 h-20 md:h-24 flex items-center justify-center flex-shrink-0">
          <Icon name="ic:baseline-qr-code-2" size="36" class="text-green-600 md:text-[48px]" />
        </div>
        <div class="p-3 md:p-4">
          <h2 class="text-lg md:text-xl font-semibold text-green-800">ติดต่อเจ้าหน้าที่ผ่าน Line Official</h2>
          <p class="text-green-500">e-Consult</p>
        </div>
      </div>
    </div>
    <div class="bg-base-100 py-8 md:py-12 z-100">
      <div class="w-11/12 md:w-4/5 mx-auto flex flex-col md:flex-row items-center gap-6 md:gap-0">
        <img src="/public/logo.png" alt="Placeholder Image" class="h-16 w-16 md:h-20 md:w-20" />
        <div class="flex-1 text-center md:text-left md:ml-8">
          <h2 class="text-xl md:text-2xl font-bold">One Stop Service Center (OSSC)</h2>
          <p class="text-gray-500">สำนักงานสาธารณสุขจังหวัดครพนม</p>
        </div>
        <div class="flex flex-col md:flex-row gap-4 md:gap-6">
          <a href="tel:042-515766" class="btn btn-tonal gap-2 transition-colors duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
              <path
                fill-rule="evenodd"
                d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="font-medium">042-515766</span>
          </a>

          <a
            href="https://line.me/ti/p/@fda_nkp"
            target="_blank"
            class="btn bg-[#00B900]/10 hover:bg-[#00B900]/20 text-[#00B900] gap-2 border border-[#00B900]/20 hover:border-[#00B900]/30 transition-colors duration-300"
          >
            <img src="/public/line-ar21.svg" alt="Line" class="w-16 -ml-4" />
            <span class="font-medium -ml-4">@fda_nkp</span>
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=100067332217864"
            target="_blank"
            class="btn bg-[#3b5998] hover:bg-[#3b5998]/90 text-white gap-2"
          >
            <Icon name="ic:baseline-facebook" size="24" class="text-white" />
            <span class="font-medium">ศูนย์บริการเบ็ดเสร็จ สสจ.นครพนม</span>
          </a>
        </div>
      </div>
    </div>

    <!-- Section: สำหรับประชาชน -->
    <!-- <PublicSection /> -->

    <!-- Section: สำหรับผู้ประกอบการ -->
    <BusinessSection />

    <!-- Section: วิธีการใช้งาน -->
    <DatabaseSection />
  </div>
</template>

<script>
export default {
  name: "IndexPage",
};
</script>

<style scoped>
/* Add any additional styles here */
.bg-custom {
  background-color: #f9f7f5;
}
</style>
