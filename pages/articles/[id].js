import prisma from '../../lib/prisma'
import Head from 'next/head'
import Link from 'next/link'

// Icons - Scientific
const ResearchIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
)

const PrintIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
    </svg>
)

const ShareIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.287.696.287 1.093m0-1.093a2.25 2.25 0 000-2.186m0 4.372a2.25 2.25 0 000 2.186m2.59-4.372l6.095 3.5m-6.095-8.204l6.095 3.5m0 0a2.25 2.25 0 100-4.372m0 4.372a2.25 2.25 0 000 4.372" />
    </svg>
)

export default function Article({ article }) {
  if (!article) return (
      <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="text-center p-8 bg-slate-50 border border-slate-200">
              <h2 className="text-lg font-serif font-bold text-slate-800">Article Not Found</h2>
              <Link href="/"><a className="text-teal-800 hover:underline mt-4 block text-sm">Return Home</a></Link>
          </div>
      </div>
  )

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-slate-900">
      <Head>
        <title>{article.title} - 亚洲健康研究</title>
        <meta name="description" content={article.excerpt || article.title} />
      </Head>

      {/* Header (Shared with Home) */}
      <header className="border-b-2 border-slate-100 sticky top-0 bg-white z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
            <Link href="/">
                <a className="flex items-center space-x-3 group">
                    <div className="bg-teal-900 text-white p-1 rounded-sm">
                         <ResearchIcon className="w-5 h-5" />
                    </div>
                    <span className="text-lg font-serif font-bold text-slate-900 group-hover:text-teal-900">
                        Asian Health Research
                    </span>
                </a>
            </Link>
            <nav className="flex space-x-6 text-xs uppercase font-bold tracking-widest text-slate-500">
                <Link href="/"><a className="hover:text-teal-900">Journal Home</a></Link>
                <Link href="#"><a className="hover:text-teal-900 hidden sm:inline">Current Issue</a></Link>
            </nav>
        </div>
      </header>

      <main className="flex-grow max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Sidebar: Article Meta actions (2/12) */}
            <aside className="hidden lg:block lg:col-span-2 space-y-6 pt-2">
                <div className="text-xs text-slate-400 font-mono mb-4">
                    Vol 24, No 3<br/>
                    {new Date(article.createdAt).getFullYear()}
                </div>
                <button className="flex items-center space-x-2 text-slate-600 hover:text-teal-800 text-sm font-medium w-full p-2 hover:bg-slate-50 rounded-sm transition-colors">
                    <PrintIcon className="w-4 h-4" />
                    <span>Print</span>
                </button>
                <button className="flex items-center space-x-2 text-slate-600 hover:text-teal-800 text-sm font-medium w-full p-2 hover:bg-slate-50 rounded-sm transition-colors">
                    <ShareIcon className="w-4 h-4" />
                    <span>Share</span>
                </button>
                <div className="border-t border-slate-100 pt-6">
                    <h5 className="text-xs font-bold text-slate-900 uppercase">Article Sections</h5>
                    <ul className="text-xs text-slate-500 mt-2 space-y-2">
                        <li className="hover:text-teal-800 cursor-pointer">Abstract</li>
                        <li className="hover:text-teal-800 cursor-pointer">Introduction</li>
                        <li className="hover:text-teal-800 cursor-pointer">Methods</li>
                        <li className="hover:text-teal-800 cursor-pointer">Results</li>
                    </ul>
                </div>
            </aside>

            {/* Middle: Main Content (7/12) */}
            <article className="lg:col-span-7">
                {/* Article Header */}
                <header className="mb-10">
                    <div className="flex space-x-2 mb-4">
                        <span className="bg-teal-50 text-teal-800 text-xs px-2 py-1 font-semibold uppercase tracking-wide border border-teal-100">
                             Research Article
                        </span>
                        <span className="bg-slate-50 text-slate-600 text-xs px-2 py-1 font-semibold uppercase tracking-wide border border-slate-100">
                             Open Access
                        </span>
                    </div>
                    
                    <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mb-6 leading-tight">
                        {article.title}
                    </h1>

                    <div className="flex flex-col sm:flex-row sm:items-center text-sm text-slate-600 border-b border-slate-200 pb-6 mb-8 font-serif">
                        <div className="mr-6 mb-2 sm:mb-0">
                            <span className="font-bold text-slate-900">Health News Site Editors</span>
                        </div>
                        <div className="text-slate-500 italic">
                             Published: {new Date(article.createdAt).toLocaleDateString('en-US', {day: 'numeric', month: 'long', year: 'numeric'})}
                        </div>
                        <div className="sm:ml-auto text-slate-400 text-xs mt-2 sm:mt-0 font-sans">
                            Views: {article.views}
                        </div>
                    </div>
                </header>

                {/* Abstract Box (if we had one, simulating one here visually or using excerpt) */}
                <div className="bg-slate-50 p-6 border-l-4 border-teal-800 mb-10">
                    <h3 className="text-sm font-bold uppercase text-slate-900 mb-2">Abstract / Summary</h3>
                    <p className="text-slate-700 font-serif leading-relaxed">
                        {article.excerpt || "This article explores the critical aspects of health in the Asian context, providing evidence-based insights and analysis relevant to policymakers, practitioners, and the general public."}
                    </p>
                </div>

                {/* Main Body */}
                <div dangerouslySetInnerHTML={{ __html: article.content }} className="article-content font-serif text-lg text-slate-800 leading-8" />
                
                {/* References Placeholder */}
                 <div className="mt-16 pt-8 border-t border-slate-200">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">References</h3>
                    <p className="text-sm text-slate-500 italic">No references listed for this article.</p>
                </div>
            </article>

            {/* Right: Related (3/12) */}
            <aside className="lg:col-span-3 space-y-8 lg:border-l lg:border-slate-100 lg:pl-8">
                 {article.coverUrl && (
                    <div className="hidden lg:block mb-6">
                         <img src={article.coverUrl} alt="Cover" className="w-full h-auto border border-slate-200 grayscale hover:grayscale-0 transition-all" />
                         <span className="text-xs text-slate-400 mt-1 block text-center">Figure 1. Article Cover</span>
                    </div>
                )}
                
                <div>
                     <h4 className="font-bold text-slate-900 text-sm uppercase mb-4 tracking-wide pb-2 border-b border-slate-100">Related Articles</h4>
                     <ul className="space-y-4">
                         <li>
                             <a href="#" className="block group">
                                 <span className="text-xs text-teal-800 font-semibold">Policy Brief</span>
                                 <h5 className="text-sm font-serif font-bold text-slate-800 group-hover:text-teal-900 leading-snug mt-1">
                                     Healthcare Financing in Southeast Asia
                                 </h5>
                             </a>
                         </li>
                         <li>
                             <a href="#" className="block group">
                                 <span className="text-xs text-teal-800 font-semibold">Clinical</span>
                                 <h5 className="text-sm font-serif font-bold text-slate-800 group-hover:text-teal-900 leading-snug mt-1">
                                     Urban Mental Health Challenges
                                 </h5>
                             </a>
                         </li>
                     </ul>
                </div>
            </aside>

      </main>

      <footer className="bg-white border-t border-slate-200 py-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-400 font-mono">
                 <p>ISSN 2026-0128 | Asian Health Research Institute</p>
                 <p className="mt-2">&copy; {new Date().getFullYear()} AHR. All rights reserved.</p>
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

