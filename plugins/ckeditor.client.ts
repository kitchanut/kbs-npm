import { CkeditorPlugin } from '@ckeditor/ckeditor5-vue'


export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(CkeditorPlugin);
  //   return {
  //     provide: {
  //       ckeditor: {
  //         classicEditor: ClassicEditor,
  //       },
  //     },
  //   };
});
