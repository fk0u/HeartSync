# Chapter 39: Complete Source Code Walkthrough

## 39.1 Explanation & Codebase Overview

This chapter provides a detailed line-by-line walkthrough of the core source components, custom hooks, and state implementations inside HeartSync. By reviewing these walkthroughs, software engineers can maintain and extend the codebase without inspecting raw files.

## 39.2 Core Component Architecture

```
[src/App.tsx] (Main Layout Router)
  ├── [src/components/layout/Header.tsx] (DesktopHeader & MobileHeader Switcher)
  ├── [src/components/layout/Navigation.tsx] (Bottom Navigation Bar)
  ├── [src/components/profiles/CustomProfileSelector.tsx] (Apple HIG Popover Selector)
  ├── [src/components/calendar/CalendarView.tsx] (Interactive Month/Year Grid)
  ├── [src/components/habits/HabitsTrackerModal.tsx] (Bedtime, Screen Time, Outdoor Logger)
  └── [src/components/dashboard/*] (StatCards, BPTrendChart, AppleHealthRings)
```

## 39.3 Key Code Walkthroughs

### 1. `src/components/profiles/CustomProfileSelector.tsx`

Implements a custom popover selector replacing native HTML `<select>` dropdowns:

```typescript
export const CustomProfileSelector: React.FC = () => {
  const { profiles, activeProfile } = useProfiles();
  const { setActiveProfileId, openProfileModal } = useAppStore();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
      >
        <span className="text-lg">{activeProfile?.avatar || '👤'}</span>
        <span className="font-medium text-sm text-slate-800">{activeProfile?.name || 'Pilih Profil'}</span>
        <ChevronDown className="w-4 h-4 text-slate-500" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200/80 p-2 z-50">
          {profiles.map(p => (
            <button
              key={p.id}
              onClick={() => {
                setActiveProfileId(p.id);
                setIsOpen(false);
              }}
              className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-teal-50 transition-colors text-left"
            >
              <div className="flex items-center gap-2">
                <span>{p.avatar}</span>
                <div>
                  <div className="font-semibold text-slate-800">{p.name}</div>
                  <div className="text-xs text-slate-500 capitalize">{p.relationship}</div>
                </div>
              </div>
              {p.id === activeProfile?.id && <Check className="w-4 h-4 text-teal-600" />}
            </button>
          ))}

          <button
            onClick={() => {
              setIsOpen(false);
              openProfileModal();
            }}
            className="w-full mt-2 flex items-center justify-center gap-2 p-2 rounded-xl bg-teal-600 text-white font-medium text-sm hover:bg-teal-700 transition-colors"
          >
            <Plus className="w-4 h-4" /> Tambah Profil Baru
          </button>
        </div>
      )}
    </div>
  );
};
```

### 2. `src/components/calendar/CalendarView.tsx`

Implements the interactive monthly/yearly date grid with color-coded AHA status badges:

```typescript
export const CalendarView: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { readings } = useReadings();
  const [selectedDateReadings, setSelectedDateReadings] = useState<BPReading[] | null>(null);

  // Generates month days grid
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-800">
          {format(currentDate, 'MMMM yyyy', { locale: id })}
        </h2>
        <div className="flex items-center gap-2">
          <button onClick={() => setCurrentDate(subMonths(currentDate, 1))} className="p-2 hover:bg-slate-100 rounded-full">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={() => setCurrentDate(addMonths(currentDate, 1))} className="p-2 hover:bg-slate-100 rounded-full">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center">
        {days.map(day => {
          const dateStr = format(day, 'yyyy-MM-dd');
          const dayReadings = readings.filter(r => r.timestamp.startsWith(dateStr));
          const worstCategory = dayReadings.length > 0 ? getWorstCategory(dayReadings) : null;

          return (
            <button
              key={dateStr}
              onClick={() => setSelectedDateReadings(dayReadings)}
              className="p-3 rounded-2xl border border-slate-100 flex flex-col items-center justify-between min-h-[64px] hover:bg-slate-50"
            >
              <span className="text-sm font-semibold text-slate-700">{format(day, 'd')}</span>
              {worstCategory && (
                <span className={`w-2.5 h-2.5 rounded-full ${worstCategory.color}`} />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
```

## 39.4 Enterprise Best Practices

1. **Custom Popover Controls**: Always handle outside click listeners or component unmounts to close popovers gracefully.
2. **Date Index Filtering**: Match dates using string prefixes (`timestamp.startsWith(dateStr)`) for instant performance without complex UTC date conversions.

## 39.5 Developer Notes & Gotchas

- **Locale Setting**: Date formatters use Indonesian locale (`locale: id`) imported from `date-fns/locale/id`.
