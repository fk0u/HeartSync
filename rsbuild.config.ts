import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [pluginReact()],
  html: {
    template: './index.html',
    title: 'HeartSync — Blood Pressure Tracker',
    meta: {
      viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
      'theme-color': '#0f172a',
      description: 'HeartSync — Aplikasi Pencatatan & Monitoring Tekanan Darah Offline-First, Aman & Mudah Digunakan untuk Keluarga'
    }
  },
  source: {
    entry: {
      index: './src/main.tsx',
    },
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 8173,
  },
});
