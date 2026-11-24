# dsh-github-prior-art

**给 DSH 装一条规矩：创造性开工之前，先查 GitHub 上有没有现成的。**

Agent 最容易犯的浪费不是写错代码，是**把别人已经写好、维护了三年的东西再发明一遍**。装了这个插件，每次要"从零做个 X"时，它会先搜 3–5 个同类项目，用三行写清「候选 / 决定 / 理由」，再动手。

## 装它之后你会得到

1. **常驻规矩**（约 6 行，每次请求都在）：什么时候必须搜、什么时候不用搜、怎么算做完。
2. **`github-prior-art` 技能**：完整检索流程——2–3 组关键词怎么下、候选看哪五个维度、直接依赖 / fork / 只借结构 / 自建 怎么排优先级、反面清单。只在需要时加载，不占常驻上下文。

规矩由插件注入（`systemPrompt.section`），技能由插件注册（`skills.register`）——**不改你的 `AGENTS.md`**，卸载即恢复原样。

## 安装

### 方式 A：当插件装（推荐）

```bash
# 本地目录
dsh plugin --profile <你的 profile> add ./dsh-github-prior-art
# 或装 npm 包（发版后）
dsh plugin --profile <你的 profile> add dsh-github-prior-art
```

装完重启 DSH / 重载插件即可，常驻规矩与技能自动生效。

### 方式 B：只装技能（不装插件）

适合不想动 profile 的人：

1. 把 [`skills/github-prior-art/`](skills/github-prior-art/SKILL.md) 整个目录复制到 `~/.dsh/skills/`。
2. 把这 6 行粘进 `~/.dsh/AGENTS.md`：

```markdown
## 造东西前先查 GitHub（防重复造轮）

从零新建项目、新功能、新插件、新工具、新算法、新页面之前，先用 `gh_repo_search` 搜 2–3 组关键词（英文核心词 / `<词> in:name,description,readme` / `awesome <领域>`），挑 3–5 个候选看 star、最近提交、许可证、形态；动手前用 3 行写清「候选 / 决定（直接依赖·fork·只借结构·自建）/ 理由」。
修 bug、小改、既有代码续写、配置与文档不必查；用户说「别搜了」就跳过并注明。细节见技能 `github-prior-art`。
```

> **两种方式别同时用**：常驻规矩会双份注入，白烧 token。

## 检索工具从哪来

技能里默认使用 `gh_repo_search` / `gh_repo` / `gh_file`——它们来自 [@perrylink/dsh-github](https://github.com/PerryLink/dsh-github)。没装、或没有 GitHub token 时，技能会退回 `web_search site:github.com <词>`，不会卡住。

> 本机小坑：`gh_repo_search` 报 `no token` 时，是 `tokenRef`（默认 `GITHUB_TOKEN`）没在 DSH credentials 里配好；见技能里的兜底写法。

## 它长什么样

```
index.js                          # host 半端：注入规矩 + 注册技能
cordis.patch.yml                  # bundle patch，装包时自动挂载
skills/github-prior-art/SKILL.md  # 技能正文（唯一内容源）
test/smoke.mjs                    # 两个服务都在 / 都不在 时的冒烟测试
```

## 开发与验证

```bash
node test/smoke.mjs
```

## 发布到 DSH 插件市场

- 仓库满 1 天、加 `dsh-plugin` topic
- `package.json` 带 `dsh.bundle`（已有）
- 图标：`assets/icon-180.png`（已有）
- 根目录 `screenshots.json`（待补：装好后的技能列表截图）
- 到 [awesome-dsh-plugin](https://github.com/awesome-dsh-plugin/awesome-dsh-plugin) 提 PR，一个插件一个 `data/plugins/<owner>__<repo>.yml`

## License

MIT © 红一角 (yuanzephyr920-oss)
