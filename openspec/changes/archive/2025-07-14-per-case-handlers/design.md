## Context

Each demo case currently imports handlers from a shared `demo/src/handlers.ts`. The shared file mixes concerns across cases — `saveDoc` lives alongside `setStatus` alongside `removeItem`. Each case uses only a subset (0–4 of 6 handlers), and a reader can't understand a case's behavior without jumping to the shared file.

The case folders already follow a self-contained pattern: `spec.json` + `registry.ts` + `CaseName.tsx`. Handlers are the one missing piece.

## Goals / Non-Goals

**Goals:**
- Each case folder is fully self-contained — all files needed to understand that demo live in one directory
- Remove the shared `handlers.ts` entirely
- No change in behavior — handlers are copied verbatim, not refactored

**Non-Goals:**
- Extracting shared handler utilities (the edit-toggle trio is ~10 lines; duplicating it is intentional for clarity)
- Per-case stores (store sharing is a separate concern)
- Refactoring or improving handler implementations
- Library changes

## Decisions

### Decision 1: Duplicate shared handlers rather than extract to a shared utility

The edit-toggle pattern (`startEdit`/`saveEdit`/`cancelEdit`) is used by 4 of 6 cases. Rather than extract a `createEditToggleHandlers()` factory, we duplicate the ~10 lines into each case's `handlers.ts`.

**Rationale:** The demo exists to show consumers what they *can* build. A reader looking at `cases/actions/handlers.ts` should see the complete implementation right there — not chase an import to a shared utility. Duplication is a feature here: it signals that handlers are ordinary functions, not framework abstractions. If the demo were production code, extraction would be the right call.

### Decision 2: Basic case drops handlers entirely

Basic is a static rendering demo — its spec has no `"on"` maps, so it needs zero handlers. Currently it imports and passes the shared handlers object as dead weight. After the move, Basic simply doesn't import or pass handlers.

### Decision 3: Handler-to-case mapping stays exactly as-is

No refactoring. Each handler moves to the case(s) that use it:

| Handler | Used by |
|---------|---------|
| `saveDoc` | Actions |
| `startEdit` | Actions, Form, Large, Table |
| `saveEdit` | Actions, Form, Large, Table |
| `cancelEdit` | Actions, Form, Large, Table |
| `setStatus` | Switch |
| `removeItem` | Large, Table |

## Risks / Trade-offs

- **Duplication drift**: If the edit-toggle pattern changes, 4 files need updating. → Mitigation: this is a demo, not a library. Handlers are intentionally small and stable. If drift becomes an issue, extraction is a 5-minute refactor.
- **Store state bleed**: Handlers being per-case doesn't prevent store state from persisting across tab switches (e.g., `/appStatus` from Switch remains populated on other tabs). → This is a separate concern, not addressed here.
