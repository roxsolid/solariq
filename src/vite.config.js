import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  define: {
    "import.meta.env.VITE_SUPABASE_URL": JSON.stringify("https://intvnxvannltfibguykw.supabase.co"),
    "import.meta.env.VITE_SUPABASE_ANON_KEY": JSON.stringify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImludHZueHZhbm5sdGZpYmd1eWt3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0NzAwNjgsImV4cCI6MjA5MDA0NjA2OH0.KnPP0-vxXyBYTvHxbXfrH8AKd61u1hWpEO2gpjWnzNE"),
  },
});
