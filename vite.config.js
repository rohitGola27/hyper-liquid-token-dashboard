import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path, { resolve } from "path";
import compression from "vite-plugin-compression";
import { fileURLToPath } from "url";
import strip from "rollup-plugin-strip";
import { visualizer } from "rollup-plugin-visualizer";

// Get __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  server: {
    allowedHosts: [
      "f153-125-63-73-50.ngrok-free.app",
      "1178-125-63-73-50.ngrok-free.app",
    ],
    host: "0.0.0.0", // Allow access from network devices
    port: 5175, // Set the development server port
    strictPort: true, // avoid port change
    https: false, // ngrok will provide https
    cors: true, // Allow CORS
    // hmr: {
    //   clientPort: 443, // Ensure HMR over HTTPS tunnel
    // },
  },
  plugins: [
    react(),
    compression({
      algorithm: "brotliCompress", // Use Brotli compression for better results
      ext: ".br",
      threshold: 10240, // Compress files larger than 10 KB
    }),
    visualizer({
      open: true, // Automatically opens the visualizer report in the browser after build
      filename: "visualizer-stats.html", // Specify the output file for the report
    }),
    strip({
      include: "src/**/*.js",
      function: ["console.*"],
    }),
  ],
  build: {
    outDir: "dist", // Specify the output directory
    minify: "esbuild",
    sourcemap: false, // Disable source maps for production builds
    emptyOutDir: true,
    cssCodeSplit: true, // Enable CSS code splitting
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"), // Specify your main entry point
      },
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          reactRouter: ["react-router", "react-router-dom"],
          utility: ["clsx", "class-variance-authority"],
        },
        chunkSizeWarningLimit: 500, // Adjust to warn for large chunks
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  define: {
    global: "globalThis", // Use globalThis for Node.js global compatibility
  },

  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis", // Ensure compatibility with libraries expecting global
      },
      plugins: [],
    },
  },
});
