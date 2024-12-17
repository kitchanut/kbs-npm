<template>
  <section class="bg-gradient-reverse-primary">
    <div class="flex flex-wrap">
      <!-- ขั้นตอนการขออนุญาต -->
      <div class="xl:w-4/12 lg:w-4/12 w-full bg-base-100 flex justify-center items-center">
        <div class="flex flex-col items-center">
          <img src="@/assets/images/database.png" alt="Database Icon" class="w-[400px] mb-4" />
          <h2 class="text-2xl font-bold text-center text-gray-700">ฐานข้อมูลที่ใช้บ่อย</h2>
        </div>
      </div>

      <div class="xl:w-8/12 lg:w-8/12 w-full bg-base-100 flex justify-center items-center">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 p-4 md:p-8 lg:p-16 w-full">
          <!-- ฐานข้อมูลสถานประกอบการ -->
          <div
            class="card border border-gray-200 bg-base-100 transition-transform transform hover:scale-105 duration-300 rounded-lg overflow-hidden cursor-pointer"
            onclick="window.open('https://lookerstudio.google.com/u/0/reporting/258d34e4-4dd9-41f8-9a0e-755a2ed5bf6e/page/sb9wD', '_blank')"
          >
            <div class="flex justify-start">
              <figure class="p-4 flex justify-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-16 h-16 text-primary"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                  />
                </svg>
              </figure>
              <div class="card-body pl-0">
                <h3 class="card-title text-lg">สืบค้นสถานประกอบการที่ได้รับอนุญาต</h3>
                <p class="text-gray-600">จาก อย.นครพนม</p>
              </div>
            </div>
          </div>

          <!-- ฐานข้อมูลแพทย์ -->
          <div
            class="card border border-gray-200 bg-base-100transition-transform transform hover:scale-105 duration-300 rounded-lg overflow-hidden cursor-pointer"
            onclick="window.open('https://checkmd.tmc.or.th/', '_blank')"
          >
            <div class="flex justify-start">
              <figure class="p-4 flex justify-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-16 h-16 text-primary"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </figure>
              <div class="card-body pl-0">
                <h3 class="card-title text-lg">สืบค้นรายชื่อแพทย์</h3>
                <p class="text-gray-600">ฐานข้อมูลแพทยสภา</p>
              </div>
            </div>
          </div>

          <!-- Digital ID -->
          <div
            class="card border border-gray-200 bg-base-100transition-transform transform hover:scale-105 duration-300 rounded-lg overflow-hidden cursor-pointer"
            onclick="window.open('https://accounts.egov.go.th/', '_blank')"
          >
            <div class="flex justify-start">
              <figure class="p-4 flex justify-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-16 h-16 text-primary"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                  />
                </svg>
              </figure>
              <div class="card-body pl-0">
                <h3 class="card-title text-lg">ระบบพิสูจน์และยืนยันตัวตนทางดิจิทัล</h3>
                <p class="text-gray-600">เพื่อใช้งานระบบ e-submission</p>
              </div>
            </div>
          </div>

          <!-- ข้อมูลการอนุญาต -->
          <div
            class="card border border-gray-200 bg-base-100transition-transform transform hover:scale-105 duration-300 rounded-lg overflow-hidden cursor-pointer"
            onclick="window.open('https://www.fda.moph.go.th/?op=kwssl&lang=1&skin=s&db=Main&ww=', '_blank')"
          >
            <div class="flex justify-start">
              <figure class="p-4 flex justify-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-16 h-16 text-primary"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                  />
                </svg>
              </figure>
              <div class="card-body pl-0">
                <h3 class="card-title text-lg">สืบค้นข้อมูลการอนุญาต</h3>
                <p class="text-gray-600">จาก อย. กระทรวงสาธารณสุข</p>
              </div>
            </div>
          </div>

          <!-- ข้อมูลเภสัชกร -->
          <div
            class="card border border-gray-200 bg-base-100transition-transform transform hover:scale-105 duration-300 rounded-lg overflow-hidden cursor-pointer"
            onclick="window.open('https://www.pharmacycouncil.org/index.php?option=com_pharmacist_list', '_blank')"
          >
            <div class="flex justify-start">
              <figure class="p-4 flex justify-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-16 h-16 text-primary"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                  />
                </svg>
              </figure>
              <div class="card-body pl-0">
                <h3 class="card-title text-lg">สืบค้นรายชื่อเภสัชกร</h3>
                <p class="text-gray-600">ฐานข้อมูลสภาเภสัชกรรม</p>
              </div>
            </div>
          </div>

          <!-- คู่มือ Open ID -->
          <div
            class="card border border-gray-200 bg-base-100transition-transform transform hover:scale-105 duration-300 rounded-lg overflow-hidden cursor-pointer"
            onclick="window.open('https://drive.google.com/file/d/1YmpWbCATsoUVzFQOu4QX0Rk_zgqnjZsT/view', '_blank')"
          >
            <div class="flex justify-start">
              <figure class="p-4 flex justify-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-16 h-16 text-primary"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                  />
                </svg>
              </figure>
              <div class="card-body pl-0">
                <h3 class="card-title text-lg">คู่มือการลงทะเบียน Open ID</h3>
                <p class="text-gray-600">สำหรับเข้าใช้งานระบบยืนยันตัวตนทางดิจิทัล</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
