## Context

The demo currently uses a `useState<Tab>` + `SegmentedControl` pattern in `App.tsx` to toggle between cases. All cases share a module-level `store.ts` singleton, so store state bleeds across tab switches. After per-case handlers were moved into case folders, the shared store is the last cross-cutting dependency.

## Goals / Non-Goals

**Goals:**
- Each case has its own URL (`/basic`, `/form`, etc.) with browser back/forward support
- Landing page at `/` with feature cards linking to each case
- Each case creates its own store on mount — zero shared state between cases
- Each case page has a "← Back" link to return home
- Minimal dependency footprint (wouter ~1.5KB)

**Non-Goals:**
- Lazy loading / code splitting (overkill for a demo with 6 small cases)
- URL parameters or nested routes
- Replacing Mantine UI components (keep Mantine for cards, typography, grid)
- Library changes

## Decisions

### Decision 1: wouter over react-router

wouter (~1.5KB gzip) vs react-router (~20KB). For a demo that values minimalism, wouter is the obvious choice. Its hook-based API also aligns with the demo's philosophy of "simple composable primitives." Using the component API (`Router`/`Route`/`Switch`) for readability.

**Alternative considered:** react-router. Rejected due to weight and unnecessary features (loaders, actions, data APIs) that a demo doesn't need.

### Decision 2: History routing (not hash)

Clean URLs (`/switch` vs `/#/switch`). Vite's dev server handles SPA fallback natively. For production builds, Vite's SPA mode (default) serves `index.html` for unmatched routes. No server config needed.

**Alternative considered:** Hash routing via `useHashLocation`. Rejected because history URLs are cleaner and the demo runs in dev mode where fallback is automatic.

### Decision 3: Per-component store via useState initializer

Each Case component creates its own store on mount:

```tsx
const [store] = useState(() => createStore({ /* seed data */ }));
```

When navigating away, the component unmounts and the store is garbage-collected. Returning creates a fresh store — clean slate every visit. `useState` with an initializer function is the idiomatic React pattern for one-time-per-mount values.

**Alternative considered:** Module-level `store.ts` per case folder. Rejected because module singletons survive across navigations (modules are cached), defeating the goal of clean state per visit.

### Decision 4: HomePage as a separate component

The landing page at `/` lives in `HomePage.tsx`, separate from `App.tsx`. It renders a `SimpleGrid` of `Card` components — one per case — using Mantine's card primitives. Each card has an emoji icon, title, and one-line description. Cards wrap in wouter's `Link` for navigation.

The case metadata (title, description, route, emoji) is defined as a `const CASES` array in `HomePage.tsx` — no external manifest file needed for 6 items.

### Decision 5: "← Back" link on each case page

A small `Anchor` component at the top-left of each case page, using wouter's `Link`:

```tsx
<Link href="/">← Back</Link>
```

Each Case component renders this before its `Renderer`. The link is part of the case's own layout, not a shared wrapper — keeping the "self-contained case folder" principle intact. Duplicating one line across 6 files is intentional.

### Decision 6: App.tsx structure

```tsx
<Router>
  <Switch>
    <Route path="/" component={HomePage} />
    <Route path="/basic" component={BasicCase} />
    {/* ... one route per case */}
    <Route>404 — Page not found</Route>
  </Switch>
</Router>
```

No shared layout wrapper. The existing MantineProvider in `main.tsx` remains unchanged.

## Risks / Trade-offs

- **Vite preview SPA fallback**: The default Vite SPA mode handles history routing. If the demo is deployed to a static host without SPA fallback, direct URL access (refresh on `/switch`) would 404. → Mitigation: This is a dev-mode demo; if deployed, any static host with SPA support works (Netlify, Vercel, GitHub Pages with 404.html redirect).
- **Store initial seed data duplication**: Large and Table cases both seed `/items` with 1000 rows. With per-mount stores, this data is recreated on every visit. → Mitigation: 1000 items is trivial (~50KB); no performance concern.
- **No navigation state preservation**: Navigating away and back loses any edits made in Form/Large/Table. → This is actually the goal — clean slate per visit. Document as intentional behavior.
