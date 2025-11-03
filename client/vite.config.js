import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  // Load env file based on current mode (e.g. development)
  const env = loadEnv(mode, process.cwd(), "");

  return {
    server: {
      port: Number(env.VITE_PORT),
    },
  };
});
