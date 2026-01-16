import Link from 'next/link';
import Image from 'next/image';
import { getPostBySlug, getPosts } from '@/lib/api';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
    const { slug } = params;

    try {
        const post = await getPostBySlug(slug);

        if (!post) {
            return {
                title: 'Bài viết không tìm thấy',
            };
        }

        return {
            title: `${post.title.rendered} | Tin Tức - Điện Máy Hoàng Lâm`,
            description: post.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 160),
            openGraph: {
                title: post.title.rendered,
                description: post.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 160),
                type: 'article',
                publishedTime: post.date,
                authors: ['Điện Máy Tổng Hợp Hoàng Lâm'],
            },
        };
    } catch (e) {
        return {
            title: 'Bài viết không tìm thấy',
        };
    }
}

export default async function PostDetailPage({ params }) {
    const { slug } = params;

    let post = null;
    let relatedPosts = [];

    try {
        post = await getPostBySlug(slug);
        if (!post) {
            notFound();
        }

        // Get related posts
        const allPosts = await getPosts();
        relatedPosts = allPosts.filter(p => p.id !== post.id).slice(0, 3);
    } catch (e) {
        console.error("Error fetching post:", e);
        notFound();
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Breadcrumb */}
            <div className="bg-white border-b">
                <div className="container-custom py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Link href="/" className="hover:text-red-600 transition-colors">Trang chủ</Link>
                        <span>/</span>
                        <Link href="/tin-tuc" className="hover:text-red-600 transition-colors">Tin tức</Link>
                        <span>/</span>
                        <span className="text-gray-900 font-medium line-clamp-1">{post.title.rendered.replace(/<[^>]*>/g, '')}</span>
                    </div>
                </div>
            </div>

            <div className="container-custom py-12">
                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <article className="lg:col-span-2">
                        {/* Article Header */}
                        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8">
                            {/* Featured Image */}
                            {post._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
                                <div className="aspect-video bg-gradient-to-br from-blue-100 to-red-100 relative overflow-hidden">
                                    <Image
                                        src={post._embedded['wp:featuredmedia'][0].source_url}
                                        alt={post.title.rendered}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            )}

                            <div className="p-8 md:p-12">
                                {/* Meta Info */}
                                <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-600">
                                    <div className="flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <span>{new Date(post.date).toLocaleDateString('vi-VN', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        <span>Admin</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                        <span>1,234 lượt xem</span>
                                    </div>
                                </div>

                                {/* Title */}
                                <h1
                                    className="text-4xl md:text-5xl font-black mb-6 text-gray-900 leading-tight"
                                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                                />

                                {/* Excerpt */}
                                <div
                                    className="text-xl text-gray-700 leading-relaxed mb-8 pb-8 border-b-2 border-gray-100 font-medium italic"
                                    dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                                />

                                {/* Content */}
                                <div
                                    className="prose prose-lg max-w-none
                    prose-headings:font-black prose-headings:text-gray-900
                    prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-l-4 prose-h2:border-red-600 prose-h2:pl-4
                    prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                    prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
                    prose-a:text-red-600 prose-a:font-bold prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-gray-900 prose-strong:font-black
                    prose-ul:my-6 prose-li:text-gray-700 prose-li:mb-2
                    prose-img:rounded-2xl prose-img:shadow-lg
                    prose-blockquote:border-l-4 prose-blockquote:border-red-600 prose-blockquote:bg-red-50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:italic prose-blockquote:text-gray-800"
                                    dangerouslySetInnerHTML={{ __html: post.content.rendered }}
                                />

                                {/* Tags */}
                                <div className="mt-12 pt-8 border-t-2 border-gray-100">
                                    <div className="flex flex-wrap items-center gap-3">
                                        <span className="font-black text-gray-900">Tags:</span>
                                        <div className="flex flex-wrap gap-2">
                                            <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-bold hover:bg-red-600 hover:text-white transition-colors cursor-pointer">
                                                Máy may công nghiệp
                                            </span>
                                            <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-bold hover:bg-red-600 hover:text-white transition-colors cursor-pointer">
                                                Công nghệ
                                            </span>
                                            <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-bold hover:bg-red-600 hover:text-white transition-colors cursor-pointer">
                                                Kinh nghiệm
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Share Buttons */}
                                <div className="mt-8 pt-8 border-t-2 border-gray-100">
                                    <div className="flex items-center gap-4">
                                        <span className="font-black text-gray-900">Chia sẻ:</span>
                                        <div className="flex gap-3">
                                            <button className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                                                <span className="font-bold">f</span>
                                            </button>
                                            <button className="w-10 h-10 bg-blue-400 text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                                                <span className="font-bold">t</span>
                                            </button>
                                            <button className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                                                <span className="font-bold">in</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Author Box */}
                        <div className="bg-gradient-to-r from-blue-900 to-red-600 text-white rounded-2xl p-8 mb-8">
                            <div className="flex items-start gap-6">
                                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-blue-900 font-black text-2xl shrink-0">
                                    HL
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black mb-2">Điện Máy Tổng Hợp Hoàng Lâm</h3>
                                    <p className="text-blue-100 leading-relaxed">
                                        Chuyên gia hàng đầu trong lĩnh vực cung cấp thiết bị may mặc công nghiệp.
                                        Chia sẻ kiến thức, kinh nghiệm và xu hướng mới nhất trong ngành.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </article>

                    {/* Sidebar */}
                    <aside className="lg:col-span-1">
                        {/* Related Posts */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 sticky top-24">
                            <h3 className="text-2xl font-black mb-6 border-b-2 border-red-600 pb-3">
                                Bài Viết Liên Quan
                            </h3>
                            <div className="space-y-6">
                                {relatedPosts.length > 0 ? relatedPosts.map((relatedPost) => (
                                    <Link key={relatedPost.id} href={`/tin-tuc/${relatedPost.slug}`}>
                                        <div className="group cursor-pointer">
                                            <div className="aspect-video bg-gray-100 rounded-xl mb-3 overflow-hidden relative">
                                                {relatedPost._embedded?.['wp:featuredmedia']?.[0]?.source_url ? (
                                                    <Image
                                                        src={relatedPost._embedded['wp:featuredmedia'][0].source_url}
                                                        alt={relatedPost.title.rendered}
                                                        fill
                                                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-300 text-3xl">📄</div>
                                                )}
                                            </div>
                                            <h4
                                                className="font-bold text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2 leading-tight"
                                                dangerouslySetInnerHTML={{ __html: relatedPost.title.rendered }}
                                            />
                                            <p className="text-sm text-gray-500 mt-2">
                                                {new Date(relatedPost.date).toLocaleDateString('vi-VN')}
                                            </p>
                                        </div>
                                    </Link>
                                )) : (
                                    <p className="text-gray-500 text-sm italic">Chưa có bài viết liên quan</p>
                                )}
                            </div>
                        </div>

                        {/* CTA Box */}
                        <div className="bg-gradient-to-br from-red-600 to-red-700 text-white rounded-2xl p-6 text-center">
                            <div className="text-4xl mb-4">📞</div>
                            <h3 className="text-xl font-black mb-3">Cần Tư Vấn?</h3>
                            <p className="text-red-100 mb-6 text-sm">
                                Liên hệ ngay với chúng tôi để được hỗ trợ tốt nhất
                            </p>
                            <a
                                href="tel:0914639068"
                                className="block bg-white text-red-600 py-3 px-6 rounded-xl font-black hover:bg-gray-100 transition-all"
                            >
                                0914 639 068
                            </a>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
