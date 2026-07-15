## Context

The routing change left each case page with a bare `← Back` link and no layout container. The content renders at full width against the viewport edge with zero padding.

## Goals / Non-Goals

**Goals:**
- Center case content with reasonable max-width using Mantine `Container`
- Replace raw "← Back" link with Mantine `Breadcrumbs` (`Home / CaseName`)
- Consistent layout across all 6 case pages

**Non-Goals:**
- Changing the HomePage (already uses Container)
- Shared layout wrapper (each case stays self-contained)
- No new dependencies (Container and Breadcrumbs are in `@mantine/core`)

## Decisions

### Decision 1: Container size "md"

`size="md"` gives a ~960px max-width — comfortable for the demo's content without being too narrow. `py="md"` adds vertical padding.

### Decision 2: Breadcrumbs: Home link + case name as text

```tsx
<Breadcrumbs mb="md">
  <Link href="/">Home</Link>
  <span>Switch</span>
</Breadcrumbs>
```

First crumb is a wouter `Link` (navigates home). Second is plain text (current page). Default `/` separator. `mb="md"` gaps it from the content below.

### Decision 3: Keep each case self-contained

Rather than extracting a shared layout wrapper, each Case component includes its own Container + Breadcrumbs. This preserves the "one folder, one complete demo" principle. Each file gains ~3 import lines and ~3 JSX wrapper lines.

## Risks / Trade-offs

None. This is pure cosmetic polish — no behavior changes, no dependency additions.
