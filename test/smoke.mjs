import assert from 'node:assert/strict'
import { apply } from '../index.js'

const registered = []
const sections = []

const ctx = {
  get(name) {
    if (name === 'skills') return { register: (skill) => registered.push(skill) }
    if (name === 'systemPrompt') return { section: (section) => sections.push(section) }
    return undefined
  },
}

apply(ctx)

assert.equal(registered.length, 1, '应当注册 1 个技能')
assert.equal(registered[0].name, 'github-prior-art')
assert.ok(registered[0].description.length > 0, '技能描述不能为空')
assert.ok(registered[0].content.includes('## 第一步：搜'), '技能正文应包含检索步骤')
assert.ok(!registered[0].content.startsWith('---'), '正文应去掉 frontmatter')

assert.equal(sections.length, 1, '应当注册 1 个常驻段落')
assert.ok(sections[0].text.includes('gh_repo_search'), '常驻规矩应包含检索工具')
assert.ok(sections[0].text.length < 800, '常驻规矩要短，别把细节塞进来')

// 宿主没有这两个服务时，插件必须照常加载
apply({ get: () => undefined })

console.log('ok: 技能 + 常驻规矩 注册正常')
