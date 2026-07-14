## MODIFIED Requirements

### Requirement: Coverage thresholds are enforced
The Vitest configuration SHALL define coverage thresholds that fail the build when not met.

#### Scenario: Thresholds configured
- **WHEN** `vitest.config.ts` is read
- **THEN** it contains a `coverage.thresholds` object with at minimum: `lines: 85`, `functions: 85`, `branches: 80`
