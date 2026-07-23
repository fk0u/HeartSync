# Chapter 40: UI & Design System Documentation

## 40.1 Explanation & Visual Design Philosophy

HeartSync implements a modern, premium design system inspired by **Apple iOS SwiftUI & Apple Health**. The design language combines soft glassmorphic backdrop blurs, clean typography (Inter / System UI), high-contrast visual status rings, rounded card containers (`rounded-3xl`), and curated color palettes mapped to American Heart Association (AHA) blood pressure categories.

## 40.2 Design System Architecture & Design Tokens

```
+-----------------------------------------------------------------------+
|                       SWIFTUI DESIGN TOKENS                           |
+-----------------------------------------------------------------------+
  ├── Color Tokens: Brand Teal (#0f766e), Surface Slate (#f8fafc)
  ├── Category Badges: Emerald (Normal), Amber (Elevated), Red (Stage 2)
  ├── Glassmorphism: bg-white/80 backdrop-blur-md border border-slate-200
  ├── Typography: Inter / Tabular Numbers (font-mono for numbers)
  └── Animation: Smooth CSS transitions & Framer Motion spring physics
```

## 40.3 Visual Token & Color Palette Tables

### Table 40.1: AHA Blood Pressure Category Design Tokens

| Category Name | Systolic Cutoff | Diastolic Cutoff | Tailwind Color Class | Hex Code | Visual Badge Class |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Normal** | $< 120\text{ mmHg}$ | AND $< 80\text{ mmHg}$ | `emerald-500` | `#10b981` | `bg-emerald-100 text-emerald-800` |
| **Elevated** | $120\text{--}129\text{ mmHg}$ | AND $< 80\text{ mmHg}$ | `amber-500` | `#f59e0b` | `bg-amber-100 text-amber-800` |
| **Stage 1** | $130\text{--}139\text{ mmHg}$ | OR $80\text{--}89\text{ mmHg}$ | `orange-500` | `#f97316` | `bg-orange-100 text-orange-800` |
| **Stage 2** | $\ge 140\text{ mmHg}$ | OR $\ge 90\text{ mmHg}$ | `red-500` | `#ef4444` | `bg-red-100 text-red-800` |
| **Crisis** | $> 180\text{ mmHg}$ | OR $> 120\text{ mmHg}$ | `rose-700` | `#991b1b` | `bg-rose-900 text-white animate-pulse` |

## 40.4 Code References

- Recharts Trend Visualizer: [`src/components/dashboard/BPTrendChart.tsx`](file:///d:/Project/HeartSync/src/components/dashboard/BPTrendChart.tsx#L1-L100)
- Apple Health Category Rings: [`src/components/dashboard/AppleHealthRings.tsx`](file:///d:/Project/HeartSync/src/components/dashboard/AppleHealthRings.tsx#L1-L80)
- Shimmer Loading Skeleton: [`src/components/common/ShimmerSkeleton.tsx`](file:///d:/Project/HeartSync/src/components/common/ShimmerSkeleton.tsx#L1-L40)

## 40.5 Route UI Screenshots & Crawled Layout Artifacts (Port 8173)

The application was launched on port `8173` via Rsbuild and crawled across all core routes to capture high-resolution visual evidence:

### 1. Dashboard View (`http://localhost:8173/`)
Displays the 5-minute Box Breathing rest protocol card, quick action buttons, habits & sleep tracker, Indonesian voice dictation mic button, family SOS alert trigger, blood pressure trend chart, and statistics summary.

![Dashboard Route Screenshot](file:///d:/Project/HeartSync/documentation/screenshots/dashboard_route_8173.png)

### 2. History & Calendar View (`http://localhost:8173/history`)
Displays the interactive monthly date grid with color-coded AHA category dots, filtering controls, and daily reading inspector drawer.

![History Route Screenshot](file:///d:/Project/HeartSync/documentation/screenshots/history_route_8173.png)

### 3. Medical Reports View (`http://localhost:8173/reports`)
Displays doctor consultation report parameters, PDF generation options, and 1-click HL7 FHIR v4 Observation JSON exporter.

![Reports Route Screenshot](file:///d:/Project/HeartSync/documentation/screenshots/reports_route_8173.png)

### 4. Reminders & Alarms View (`http://localhost:8173/reminders`)
Displays medication dose schedules, measurement reminders, adherence streaks, and browser local alarm configuration controls.

![Reminders Route Screenshot](file:///d:/Project/HeartSync/documentation/screenshots/reminders_route_8173.png)

## 40.6 Enterprise Best Practices

1. **Tabular Numerals**: Always apply `font-mono` or `tabular-nums` CSS properties to blood pressure numbers to prevent layout jitter during data updates.
2. **Glassmorphic Contrast**: Ensure glassmorphism cards maintain a minimum background opacity of `80%` (`bg-white/80`) to pass WCAG 2.1 AAA contrast ratios.

## 40.7 Technical Implementation Details

Loading states are handled using custom shimmer skeletons (`ShimmerSkeleton.tsx`) rather than generic spinner circles, improving perceived performance:
```typescript
export const CardSkeleton: React.FC = () => (
  <div className="bg-white/80 rounded-3xl p-6 border border-slate-100 animate-pulse">
    <div className="h-4 bg-slate-200 rounded w-1/3 mb-4" />
    <div className="h-8 bg-slate-200 rounded w-1/2" />
  </div>
);
```

## 40.8 Developer Notes & Gotchas

- **Safe CSS Transitions**: Avoid animating `width` or `height` properties directly; animate `opacity` and `transform` (`scale`, `translate`) for 60 FPS performance.
