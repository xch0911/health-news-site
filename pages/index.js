import Link from 'next/link'
import prisma from '../lib/prisma'
import Head from 'next/head'

// SVG Icons
const LeafIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177 7.547 7.547 0 01-1.705-1.715.75.75 0 00-1.152-.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 011.925-3.545 3.75 3.75 0 013.255 3.717z" clipRule="evenodd" />
  </svg>
)

const CalendarIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0h18M5.25 12h13.5h-13.5zm13.5 3.75h-13.5h13.5z" />
    </svg>
)

// 工具函数
const stripHtmlTags = (html) => {
    if (!html) return '';
    const plainText = html.replace(/<[^>]*>/g, '');
    return plainText.replace(/\s+/g, ' ').trim();
};

export default function Home({ articles, currentPage, totalPages }) {
    // 生成页码导航
    const renderPagination = () => {
        const pages = [];
        const btnClass = "px-4 py-2 mx-1 rounded-lg text-sm font-medium transition-colors duration-200 border";
        const activeClass = "bg-emerald-600 text-white border-emerald-600 shadow-sm";
        const inactiveClass = "bg-white text-slate-600 border-slate-200 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200";
        const disabledClass = "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed";

        // 首页
        pages.push(
            <Link key="first" href={`/?page=1`}>
                <a className={`${btnClass} ${currentPage === 1 ? disabledClass : inactiveClass}`}>
                    首页
                </a>
            </Link>
        );

        // 上一页
        pages.push(
            <Link key="prev" href={`/?page=${Math.max(1, currentPage - 1)}`}>
                <a className={`${btnClass} ${currentPage === 1 ? disabledClass : inactiveClass}`}>
                    上一页
                </a>
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

        // 下一页
        pages.push(
            <Link key="next" href={`/?page=${Math.min(totalPages, currentPage + 1)}`}>
                <a className={`${btnClass} ${currentPage === totalPages ? disabledClass : inactiveClass}`}>
                    下一页
                </a>
            </Link>
        );

        // 末页
        pages.push(
            <Link key="last" href={`/?page=${totalPages}`}>
                <a className={`${btnClass} ${currentPage === totalPages ? disabledClass : inactiveClass}`}>
                    末页
                </a>
            </Link>
        );

        return pages;
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
            <Head>
                <title>亚洲健康研究 - 发现健康生活</title>
                <meta name="description" content="从亚洲出发，定义健康新标准" />
            </Head>

            {/* Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <LeafIcon className="w-8 h-8 text-emerald-600" />
                        <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                            亚洲健康研究
                        </span>
                    </div>
                    <nav className="hidden md:flex space-x-8">
                        <Link href="/"><a className="text-slate-600 hover:text-emerald-600 font-medium">首页</a></Link>
                        <Link href="#"><a className="text-slate-600 hover:text-emerald-600 font-medium">健康资讯</a></Link>
                        <Link href="#"><a className="text-slate-600 hover:text-emerald-600 font-medium">专家观点</a></Link>
                        <Link href="#"><a className="text-slate-600 hover:text-emerald-600 font-medium">关于我们</a></Link>
                    </nav>
                     {/* mobile menu placeholder */}
                    <div className="md:hidden">
                        <button className="text-slate-500 hover:text-emerald-600">
                             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                        </button>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <div className="bg-gradient-to-br from-emerald-100 via-teal-50 to-white py-16 sm:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
                        探索<span className="text-emerald-600">更健康</span>的生活方式
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg text-slate-600 mb-8">
                        汇集亚洲前沿健康资讯，为您提供科学、实用的生活指南。
                    </p>
                    {/* Search Bar Placeholder potentially */}
                </div>
            </div>

            {/* Main Content */}
            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
                <div className="flex justify-between items-end mb-8 border-b border-slate-200 pb-4">
                    <h2 className="text-2xl font-bold text-slate-800 flex items-center">
                        <span className="bg-emerald-600 w-1.5 h-6 rounded mr-3"></span>
                        最新文章
                    </h2>
                </div>

                {articles.length > 0 ? (
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {articles.map(a => (
                            <Link key={a.id} href={`/articles/${a.id}`}>
                                <a className="group block bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 overflow-hidden flex flex-col h-full ring-1 ring-slate-900/5 hover:ring-emerald-500/30 hover:-translate-y-1">
                                    {/* Cover Image or Fallback */}
                                    <div className="aspect-w-16 aspect-h-9 bg-slate-100 relative overflow-hidden h-48">
                                        {a.coverUrl ? (
                                            <img src={a.coverUrl} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt={a.title} />
                                        ) : (
                                           <div className="w-full h-full flex items-center justify-center bg-emerald-50 text-emerald-200">
                                               <LeafIcon className="w-16 h-16 opacity-50" />
                                           </div>
                                        )}
                                        <div className="absolute top-4 left-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/90 text-emerald-800 backdrop-blur-sm shadow-sm">
                                                健康资讯
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <div className="p-6 flex flex-col flex-1">
                                        <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-emerald-700 transition-colors">
                                            {a.title}
                                        </h3>
                                        <p className="text-slate-600 mb-4 line-clamp-3 text-sm leading-relaxed flex-grow">
                                            {a.excerpt || (stripHtmlTags(a.content).slice(0, 100) + '...')}
                                        </p>
                                        
                                        <div className="mt-auto pt-4 flex items-center justify-between text-sm text-slate-400 border-t border-slate-100">
                                            <div className="flex items-center space-x-2">
                                                 <CalendarIcon className="w-4 h-4" />
                                                 <span>{new Date(a.createdAt).toLocaleDateString('zh-CN')}</span>
                                            </div>
                                            <span className="text-emerald-600 font-medium group-hover:underline">阅读全文 &rarr;</span>
                                        </div>
                                    </div>
                                </a>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-slate-200">
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-emerald-100 mb-4">
                             <LeafIcon className="h-6 w-6 text-emerald-600" />
                        </div>
                        <h3 className="mt-2 text-sm font-medium text-slate-900">暂无文章</h3>
                        <p className="mt-1 text-sm text-slate-500">稍后再来看看吧。</p>
                    </div>
                )}
            </main>

            {/* 分页导航 */}
            {totalPages > 1 && (
                <div className="flex justify-center my-12">
                    {renderPagination()}
                </div>
            )}
            
            <footer className="bg-slate-900 text-slate-400 py-12 mt-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                           <LeafIcon className="w-6 h-6 text-emerald-500" />
                           <span className="text-white font-bold text-lg">亚洲健康研究</span>
                        </div>
                        <p className="text-sm">致力于提供最前沿、最科学的亚洲健康资讯与研究报告。</p>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-4">快速链接</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/"><a className="hover:text-emerald-400">首页</a></Link></li>
                            <li><Link href="#"><a className="hover:text-emerald-400">关于我们</a></Link></li>
                            <li><Link href="#"><a className="hover:text-emerald-400">联系方式</a></Link></li>
                        </ul>
                    </div>
                    <div>
                         <h4 className="text-white font-bold mb-4">订阅我们</h4>
                         <p className="text-sm mb-4">获取最新的健康资讯推送</p>
                         {/* Fake form */}
                         <div className="flex">
                             <input type="email" placeholder="您的邮箱" className="bg-slate-800 text-white px-4 py-2 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 w-full" />
                             <button className="bg-emerald-600 text-white px-4 py-2 rounded-r-lg hover:bg-emerald-700">订阅</button>
                         </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-800 text-center text-xs">
                     &copy; {new Date().getFullYear()} 亚洲健康研究. All rights reserved.
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
