# Chapter 30: Routing Architecture

## 30.1 Code-Based Type-Safe Routing (`src/router.tsx`)

HeartSync implements **TanStack Router v1** for type-safe routing across four core views:

```typescript
import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router';

export const rootRoute = createRootRoute();

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
});

export const historyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/history',
});

export const reportsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/reports',
});

export const remindersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/reminders',
});

export const routeTree = rootRoute.addChildren([
  indexRoute,
  historyRoute,
  reportsRoute,
  remindersRoute,
]);

export const router = createRouter({ routeTree });
```

`App.tsx` inspects `useRouterState().location.pathname` to map URL locations (`/`, `/history`, `/reports`, `/reminders`) directly to active tabs (`dashboard`, `history`, `reports`, `reminders`).
