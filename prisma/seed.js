import prisma from '../lib/prisma.js'
import bcrypt from 'bcryptjs'

async function main(){
  const hash = await bcrypt.hash('admin', 10)
  await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: { username: 'admin', passwordHash: hash, role: 'admin' }
  })
  const count = await prisma.article.count()
  if(count === 0){
    await prisma.article.create({ data: {
      title: '示例：健康市场要闻',
      slug: 'demo-article-' + Date.now(),
      content: '<p>这是一个示例文章内容。你可以在后台发布真实的健康研究与解读。</p>',
      excerpt: '这是示例文章摘要。',
      category: '医生',
      coverUrl: '',
    }})
  }
}
main().catch(e=>{ console.error(e); process.exit(1) })
