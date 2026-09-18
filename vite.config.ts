import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { cp, readdir, rm } from 'node:fs/promises'
import path from 'node:path'

const duplicateMusicMount = () => ({
  name: 'duplicate-music-mount',
  async closeBundle() {
    const outputDirectory = path.resolve('dist')
    const musicDirectory = path.join(outputDirectory, 'music')

    await rm(musicDirectory, { recursive: true, force: true })
    await Promise.all(
      (await readdir(outputDirectory)).filter((entry) => entry !== 'music').map((entry) =>
        cp(path.join(outputDirectory, entry), path.join(musicDirectory, entry), { recursive: true }),
      ),
    )
  },
})

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react(), duplicateMusicMount()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    reporters: ['default', 'junit'],
    outputFile: 'test-results.xml',
    coverage: {
      reporter: ['json-summary', 'json'],
    }
  }
});
