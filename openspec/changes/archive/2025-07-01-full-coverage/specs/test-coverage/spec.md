## MODIFIED Requirements

### Requirement: Coverage thresholds are enforced
The Vitest configuration SHALL define coverage thresholds that fail the build when not met.

#### Scenario: Thresholds configured
- **WHEN** `vitest.config.ts` is read
- **THEN** it contains a `coverage.thresholds` object with at minimum: `lines: 100`, `functions: 100`, `branches: 100`, `statements: 100`
