import Link from 'next/link';
import { getPosts } from '@/lib/api';

export const metadata = {
    title: "Tin Tức - Chia Sẻ | Điện Máy Tổng Hợp Hoàng Lâm | Kiến Thức Ngành May",
    description: "Cập nhật tin tức mới nhất về ngành may mặc, xu hướng công nghệ, kinh nghiệm vận hành máy may công nghiệp. Chia sẻ kiến thức chuyên sâu từ chuyên gia.",
    keywords: "tin tức may mặc, xu hướng công nghệ may, kinh nghiệm vận hành máy may, bảo dưỡng máy công nghiệp",
    openGraph: {
        title: "Tin Tức & Chia Sẻ - Điện Máy Tổng Hợp Hoàng Lâm",
        description: "Cập nhật tin tức, xu hướng và kiến thức chuyên sâu về ngành may mặc",
        type: "website",
    },
};

export default async function NewsPage() {
    let posts = [];
    let featuredPost = null;

    try {
        const allPosts = await getPosts();
        if (allPosts && allPosts.length > 0) {
            featuredPost = allPosts[0];
            posts = allPosts.slice(1);
        }
    } catch (e) {
        console.error("Error fetching posts:", e);
    }

    const categories = [
        { name: "Tất cả", slug: "all", icon: "📰" },
        { name: "Xu hướng", slug: "xu-huong", icon: "📈" },
        { name: "Công nghệ", slug: "cong-nghe", icon: "⚙️" },
        { name: "Kinh nghiệm", slug: "kinh-nghiem", icon: "💡" },
        { name: "Bảo dưỡng", slug: "bao-duong", icon: "🔧" },
    ];

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-900 to-red-600 text-white py-16">
                <div className="container-custom">
                    <div className="max-w-3xl">
                        <h1 className="text-5xl md:text-6xl font-black mb-4 uppercase">
                            Tin Tức & Chia Sẻ
                        </h1>
                        <p className="text-xl text-blue-100">
                            Cập nhật những thông tin mới nhất về ngành may mặc, công nghệ và kinh nghiệm vận hành
                        </p>
                    </div>
                </div>
            </section>

            {/* Category Filter */}
            <section className="bg-white border-b sticky top-0 z-50 shadow-sm">
                <div className="container-custom py-4">
                    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                        {categories.map((cat, index) => (
                            <button
                                key={index}
                                className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm whitespace-nowrap transition-all ${index === 0
                                        ? 'bg-red-600 text-white shadow-lg'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                <span>{cat.icon}</span>
                                <span>{cat.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            <div className="container-custom py-12">
                {/* Featured Post */}
                {featuredPost && (
                    <section className="mb-16">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="h-8 w-2 bg-red-600"></div>
                            <h2 className="text-3xl font-black uppercase">Bài Viết Nổi Bật</h2>
                        </div>

                        <Link href={`/tin-tuc/${featuredPost.slug}`}>
                            <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all group">
                                <div className="grid md:grid-cols-2 gap-0">
                                    <div className="aspect-video md:aspect-auto bg-gradient-to-br from-blue-100 to-red-100 flex items-center justify-center relative overflow-hidden">
                                        {featuredPost._embedded?.['wp:featuredmedia']?.[0]?.source_url ? (
                                            <img
                                                src={featuredPost._embedded['wp:featuredmedia'][0].source_url}
                                                alt={featuredPost.title.rendered}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="text-6xl opacity-30">📰</div>
                                        )}
                                        <div className="absolute top-6 left-6 bg-red-600 text-white px-4 py-2 rounded-full font-black text-sm uppercase">
                                            Nổi bật
                                        </div>
                                    </div>
                                    <div className="p-8 md:p-12 flex flex-col justify-center">
                                        <div className="flex items-center gap-3 mb-4 text-sm text-gray-500">
                                            <span className="flex items-center gap-1">
                                                📅 {new Date(featuredPost.date).toLocaleDateString('vi-VN')}
                                            </span>
                                            <span>•</span>
                                            <span className="flex items-center gap-1">
                                                👤 Admin
                                            </span>
                                        </div>
                                        <h3
                                            className="text-3xl md:text-4xl font-black mb-4 text-gray-900 group-hover:text-red-600 transition-colors leading-tight"
                                            dangerouslySetInnerHTML={{ __html: featuredPost.title.rendered }}
                                        />
                                        <div
                                            className="text-gray-600 leading-relaxed mb-6 line-clamp-3"
                                            dangerouslySetInnerHTML={{ __html: featuredPost.excerpt.rendered }}
                                        />
                                        <div className="flex items-center gap-2 text-red-600 font-bold group-hover:gap-4 transition-all">
                                            <span>Đọc tiếp</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </section>
                )}

                {/* Posts Grid */}
                <section>
                    <div className="flex items-center gap-3 mb-8">
                        <div className="h-8 w-2 bg-red-600"></div>
                        <h2 className="text-3xl font-black uppercase">Bài Viết Mới Nhất</h2>
                    </div>

                    {posts.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.map((post) => (
                                <Link key={post.id} href={`/tin-tuc/${post.slug}`}>
                                    <article className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all group h-full flex flex-col">
                                        <div className="aspect-video bg-gradient-to-br from-gray-100 to-blue-50 flex items-center justify-center relative overflow-hidden">
                                            {post._embedded?.['wp:featuredmedia']?.[0]?.source_url ? (
                                                <img
                                                    src={post._embedded['wp:featuredmedia'][0].source_url}
                                                    alt={post.title.rendered}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                            ) : (
                                                <div className="text-5xl opacity-20">📄</div>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        </div>
                                        <div className="p-6 flex-1 flex flex-col">
                                            <div className="flex items-center gap-2 mb-3 text-xs text-gray-500">
                                                <span className="flex items-center gap-1">
                                                    📅 {new Date(post.date).toLocaleDateString('vi-VN')}
                                                </span>
                                            </div>
                                            <h3
                                                className="text-xl font-black mb-3 text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2 leading-tight flex-1"
                                                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                                            />
                                            <div
                                                className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3"
                                                dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                                            />
                                            <div className="flex items-center gap-2 text-red-600 font-bold text-sm group-hover:gap-3 transition-all">
                                                <span>Xem chi tiết</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </div>
                                        </div>
                                    </article>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <div className="text-6xl mb-4 opacity-20">📭</div>
                            <p className="text-xl text-gray-500 font-medium">Chưa có bài viết nào được xuất bản</p>
                            <p className="text-gray-400 mt-2">Vui lòng quay lại sau để xem nội dung mới nhất</p>
                        </div>
                    )}
                </section>

                {/* Pagination (placeholder) */}
                {posts.length > 0 && (
                    <div className="mt-16 flex justify-center gap-2">
                        <button className="px-4 py-2 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition-colors">
                            1
                        </button>
                        <button className="px-4 py-2 bg-white text-gray-700 rounded-lg font-bold hover:bg-gray-100 transition-colors border">
                            2
                        </button>
                        <button className="px-4 py-2 bg-white text-gray-700 rounded-lg font-bold hover:bg-gray-100 transition-colors border">
                            3
                        </button>
                        <button className="px-4 py-2 bg-white text-gray-700 rounded-lg font-bold hover:bg-gray-100 transition-colors border">
                            →
                        </button>
                    </div>
                )}
            </div>

            {/* Newsletter CTA */}
            <section className="bg-gradient-to-r from-blue-900 to-red-600 text-white py-16 mt-12">
                <div className="container-custom text-center">
                    <h2 className="text-3xl md:text-4xl font-black mb-4 uppercase">
                        Đăng Ký Nhận Tin Tức
                    </h2>
                    <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                        Nhận những bài viết mới nhất, xu hướng công nghệ và ưu đãi đặc biệt qua email
                    </p>
                    <div className="max-w-md mx-auto flex gap-3">
                        <input
                            type="email"
                            placeholder="Nhập email của bạn..."
                            className="flex-1 px-6 py-4 rounded-xl text-gray-900 font-medium focus:outline-none focus:ring-4 focus:ring-white/30"
                        />
                        <button className="bg-white text-red-600 px-8 py-4 rounded-xl font-black hover:bg-gray-100 transition-all shadow-xl whitespace-nowrap">
                            Đăng Ký
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
