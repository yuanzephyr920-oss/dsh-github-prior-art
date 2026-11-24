/**
 * dsh-github-prior-art —— host 半端
 * ============================================================================
 * 一件事：让「造东西之前先查 GitHub」变成 DSH 的常驻规矩，而不是一句口号。
 *
 *  1. systemPrompt.section：每次请求都带的短规矩（约 6 行），保证 agent 真会先搜。
 *  2. skills.register：完整检索步骤（`skills/github-prior-art/SKILL.md`），
 *     命中 `github-prior-art` 时按需加载，不进常驻上下文。
 *
 * 两个服务都用 ctx.get 取（Cordis 的 inject 只有"必需"语义，没有 optional），
 * 宿主没有它们时插件照常加载、只是少一半能力。
 * 所以**不要**改用户的 AGENTS.md —— 规矩由插件注入，卸载即失效，互不污染。
 * ============================================================================
 */
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

export const name = 'github-prior-art'

const SKILL_FILE = fileURLToPath(new URL('./skills/github-prior-art/SKILL.md', import.meta.url))

/** 常驻短规矩：只写"必须做/不必做/怎么算做完"，细节全在技能里，省 token。 */
const RULE = `## 造东西前先查 GitHub（防重复造轮）

从零新建项目、新功能、新插件、新工具、新算法、新页面之前，先做一轮检索：用 \`gh_repo_search\` 搜 2–3 组关键词（英文核心词 / \`<词> in:name,description,readme\` / \`awesome <领域>\`），挑 3–5 个候选看 **star、最近提交、许可证、形态**；动手前用 3 行写清「候选 / 决定（直接依赖·fork·只借结构·自建）/ 理由」。
修 bug、小改、既有代码续写、配置与文档不必查；用户说「别搜了」就跳过并在回答里注明。检索流程与判断标准见技能 \`github-prior-art\`。`

const FRONTMATTER = /^---\r?\n[\s\S]*?\r?\n---\r?\n/

function stripFrontmatter(text) {
  return text.replace(FRONTMATTER, '')
}

function descriptionOf(text) {
  const match = /^description:\s*(.+)$/m.exec(text)
  if (!match) return ''
  return match[1].trim().replace(/^["']|["']$/g, '')
}

export function apply(ctx) {
  const skills = ctx.get?.('skills')
  if (skills) {
    try {
      const raw = readFileSync(SKILL_FILE, 'utf8')
      skills.register({
        name: 'github-prior-art',
        description: descriptionOf(raw),
        content: stripFrontmatter(raw),
      })
    } catch (error) {
      ctx.logger?.('github-prior-art')?.warn?.(`技能注册失败：${error.message}`)
    }
  }

  const systemPrompt = ctx.get?.('systemPrompt')
  if (systemPrompt) {
    systemPrompt.section({ name: 'github-prior-art', order: 900, text: RULE })
  }
}
