# Changelog

## 0.1.2

- README 安装一节补上 npm：`npm view dsh-github-prior-art version` + `dsh plugin ... add dsh-github-prior-art`，并说明 DSH 装的是 npm 包而不是仓库源码。
- 与 npm 页同步（0.1.1 起的 README 更新要发版才会出现在 npm 页）。

## 0.1.1

- README rewritten to match the shape of established DSH plugins: badges, screenshot, install-in-three-ways, a real search round, how it works, dependencies and boundaries. English README mirrors it.
- npm metadata: English one-line description, extra keywords (`prior-art-search`, `reinventing-the-wheel`), `engines`, `CHANGELOG.md` in `files`.
- Added `assets/social-preview.png` used as the repository header.
- No behaviour change.

## 0.1.0

First release.

- Standing rule injected through `systemPrompt.section` (order 900, ~6 lines).
- `github-prior-art` skill registered through `skills.register` with `source: 'runtime'`.
- Both host services are optional: the plugin stays silent and starts fine when either is missing.
- `test/smoke.mjs` covers both services present and absent.
