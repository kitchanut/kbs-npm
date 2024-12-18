<template>
  <div>
    <div class="navbar bg-base-100 fixed top-0 left-0 right-0 z-50">
      <div class="flex-1">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar" @click="navigateTo('/')">
          <div class="w-10 rounded-full">
            <img alt="กลุ่มงานคุ้มครองผู้บริโภคและเภสัชสาธารณสุข จังหวัดนครพนม" src="/public/logo.png" />
          </div>
        </div>
        <nuxt-link to="/" class="btn btn-ghost text-xl hidden md:inline-flex"
          >กลุ่มงานคุ้มครองผู้บริโภคและเภสัชสาธารณสุข จังหวัดนครพนม</nuxt-link
        >
        <nuxt-link to="/" class="btn btn-ghost text-lg md:hidden">อย. นครพนม</nuxt-link>
      </div>

      <!-- Desktop Menu -->
      <div class="flex-none hidden md:block">
        <ul class="menu menu-horizontal px-1">
          <li>
            <nuxt-link to="/" :class="{ active: $route.path === '/' }">หน้าหลัก</nuxt-link>
          </li>
          <li>
            <details
              id="business-menu"
              @click="
                (e) => {
                  e.preventDefault();
                  const details = e.target.closest('details');
                  if (details) {
                    details.toggleAttribute('open');
                  }
                }
              "
            >
              <summary :class="{ 'bg-neutral text-white hover:text-black': $route.path.startsWith('/business') }">
                ผู้ประกอบการ
              </summary>
              <ul class="bg-base-100 rounded-t-none p-2 w-[210px]">
                <li v-for="item in businessMenuItems" :key="item.path">
                  <nuxt-link :to="item.path" :class="{ active: $route.path === item.path }">{{ item.title }}</nuxt-link>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <nuxt-link to="/organization" :class="{ active: $route.path === '/organization' }"
              >โครงสร้างองค์กร</nuxt-link
            >
          </li>
          <li>
            <nuxt-link to="/news" :class="{ active: $route.path === '/news' }">ข่าวสาร</nuxt-link>
          </li>
          <li><nuxt-link to="/faq" :class="{ active: $route.path === '/faq' }">คำถามที่พบบ่อย</nuxt-link></li>
          <li><nuxt-link to="/contact" :class="{ active: $route.path === '/contact' }">ติดต่อเรา</nuxt-link></li>
        </ul>
        <nuxt-link v-show="!isLoggedIn" to="/login" class="btn btn-sm h-[36px]">เข้าสู่ระบบ</nuxt-link>
        <nuxt-link v-show="isLoggedIn" to="/users" class="btn btn-sm h-[36px]">จัดการ</nuxt-link>
      </div>

      <!-- Mobile Menu Button -->
      <div class="flex-none md:hidden">
        <div class="drawer">
          <input id="my-drawer" type="checkbox" class="drawer-toggle" ref="drawerCheckbox" />
          <div class="drawer-content">
            <label for="my-drawer" class="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="inline-block w-5 h-5 stroke-current"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div class="drawer-side">
            <label for="my-drawer" class="drawer-overlay"></label>
            <ul class="menu p-4 w-80 h-full bg-base-100 text-base-content">
              <li @click="$refs.drawerCheckbox.checked = false">
                <nuxt-link to="/" :class="{ active: $route.path === '/' }">หน้าหลัก</nuxt-link>
              </li>
              <li>
                <details>
                  <summary>ผู้ประกอบการ</summary>
                  <ul class="bg-base-100 rounded-t-none p-2">
                    <li
                      v-for="item in businessMenuItems"
                      :key="item.path"
                      @click="$refs.drawerCheckbox.checked = false"
                    >
                      <nuxt-link :to="item.path" :class="{ active: $route.path === item.path }">{{
                        item.title
                      }}</nuxt-link>
                    </li>
                  </ul>
                </details>
              </li>
              <li @click="$refs.drawerCheckbox.checked = false">
                <nuxt-link to="/organization" :class="{ active: $route.path === '/organization' }"
                  >โครงสร้างองค์กร</nuxt-link
                >
              </li>
              <li @click="$refs.drawerCheckbox.checked = false">
                <nuxt-link to="/news" :class="{ active: $route.path === '/news' }">ข่าวสาร</nuxt-link>
              </li>
              <li @click="$refs.drawerCheckbox.checked = false">
                <nuxt-link to="/faq" :class="{ active: $route.path === '/faq' }">คำถามที่พบบ่อย</nuxt-link>
              </li>
              <li @click="$refs.drawerCheckbox.checked = false">
                <nuxt-link to="/contact" :class="{ active: $route.path === '/contact' }">ติดต่อเรา</nuxt-link>
              </li>
              <li @click="$refs.drawerCheckbox.checked = false">
                <nuxt-link v-show="!isLoggedIn" to="/login" class="btn btn-sm mt-4">เข้าสู่ระบบ</nuxt-link>
                <nuxt-link v-show="isLoggedIn" to="/users" class="btn btn-sm mt-4">จัดการ</nuxt-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-16">
      <slot />
    </div>
    <footer class="bg-[#333C4D] text-white p-4 py-8">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row gap-8 md:justify-between">
          <div class="w-full md:w-1/4">
            <h5 class="font-bold text-lg mb-4">Site Map</h5>
            <ul class="space-y-2">
              <li><nuxt-link to="/" class="hover:text-gray-300">หน้าหลัก</nuxt-link></li>
              <li><nuxt-link to="/business" class="hover:text-gray-300">สำหรับผู้ประกอบการ</nuxt-link></li>
              <li><nuxt-link to="/organization" class="hover:text-gray-300">โครงสร้างองค์กร</nuxt-link></li>
              <li><nuxt-link to="/news" class="hover:text-gray-300">ข่าวสาร</nuxt-link></li>
              <li><nuxt-link to="/faq" class="hover:text-gray-300">คำถามที่พบบ่อย</nuxt-link></li>
              <li><nuxt-link to="/contact" class="hover:text-gray-300">ติดต่อเรา</nuxt-link></li>
              <li v-show="isLoggedIn">
                <nuxt-link to="/links" class="hover:text-gray-300">แบบฟอร์มกรอกข้อมูล</nuxt-link>
              </li>
            </ul>
          </div>
          <div class="w-full md:w-1/3">
            <h5 class="font-bold text-lg mb-4">Contact Us</h5>
            <div class="space-y-2">
              <p>กลุ่มงานคุ้มครองผู้บริโภคและเภสัชสาธารณสุข สำนักงานสาธารณสุขจังหวัดนครพนม</p>
              <p>เบอร์โทรศัพท์: 042-515766</p>
              <p>ที่อยู่: เลขที่ 356 ถ.อภิบาลบัญชา ต.ในเมือง อ.เมือง จ.นครพนม 48000</p>
            </div>
          </div>
          <div class="w-full md:w-1/4">
            <h5 class="font-bold text-lg mb-4">สถิติผู้เข้าชมเว็บไซต์</h5>
            <ul class="space-y-2">
              <li class="flex justify-between">
                <span>จำนวนผู้เข้าชมวันนี้:</span>
                <span
                  ><span class="font-semibold">{{ stats.today }} </span> คน</span
                >
              </li>
              <li class="flex justify-between">
                <span>จำนวนผู้เข้าชมเดือนนี้:</span>
                <span
                  ><span class="font-semibold">{{ stats.thisMonth }} </span> คน</span
                >
              </li>
              <li class="flex justify-between">
                <span>จำนวนผู้เข้าชมทั้งหมด:</span>
                <span
                  ><span class="font-semibold">{{ stats.total }} </span> คน</span
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
const { recordVisit, stats, fetchStats } = useVisitorStats();

// Record visit when the page loads
onMounted(async () => {
  await recordVisit();
});

const businessMenuItems = [
  { path: "/business", title: "ทั้งหมด" },
  { path: "/business/pharmacy", title: "ยา" },
  { path: "/business/food", title: "อาหาร" },
  { path: "/business/clinic", title: "สถานพยาบาล" },
  { path: "/business/equipment", title: "เครื่องมือแพทย์" },
  { path: "/business/cosmetics", title: "เครื่องสำอาง" },
  { path: "/business/health", title: "สถานประกอบการเพื่อสุขภาพ" },
  { path: "/business/hazardous", title: "วัตถุอันตราย" },
  { path: "/business/herbal", title: "ผลิตภัณฑ์สมุนไพร" },
];

const { checkAuth } = useAuth();

const isLoggedIn = useState("isLoggedIn", () => false);
const role = useState("role", () => null);
// In your component or page
const res = await checkAuth();
if (res) {
  isLoggedIn.value = true;
  role.value = res.user.user_metadata.role;
} else {
  isLoggedIn.value = false;
}
</script>
