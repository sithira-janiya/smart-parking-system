# Contributing

## Branching Strategy

- `main`: stable branch
- `feature/<short-name>`: new features
- `fix/<short-name>`: bug fixes
- `chore/<short-name>`: maintenance updates

Example:

```text
feature/jwt-refresh-token
fix/auth-login-401
```

## Commit Style

Use concise, imperative commit messages:

```text
feat: add slot reservation endpoint
fix: correct role parsing in jwt filter
docs: add setup and api reference
refactor: split auth logic into service
test: add parking service unit tests
```

## Pull Request Workflow

1. Create branch from latest `main`.
2. Implement scoped changes and keep them focused.
3. Run tests locally.
4. Update docs when API/security behavior changes.
5. Open PR with:
   - clear summary
   - linked issue/task
   - test notes
   - sample request/response for API changes
6. Address review feedback and squash/rebase if required by team policy.

## PR Checklist

- [ ] Code compiles and tests pass
- [ ] No secrets committed
- [ ] API changes documented
- [ ] Security impacts reviewed
- [ ] Backward compatibility considered
