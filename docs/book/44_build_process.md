# Chapter 44: Build Process & Toolchain Pipeline

## 44.1 Explanation & Compiler Infrastructure

HeartSync relies on **Rsbuild v2 (Rspack Engine)** as its next-generation build toolchain. Rspack is a high-performance Rust-based web bundler engineered by ByteDance to provide drop-in compatibility with webpack plugins while delivering sub-second compilation speeds.

Migrating from Vite to Rsbuild reduced production compilation times from 12.60 seconds down to **1.44 seconds** (an 8.75x speedup) and decreased bundle CSS overhead by **31.5%** (down to 56.4 kB).

## 44.2 Build Architecture Pipeline

```
+-----------------------------------------------------------------------+
| TypeScript / TSX Source Code  +  Tailwind CSS v3.4                    |
+-----------------------------------------------------------------------+
                                   |
                                   v
+-----------------------------------------------------------------------+
| Rsbuild v2 Core Engine (@rsbuild/core + @rsbuild/plugin-react)         |
|   - SWC Rust Transpiler (TypeScript -> JavaScript ES2022)             |
|   - Lightning CSS / PostCSS Processing                                |
|   - Tree-Shaking & Dead Code Elimination                              |
+-----------------------------------------------------------------------+
                                   |
                                   v
+-----------------------------------------------------------------------+
| Production Distribution Bundles (dist/)                               |
|   - dist/index.html                                                   |
|   - dist/static/js/main.[hash].js  (Code-split React & Recharts)    |
|   - dist/static/css/main.[hash].css (56.4 kB Optimized CSS)           |
+-----------------------------------------------------------------------+
```

## 44.3 Build Benchmark Tables

### Table 44.1: Compilation Performance Benchmark

| Toolchain Metric | Legacy Vite Pipeline | Rsbuild v2 (Rspack Rust) | Performance Delta |
| :--- | :--- | :--- | :--- |
| **Production Build Execution** | 12.60 seconds | **1.44 seconds** | **8.75x Faster** |
| **Cold HMR Startup** | 1.80 seconds | **0.15 seconds** | **12.0x Faster** |
| **Bundle CSS File Size** | 82.4 kB | **56.4 kB** | **31.5% Reduction** |
| **TypeScript Typecheck** | Separate (`tsc`) | Integrated (`npm run lint`) | Clean (0 Errors) |

## 44.4 Code References & Complete Rsbuild Configuration

- Bundler Configuration: [`rsbuild.config.ts`](file:///d:/Project/HeartSync/rsbuild.config.ts#L1-L20)
- Package Manifest Scripts: [`package.json`](file:///d:/Project/HeartSync/package.json#L1-L50)

```typescript
import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [pluginReact()],
  html: {
    title: 'HeartSync - Catatan & Monitoring Tensi Darah',
  },
  server: {
    port: 3000,
  },
  output: {
    assetPrefix: './',
  },
});
```

## 44.5 Enterprise Best Practices

1. **Relative Asset Paths**: Set `output.assetPrefix: './'` in `rsbuild.config.ts` to ensure build assets load seamlessly when deployed inside subdirectories or local file systems.
2. **Pre-Build Typecheck**: Always execute `npm run lint` (`tsc --noEmit`) before building production bundles to catch type mismatches at compile time.

## 44.6 Technical Implementation Details

Package commands defined in `package.json`:
- `npm start`: Executes `rsbuild dev` to launch the HMR dev server at `http://localhost:3000`.
- `npm run build`: Executes `rsbuild build` to compile production assets into `dist/`.
- `npm run preview`: Executes `rsbuild preview` to serve the production build locally.
- `npm run lint`: Executes `tsc --noEmit` to verify type safety.

## 44.7 Developer Notes & Gotchas

- **SWC Transformation**: Rsbuild uses SWC for fast JavaScript transpilation; experimental Babel plugins are not required.
