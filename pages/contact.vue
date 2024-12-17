<template>
  <div style="background-image: url('/pattern2.png')">
    <div class="container mx-auto px-4 py-16">
      <!-- Animated Header -->
      <h1 class="text-4xl font-bold text-center mb-16">
        <span class="bg-clip-text"> ติดต่อเรา </span>
      </h1>

      <div class="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        <!-- QR Code Section -->
        <div
          class="bg-white rounded-xl p-8 transform hover:scale-105 transition-transform duration-300 border border-gray-200"
        >
          <div class="flex flex-col items-center">
            <img src="/qrLineOA.png" alt="Line QR Code" class="w-56 h-56 mb-4 hover:opacity-90 transition-opacity" />
            <p class="text-lg font-medium text-gray-700"><span class="text-green-600">Line Official:</span> @fda_nkp</p>
          </div>
        </div>

        <!-- Contact Information -->
        <div
          class="bg-white/95 backdrop-blur-sm rounded-xl p-8 transform hover:scale-105 transition-transform duration-300 text-center border border-gray-200"
        >
          <h2 class="text-2xl font-semibold text-gray-800 mb-2">กลุ่มงานคุ้มครองผู้บริโภคและเภสัชสาธารณสุข</h2>
          <h3 class="text-lg text-gray-600 mb-16">สำนักงานสาธารณสุขจังหวัดนครพนม</h3>

          <div class="space-y-2 text-gray-700">
            <div class="flex items-center gap-3">
              <i class="fas fa-map-marker-alt text-blue-600"></i>
              <p>เลขที่ 356 ถ.ศูนย์ราชการ ต.ในเมือง อ.เมือง จ.นครพนม 48000</p>
            </div>
            <div class="flex items-center gap-3">
              <i class="fas fa-phone text-blue-600"></i>
              <p>โทร: 042-515766</p>
            </div>
            <div class="flex items-center gap-3">
              <i class="fas fa-fax text-blue-600"></i>
              <p>โทรสาร: 042-515766</p>
            </div>
            <div class="flex items-center gap-3">
              <i class="fas fa-envelope text-blue-600"></i>
              <p>อีเมล: fdapv48@fda.moph.go.th</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Google Map -->
      <div class="mt-16 max-w-6xl mx-auto">
        <div
          class="bg-white rounded-xl p-2 transform hover:scale-[1.02] transition-transform duration-300 border border-gray-200"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4124.307138932243!2d104.7776097755032!3d17.40925628348165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313c09399f15c9d5%3A0x2c9269136196a798!2z4Liq4Liz4LiZ4Lix4LiB4LiH4Liy4LiZ4Liq4Liy4LiY4Liy4Lij4LiT4Liq4Li44LiC4LiI4Lix4LiH4Lir4Lin4Lix4LiU4LiZ4LiE4Lij4Lie4LiZ4Lih!5e1!3m2!1sth!2sth!4v1734423831352!5m2!1sth!2sth"
            width="100%"
            height="600"
            style="border: 0"
            allowfullscreen
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
