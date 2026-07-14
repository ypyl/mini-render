## Context

`demo/src/App.tsx` is 350 lines containing everything. Each demo case should live in its own folder for independent comprehension and editing.

## Goals / Non-Goals

**Goals:**
- Each case self-contained in `cases/<name>/`
- Shared components in `components/` and `components/table/`
- Shared store and handlers extracted to dedicated files
- `App.tsx` becomes a thin tab switcher
- All five tabs render identically after refactor

**Non-Goals:**
- Changing component implementations
- Adding tests for demo code
- Changing the tab UX

## Decisions

### Decision 1: Table components in `components/table/`

Table components are only used by the Table case but are kept in `components/` because they're semantically a sub-package of shared components. This keeps `cases/table/` focused on the spec and case setup.

### Decision 2: Per-case registries

Each case has its own `registry.ts` exporting only the components it uses. This makes each case self-documenting — you can see exactly which components a case needs without scanning a 12-entry shared registry.

### Decision 3: buildSpec functions stay with their case

`buildLargeSpec` and `buildTableSpec` include store-seeding side effects that are specific to those cases. They move to `cases/large/buildSpec.ts` and `cases/table/buildSpec.ts`.

### Decision 4: Flat case naming

Case folders use simple names: `basic`, `form`, `actions`, `large`, `table`. Each exports a React component from its index via `CaseComponent` or similar naming.

## Risks / Trade-offs

- **Import path changes** — all internal imports in case components reference `../../components/` etc. Mitigation: this is standard in any multi-folder project; Vite handles it fine.
- **Component duplication** — a component used by only one case (e.g., Row) lives in shared `components/` even though only `large` uses it. This is intentional — it's cleaner than "case-private shared components."
