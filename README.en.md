# dsh-github-prior-art

**A standing rule for DeepSeek Harness: before building from scratch, check GitHub.**

Agents waste most of their effort rebuilding something that already exists and has been maintained for years. With this plugin installed, every "build me X from scratch" starts with a quick prior-art pass: 3–5 comparable projects, then a three-line decision (candidates / choice / reason) before any code.

## What you get

1. **Always-on rule** (~6 lines in every request): when to search, when not to, what "done" means.
2. **`github-prior-art` skill**: the full procedure — query patterns, five evaluation dimensions, dependency → fork → borrow-structure → build ordering, anti-patterns. Loaded on demand, so it costs nothing until used.

The rule is injected through `systemPrompt.section`, the skill through `skills.register` — **your `AGENTS.md` is never modified**, and uninstalling restores everything.

## Install

```bash
dsh plugin --profile <your-profile> add ./dsh-github-prior-art
# or, once published:
dsh plugin --profile <your-profile> add dsh-github-prior-art
```

Restart DSH (or reload plugins) afterwards.

Skill-only alternative: copy [`skills/github-prior-art/`](skills/github-prior-art/SKILL.md) into `~/.dsh/skills/` and paste the six-line rule from the Chinese README into `~/.dsh/AGENTS.md`.

Do not use both at once — the rule would be injected twice.

## Search tools

`gh_repo_search` / `gh_repo` / `gh_file` come from [@perrylink/dsh-github](https://github.com/PerryLink/dsh-github). Without them the skill falls back to `web_search site:github.com <query>`.

## Development

```bash
node test/smoke.mjs
```

## License

MIT © 红一角 (yuanzephyr920-oss)
