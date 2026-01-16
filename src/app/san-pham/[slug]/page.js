import { getProductBySlug } from '@/lib/api';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/config/site';

export async function generateMetadata({ params }) {
    const product = await getProductBySlug(params.slug);

    if (!product) {
        return {
            title: 'Sản phẩm không tồn tại',
        };
    }

    return {
        title: `${product.name} | ${siteConfig.company.name}`,
        description: product.excerpt?.rendered?.replace(/<[^>]*>/g, '') || product.name,
        openGraph: {
            title: product.name,
            description: product.excerpt?.rendered?.replace(/<[^>]*>/g, '') || product.name,
            images: product._embedded?.['wp:featuredmedia']?.[0]?.source_url
                ? [{ url: product._embedded['wp:featuredmedia'][0].source_url }]
                : [],
        },
    };
}

export default async function ProductPage({ params }) {
    const product = await getProductBySlug(params.slug);

    if (!product) {
        notFound();
    }

    const price = Number(product.price || 0);
    const regularPrice = Number(product.regular_price || 0);
    const salePrice = Number(product.sale_price || 0);
    const onSale = product.on_sale;
    const discountPercentage = onSale && regularPrice > 0 ? Math.round(((regularPrice - salePrice) / regularPrice) * 100) : 0;

    const imageUrl = product.images?.[0]?.src;
    const attributes = product.attributes || [];
    const tags = product.tags || [];

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-200">
                <div className="container-custom py-4 px-4">
                    <div className="flex items-center text-sm text-gray-500">
                        <Link href="/" className="hover:text-red-600 transition-colors">Trang chủ</Link>
                        <span className="mx-2">/</span>
                        <Link href="/san-pham" className="hover:text-red-600 transition-colors">Sản phẩm</Link>
                        <span className="mx-2">/</span>
                        <span className="text-gray-900 font-medium truncate max-w-[200px] md:max-w-none">{product.name}</span>
                    </div>
                </div>
            </div>

            <div className="container-custom mt-8 px-4">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-8">
                        {/* Product Image */}
                        <div className="p-6 md:p-8 bg-gray-50 flex items-center justify-center relative group">
                            {imageUrl ? (
                                <div className="relative w-full aspect-square md:aspect-[4/3] rounded-xl overflow-hidden bg-white shadow-sm">
                                    <Image
                                        src={imageUrl}
                                        alt={product.name}
                                        fill
                                        className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                            ) : (
                                <div className="w-full aspect-square md:aspect-[4/3] bg-gray-200 rounded-xl flex items-center justify-center text-gray-400">
                                    <span className="text-xl font-medium">Không có ảnh</span>
                                </div>
                            )}

                            <div className="absolute top-8 left-8 flex flex-col gap-2">
                                <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                                    Chính hãng
                                </span>
                                {onSale && (
                                    <span className="bg-yellow-400 text-red-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg animate-pulse">
                                        Giảm {discountPercentage}%
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Product Details */}
                        <div className="p-6 md:p-10 flex flex-col">
                            <h1 className="text-2xl md:text-4xl font-black text-gray-900 mb-4 leading-tight">
                                {product.name}
                            </h1>

                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex text-yellow-400 text-sm">
                                    {'★'.repeat(5)}
                                </div>
                                <span className="text-gray-400 text-sm">|</span>
                                <span className="text-gray-500 text-sm">Mã SP: <span className="font-mono font-bold text-gray-700">{product.slug}</span></span>
                            </div>

                            <div className="mb-8">
                                {onSale ? (
                                    <div className="flex items-end gap-3">
                                        <p className="text-3xl md:text-4xl font-black text-red-600">
                                            {salePrice.toLocaleString('vi-VN')} đ
                                        </p>
                                        <p className="text-xl text-gray-400 font-bold line-through mb-1">
                                            {regularPrice.toLocaleString('vi-VN')} đ
                                        </p>
                                    </div>
                                ) : (
                                    <p className="text-3xl md:text-4xl font-black text-red-600">
                                        {price > 0
                                            ? `${price.toLocaleString('vi-VN')} đ`
                                            : 'Liên hệ báo giá'}
                                    </p>
                                )}

                                {price > 0 && (
                                    <p className="text-sm text-gray-500 mt-2 font-medium">
                                        * Giá đã bao gồm VAT
                                    </p>
                                )}
                            </div>

                            {/* Attributes Table */}
                            {attributes.length > 0 && (
                                <div className="mb-8 bg-gray-50 rounded-xl p-4 border border-gray-100">
                                    <h3 className="font-bold text-gray-900 mb-3 uppercase text-sm">Thông số kỹ thuật</h3>
                                    <div className="space-y-2">
                                        {attributes.map((attr, index) => (
                                            <div key={index} className="flex justify-between text-sm border-b border-gray-200 last:border-0 pb-2 last:pb-0">
                                                <span className="text-gray-500 font-medium">{attr.name}</span>
                                                <span className="text-gray-900 font-bold text-right">{attr.options.join(', ')}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Tags */}
                            {tags.length > 0 && (
                                <div className="mb-8 flex flex-wrap gap-2">
                                    {tags.map((tag) => (
                                        <span key={tag.id} className="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide hover:bg-gray-200 cursor-pointer transition-colors">
                                            #{tag.name}
                                        </span>
                                    ))}
                                </div>
                            )}

                            <div className="prose prose-sm md:prose-base text-gray-600 mb-8 max-w-none">
                                <div dangerouslySetInnerHTML={{ __html: product.short_description || '' }} />
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                                <Link
                                    href="/lien-he"
                                    className="flex-1 bg-red-600 text-white text-center py-4 rounded-xl font-bold uppercase tracking-wide hover:bg-red-700 transition-all shadow-lg hover:shadow-red-200 transform hover:-translate-y-1"
                                >
                                    Liên hệ mua ngay
                                </Link>
                                <a
                                    href={`tel:${siteConfig.contact?.phone || ''}`}
                                    className="flex-1 bg-white text-gray-900 border-2 border-gray-200 text-center py-4 rounded-xl font-bold uppercase tracking-wide hover:border-red-600 hover:text-red-600 transition-all"
                                >
                                    Tư vấn: {siteConfig.contact?.phone || '0909.xxx.xxx'}
                                </a>
                            </div>

                            <div className="mt-8 pt-8 border-t border-gray-100 grid grid-cols-2 gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 text-xl">🛡️</div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase font-bold">Bảo hành</p>
                                        <p className="text-sm font-bold text-gray-900">12 Tháng</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600 text-xl">🚚</div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase font-bold">Vận chuyển</p>
                                        <p className="text-sm font-bold text-gray-900">Toàn quốc</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Product Description */}
                    <div className="mt-12 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                            <h3 className="text-lg font-bold uppercase text-gray-900">Chi tiết sản phẩm</h3>
                        </div>
                        <div className="p-6 md:p-10">
                            <div
                                className="prose prose-lg max-w-none prose-headings:font-bold prose-a:text-red-600 hover:prose-a:text-red-700 prose-img:rounded-xl"
                                dangerouslySetInnerHTML={{ __html: product.description || '' }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
