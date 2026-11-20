# Workflow: changes, versions, releases

## Making a change (human or AI agent)

1. **Branch** from `main`: `feat/<short-name>` or `fix/<short-name>`.
2. **Read** the feature doc in `docs/features/` and the code it lists.
3. **Test first** when behaviour changes (unit for logic, e2e for what visitors see).
4. **Implement** in both languages and both themes.
5. **Document**:
   - update or create `docs/features/<feature>.md` (template: `_TEMPLATE.md`),
   - add a line to `CHANGELOG.md` under `## [Unreleased]` (Added / Changed / Fixed / Removed),
   - new big technical choice → `docs/decisions/NNNN-title.md`.
6. **Verify**: `npm run verify` must pass.
7. **Commit** using Conventional Commits, e.g. `feat(team): add profile photos`.
8. **Pull request** using the template; CI must be green before merging.

### Asking Claude Code to do it

Good prompt shape:

> Add <feature>. Follow CLAUDE.md: tests, feature doc, changelog, both languages and themes. Run `npm run verify` before finishing.

Claude Code reads `CLAUDE.md` automatically, so the rules apply even with a short prompt.

## Versioning (SemVer)

| Change | Bump | Example |
|---|---|---|
| Redesign, or URLs change and old links break | MAJOR | 1.4.2 → 2.0.0 |
| New page, section or feature | MINOR | 1.4.2 → 1.5.0 |
| Fix, copy edit, small style change | PATCH | 1.4.2 → 1.4.3 |

## Releasing

1. In `CHANGELOG.md`, rename `## [Unreleased]` to `## [x.y.z] - YYYY-MM-DD` and add a fresh empty `## [Unreleased]` above it.
2. Set `"version"` in `package.json` to the same number.
3. Commit `chore(release): x.y.z`, tag it: `git tag vx.y.z && git push --tags`.
4. Deploy (see `docs/DEPLOYMENT.md`). Most hosts deploy `main` automatically.

## Backups and rollback

- Every release is a git tag; to roll back, redeploy the previous tag (or revert the commit).
- The design files (prototype) are versioned separately on the Claude design canvas (v1.1, v1.2…).
