
import * as vt from "vue-toastification";
import "vue-toastification/dist/index.css";

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(vt.default, {
        // position: "top-center",
        // hideProgressBar: true,
        closeButton: false,
        timeout: 1500,
    });
    return {
        provide: {
            toast: vt.useToast()
        }
    }
});
