## 1. Create JSON spec files

- [x] 1.1 Create `demo/src/specs/basic.json` with the basic spec (StaticText + Card)
- [x] 1.2 Create `demo/src/specs/form.json` with the form spec (BoundField + EditToggle)
- [x] 1.3 Create `demo/src/specs/actions.json` with the actions spec (ActionButton + savedAt field)

## 2. Update App.tsx

- [x] 2.1 Add static JSON imports for basic, form, and actions specs
- [x] 2.2 Remove inline `basicSpec`, `formSpec`, and `actionSpec` object literals
- [x] 2.3 Leave `buildLargeSpec()` and `buildTableSpec()` unchanged
- [x] 2.4 Verify tab switching renders correctly for all five tabs

## 3. Verify

- [x] 3.1 Run `npm run dev` in demo directory and confirm Basic, Form, and Actions tabs render identically to before
- [x] 3.2 Confirm Large (1000) and Table tabs still work (no regression)
- [x] 3.3 Run `npm test` to confirm no library tests regressed
