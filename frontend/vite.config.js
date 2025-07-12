// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from "@tailwindcss/vite";
// export default defineConfig({
//   plugins: [react(), tailwindcss()],
//   base: "/",
//   server: {
//     watch: {
//       usePolling: true, 
//     },
//   },
//   build: {
//     outDir: "dist",
//   },
// });

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import fs from "fs";

// Plugin to copy _redirects
function copyRedirects() {
  return {
    name: "copy-redirects",
    closeBundle() {
      fs.copyFileSync(
        resolve(__dirname, "public/_redirects"),
        resolve(__dirname, "dist/_redirects")
      );
    },
  };
}

export default defineConfig({
  plugins: [react(), copyRedirects()],
  base: "/",
  build: {
    outDir: "dist",
  },
  server: {
    watch: {
      usePolling: true,
    },
  },
});
