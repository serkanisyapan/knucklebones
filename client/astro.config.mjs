import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import vercelServerless from "@astrojs/vercel/serverless";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  output: "server",
  integrations: [tailwind(), react()],
  adapter: vercelServerless(),
});
