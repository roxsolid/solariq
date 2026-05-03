import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// All environment variables prefixed with VITE_ are automatically
// exposed to the client bundle by Vite. Set them in Vercel dashboard
// under Settings → Environment Variables:
//   VITE_SUPABASE_URL
//   VITE_SUPABASE_ANON_KEY
//
// For local development, create a .env.local file (already in .gitignore):
//   VITE_SUPABASE_URL=https://intvnxvannltfibguykw.supabase.co
//   VITE_SUPABASE_ANON_KEY=your_anon_key_here

export default defineConfig({
  plugins: [react()],
});
