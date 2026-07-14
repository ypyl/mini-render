import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["src/**/*.test.ts"],
    coverage: {
      provider: "v8",
      include: ["src/**/*.ts", "src/**/*.tsx"],
      exclude: ["src/**/*.test.ts", "src/spec.ts", "src/index.ts"],
      thresholds: {
        lines: 35,
        functions: 30,
        branches: 40,
      },
    },
  },
});
