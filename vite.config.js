import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

/********FOR DEPLOYEMENT USE THIS***********/
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
/******************************************/

/********TO RUN LOCALLY USE THIS***********/
// export default defineConfig({
//   plugins: [react(), tailwindcss()],
//   server: {
//     proxy: {
//       "/api": {
//         target: "https://api.frankfurter.app",
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api/, ""),
//       },
//     },
//   },
// });
/******************************************/
