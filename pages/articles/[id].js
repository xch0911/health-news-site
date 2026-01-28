import prisma from '../../lib/prisma'
import Head from 'next/head'
import Link from 'next/link'

// SVG Icons (Reused from index to keep consistency)
const LeafIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177 7.547 7.547 0 01-1.705-1.715.75.75 0 00-1.152-.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 011.925-3.545 3.75 3.75 0 013.255 3.717z" clipRule="evenodd" />
  </svg>
)

const ViewIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

const ClockIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
)

export default function Article({ article }) {
  if (!article) return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="text-center p-8 bg-white rounded-xl shadow-lg">
              <h2 className="text-xl font-bold text-slate-800">文章未找到</h2>
              <Link href="/"><a className="text-emerald-600 hover:underline mt-4 block">返回首页</a></Link>
          </div>
      </div>
  )

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Head>
        <title>{article.title} - 亚洲健康研究</title>
        <meta name="description" content={article.excerpt || article.title} />
      </Head>

      {/* Header (Shared) */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
            <Link href="/">
                <a className="flex items-center space-x-2 group">
                    <LeafIcon className="w-8 h-8 text-emerald-600 transition-transform group-hover:scale-110" />
                    <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                        亚洲健康研究
                    </span>
                </a>
            </Link>
            <nav className="hidden md:flex space-x-8">
                <Link href="/"><a className="text-slate-600 hover:text-emerald-600 font-medium">首页</a></Link>
                <Link href="#"><a className="text-slate-600 hover:text-emerald-600 font-medium">健康资讯</a></Link>
                <Link href="#"><a className="text-slate-600 hover:text-emerald-600 font-medium">专家观点</a></Link>
            </nav>
        </div>
      </header>

      <main className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
            {/* Breadcrumb */}
            <nav className="flex items-center text-sm text-slate-500 mb-8 overflow-x-auto whitespace-nowrap">
                <Link href="/"><a className="hover:text-emerald-600">首页</a></Link>
                <span className="mx-2">/</span>
                <span className="text-slate-800 font-medium truncate">{article.title}</span>
            </nav>

            <article className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                 {/* Article Cover */}
                {article.coverUrl && (
                    <div className="w-full aspect-w-16 aspect-h-8 bg-slate-100">
                         <img src={article.coverUrl} alt="cover" className="w-full h-full object-cover" />
                    </div>
                )}
                
                <div className="p-8 sm:p-12">
                     <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-6">
                         <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                             健康资讯
                         </span>
                         <div className="flex items-center">
                             <ClockIcon className="w-4 h-4 mr-1" />
                             {new Date(article.createdAt).toLocaleDateString('zh-CN')}
                         </div>
                         <div className="flex items-center">
                             <ViewIcon className="w-4 h-4 mr-1" />
                             {article.views} 次阅读
                         </div>
                     </div>

                    <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-8 leading-tight">
                        {article.title}
                    </h1>

                    {/* Divider */}
                    <div className="w-full h-px bg-slate-100 mb-10"></div>

                    {/* Content using custom global css class .article-content */}
                    <div dangerouslySetInnerHTML={{ __html: article.content }} className="article-content" />
                </div>
            </article>

            {/* Back Button */}
            <div className="mt-12 text-center">
                <Link href="/">
                    <a className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-emerald-700 bg-emerald-100 hover:bg-emerald-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors">
                        ← 返回文章列表
                    </a>
                </Link>
            </div>
      </main>

      {/* Footer (Shared) */}
      <footer className="bg-slate-900 text-slate-400 py-12 mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs">
                 &copy; {new Date().getFullYear()} 亚洲健康研究. All rights reserved.
            </div>
      </footer>
    </div>
  )
}

export async function getServerSideProps(ctx) {
  const { id } = ctx.params
  const a = await prisma.article.findUnique({ where: { id: parseInt(id) } })
  if(!a) return { props: { article: null } }
  await prisma.article.update({ where: { id: a.id }, data: { views: a.views + 1 } })
  return { props: { article: JSON.parse(JSON.stringify(a)) } }
}

