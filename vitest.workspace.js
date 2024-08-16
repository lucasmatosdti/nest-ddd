import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
  "./dist/vitest.config.js",
  "./dist/vitest.config.e2e.js",
  "./vitest.config.e2e.mts"
])
