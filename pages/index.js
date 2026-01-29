import Link from 'next/link'
import prisma from '../lib/prisma'
import Head from 'next/head'

// Icons - More minimalist/scientific
const ResearchIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
)

const ArrowRightIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
    </svg>
)

// 工具函数
const stripHtmlTags = (html) => {
    if (!html) return '';
    const plainText = html.replace(/<[^>]*>/g, '');
    return plainText.replace(/\s+/g, ' ').trim();
};

export default function Home({ articles, currentPage, totalPages }) {
    // 生成页码导航 - 更简洁的样式
    const renderPagination = () => {
        const pages = [];
        const btnClass = "px-3 py-1 mx-0.5 text-sm font-medium transition-colors duration-200 border border-transparent hover:border-slate-300 rounded-sm";
        const activeClass = "text-teal-900 border-slate-300 bg-slate-50";
        const inactiveClass = "text-slate-500 hover:text-teal-800";
        const disabledClass = "text-slate-300 cursor-not-allowed";

        // 首页
        pages.push(
            <Link key="first" href={`/?page=1`}>
                <a className={`${btnClass} ${currentPage === 1 ? disabledClass : inactiveClass}`}>&laquo;</a>
            </Link>
        );

        // 页码
        const startPage = Math.max(1, currentPage - 2);
        const endPage = Math.min(totalPages, currentPage + 2);

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <Link key={i} href={`/?page=${i}`}>
                    <a className={`${btnClass} ${currentPage === i ? activeClass : inactiveClass}`}>
                        {i}
                    </a>
                </Link>
            );
        }

        // 末页
        pages.push(
            <Link key="last" href={`/?page=${totalPages}`}>
                <a className={`${btnClass} ${currentPage === totalPages ? disabledClass : inactiveClass}`}>&raquo;</a>
            </Link>
        );

        return pages;
    };

    return (
        <div className="min-h-screen bg-white flex flex-col font-sans text-slate-900">
            <Head>
                <title>亚洲健康研究</title>
                <meta name="description" content="基于循证医学的亚洲健康洞察" />
            </Head>

            {/* Top Bar - Very Academic */}
            <div className="bg-slate-900 text-slate-300 text-xs py-1">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <span>Institute for Asian Health Research</span>
                    <div className="space-x-4">
                        <a href="#" className="hover:text-white">Subscribe</a>
                        <a href="#" className="hover:text-white">Log in</a>
                    </div>
                </div>
            </div>

            {/* Header */}
            <header className="border-b-2 border-slate-100 sticky top-0 bg-white z-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        <div className="bg-teal-900 text-white p-1.5 rounded-sm">
                             <ResearchIcon className="w-6 h-6" />
                        </div>
                        <span className="text-2xl font-serif font-bold text-slate-900 tracking-tight">
                            Asian Health Research
                        </span>
                    </div>
                    <nav className="hidden md:flex space-x-8 text-sm font-semibold tracking-wide uppercase text-slate-600">
                        <Link href="/"><a className="hover:text-teal-900 border-b-2 border-transparent hover:border-teal-900 pb-1 transition-all">首页</a></Link>
                        <Link href="#"><a className="hover:text-teal-900 border-b-2 border-transparent hover:border-teal-900 pb-1 transition-all">临床研究</a></Link>
                        <Link href="#"><a className="hover:text-teal-900 border-b-2 border-transparent hover:border-teal-900 pb-1 transition-all">公共卫生</a></Link>
                        <Link href="#"><a className="hover:text-teal-900 border-b-2 border-transparent hover:border-teal-900 pb-1 transition-all">政策洞察</a></Link>
                        {/*<Link href="/admin"><a className="text-teal-800">Admin</a></Link>*/}
                    </nav>
                </div>
            </header>

            {/* Hero Section - Clean, Typography focused */}
            <div className="bg-slate-50 border-b border-slate-200">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
                    <div className="md:col-span-2">
                        <span className="text-teal-800 font-bold tracking-wider uppercase text-xs mb-2 block">Featured Topic</span>
                        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-slate-900 mb-6 leading-tight">
                            循证医学视野下的<br/>亚洲老龄化挑战与机遇
                        </h1>
                        <p className="text-xl text-slate-600 mb-8 font-light leading-relaxed">
                            深度解析从东亚到东南亚的公共卫生数据，探索长寿时代的健康策略与医疗创新。
                        </p>
                        <a href="#" className="inline-flex items-center text-teal-900 font-semibold hover:underline">
                            阅读报告概览 <ArrowRightIcon className="w-4 h-4 ml-1" />
                        </a>
                    </div>
                    {/* Abstract illustration placeholder using CSS patterns */}
                    <div className="h-64 bg-slate-200 relative overflow-hidden rounded-sm hidden md:block">
                        <div className="absolute inset-0 bg-white opacity-50" style={{ backgroundImage: 'radial-gradient(#0f766e 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <ResearchIcon className="w-24 h-24 text-teal-900/10" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content - Two Column Layout (Journal Style) */}
            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12">
                
                {/* Left Column: Article List (8/12) */}
                <div className="lg:col-span-8">
                    <div className="flex items-center justify-between mb-8 border-b border-slate-200 pb-2">
                        <h2 className="text-xl font-bold font-serif text-slate-900 uppercase tracking-wide">最新研究 Briefs</h2>
                    </div>

                    <div className="space-y-10">
                        {articles.length > 0 ? (
                            articles.map(a => (
                                <article key={a.id} className="flex flex-col sm:flex-row gap-6 group">
                                    {/* Thumbnail - Smaller, 4:3 ratio, sharp corners */}
                                    <div className="sm:w-1/3 flex-shrink-0">
                                        <Link href={`/articles/${a.id}`}>
                                            <a className="block aspect-w-4 aspect-h-3 bg-slate-100 overflow-hidden relative border border-slate-200 hover:border-teal-700 transition-colors">
                                                {a.coverUrl ? (
                                                    <img src={a.coverUrl} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt={a.title} />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-300">
                                                        <ResearchIcon className="w-10 h-10" />
                                                    </div>
                                                )}
                                            </a>
                                        </Link>
                                    </div>
                                    
                                    <div className="flex-1 flex flex-col justify-between py-1">
                                        <div>
                                            <div className="flex items-center space-x-2 text-xs font-semibold text-teal-800 mb-2 uppercase tracking-wide">
                                                <span>Research</span>
                                                <span className="text-slate-300">|</span>
                                                <span>Health Policy</span>
                                            </div>
                                            <Link href={`/articles/${a.id}`}>
                                                <a>
                                                    <h3 className="text-2xl font-serif font-bold text-slate-900 mb-3 group-hover:text-teal-900 leading-tight">
                                                        {a.title}
                                                    </h3>
                                                </a>
                                            </Link>
                                            <p className="text-slate-600 text-sm leading-relaxed line-clamp-2 mb-4">
                                                {a.excerpt || stripHtmlTags(a.content)}
                                            </p>
                                        </div>
                                        
                                        <div className="text-xs text-slate-400 font-mono mt-auto pt-2 border-t border-slate-50 flex items-center space-x-4">
                                            <span>{new Date(a.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                                            {/*<span>Vol. 24, Issue 3</span>*/}
                                        </div>
                                    </div>
                                </article>
                            ))
                        ) : (
                            <div className="py-12 text-center text-slate-500 italic border border-slate-100 bg-slate-50">
                                暂无研究文章数据
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="mt-16 pt-8 border-t border-slate-200 flex justify-center">
                            {renderPagination()}
                        </div>
                    )}
                </div>

                {/* Right Column: Sidebar (4/12) - Sticky */}
                <aside className="lg:col-span-4 space-y-12">
                    
                    {/* Trending / Top Reads */}
                    <div className="bg-slate-50 p-6 border border-slate-100">
                        <h4 className="font-serif font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">热门阅读</h4>
                        <ol className="list-decimal list-inside space-y-4 text-sm">
                            <li className="pl-2 marker:font-bold marker:text-teal-800">
                                <a href="#" className="hover:text-teal-800 text-slate-700 font-medium">2026年亚洲糖尿病流行病学报告更新</a>
                            </li>
                            <li className="pl-2 marker:font-bold marker:text-teal-800">
                                <a href="#" className="hover:text-teal-800 text-slate-700 font-medium">心血管健康：新一代药物的临床表现</a>
                            </li>
                            <li className="pl-2 marker:font-bold marker:text-teal-800">
                                <a href="#" className="hover:text-teal-800 text-slate-700 font-medium">远程医疗在东南亚农村区域的实践</a>
                            </li>
                        </ol>
                    </div>

                    {/* Newsletter - Minimal */}
                    <div>
                        <h4 className="font-serif font-bold text-slate-900 mb-3">Newsletter</h4>
                        <p className="text-sm text-slate-600 mb-4">获取最新的健康研究摘要，每周发送。</p>
                        <form className="flex flex-col space-y-2">
                             <input type="email" placeholder="Email Address" className="px-3 py-2 border border-slate-300 text-sm focus:outline-none focus:border-teal-800" />
                             <button className="bg-slate-900 text-white px-4 py-2 text-sm font-semibold hover:bg-slate-800 transition-colors">Subscribe</button>
                        </form>
                    </div>

                    {/* Keywords */}
                    <div>
                        <h4 className="font-serif font-bold text-slate-900 mb-3 text-sm uppercase text-slate-500">Keywords</h4>
                        <div className="flex flex-wrap gap-2">
                            {['Public Health', 'Epidemiology', 'Nutrition', 'Mental Health', 'Policy', 'Genetics'].map(tag => (
                                <a key={tag} href="#" className="px-2 py-1 bg-white border border-slate-200 text-xs text-slate-600 hover:border-teal-800 hover:text-teal-800 transition-colors">
                                    {tag}
                                </a>
                            ))}
                        </div>
                    </div>

                </aside>
            </main>

            
            <footer className="bg-white border-t border-slate-200 mt-12 py-12">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm text-slate-600">
                    <div className="col-span-1 md:col-span-1">
                         <div className="flex items-center space-x-2 mb-4">
                            <ResearchIcon className="w-5 h-5 text-teal-900" />
                            <span className="font-serif font-bold text-slate-900">AHR</span>
                        </div>
                    </div>
                    <div>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-teal-900">About the Institute</a></li>
                            <li><a href="#" className="hover:text-teal-900">Editorial Board</a></li>
                            <li><a href="#" className="hover:text-teal-900">Careers</a></li>
                        </ul>
                    </div>
                    <div>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-teal-900">Submit a Paper</a></li>
                            <li><a href="#" className="hover:text-teal-900">Research Integrity</a></li>
                            <li><a href="#" className="hover:text-teal-900">Privacy Policy</a></li>
                        </ul>
                    </div>
                    <div className="text-right md:text-right text-xs text-slate-400">
                        <p>&copy; {new Date().getFullYear()} Asian Health Research.</p>
                        <p>All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export async function getServerSideProps(context) {
    // 每页显示的文章数量
    const PAGE_SIZE = 10;

    // 从URL参数获取当前页码，默认为1
    const page = parseInt(context.query.page) || 1;

    // 计算跳过的文章数量（分页偏移量）
    const skip = (page - 1) * PAGE_SIZE;

    // 并行查询：获取当前页文章和总文章数
    const [articles, totalCount] = await Promise.all([
        prisma.article.findMany({
            orderBy: { createdAt: 'desc' },
            take: PAGE_SIZE,
            skip: skip
        }),
        prisma.article.count()
    ]);

    // 计算总页数
    const totalPages = Math.ceil(totalCount / PAGE_SIZE);

    // 如果请求的页码超过总页数，重定向到最后一页
    if (page > totalPages && totalPages > 0) {
        return {
            redirect: {
                destination: `//?page=${totalPages}`,
                permanent: false
            }
        };
    }

    return {
        props: {
            articles: JSON.parse(JSON.stringify(articles)),
            currentPage: page,
            totalPages: totalPages
        }
    };
}
