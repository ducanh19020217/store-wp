import Link from 'next/link';
import { getProductsByCategory, getCategories } from '@/lib/api';
import { notFound } from 'next/navigation';
import { siteConfig } from '@/config/site';

export async function generateMetadata({ params }) {
    const categories = await getCategories();
    const category = categories.find(c => c.slug === params.slug);

    if (!category) {
        return {
            title: 'Danh mục không tồn tại',
        };
    }

    return {
        title: `${category.name} | ${siteConfig.company.name}`,
        description: category.description || `Danh sách sản phẩm thuộc danh mục ${category.name}`,
    };
}

export default async function CategoryPage({ params }) {
    const categories = await getCategories();
    const category = categories.find(c => c.slug === params.slug);

    if (!category) {
        notFound();
    }

    const products = await getProductsByCategory(category.id);

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-200">
                <div className="container-custom py-4 px-4">
                    <div className="flex items-center text-sm text-gray-500">
                        <Link href="/" className="hover:text-red-600 transition-colors">Trang chủ</Link>
                        <span className="mx-2">/</span>
                        <span className="text-gray-900 font-medium">{category.name}</span>
                    </div>
                </div>
            </div>

            <div className="container-custom mt-8 px-4">
                <div className="flex items-center gap-4 mb-8">
                    <div className="h-10 w-2 bg-red-600"></div>
                    <h1 className="text-3xl font-black uppercase tracking-tight text-gray-900">
                        {category.name}
                    </h1>
                    <span className="bg-gray-200 text-gray-600 text-xs font-bold px-2 py-1 rounded-full">
                        {products.length} sản phẩm
                    </span>
                </div>

                {products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        {products.map((product) => {
                            const price = Number(product.price || 0);
                            const imageUrl = product.images?.[0]?.src;

                            return (
                                <Link
                                    key={product.id}
                                    href={`/san-pham/${product.slug}`}
                                    className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-300 group"
                                >
                                    <div className="aspect-square bg-gray-50 flex items-center justify-center text-gray-300 font-bold relative overflow-hidden">
                                        {imageUrl ? (
                                            <img
                                                src={imageUrl}
                                                alt={product.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        ) : (
                                            <span className="text-lg uppercase italic">Ảnh Sản Phẩm</span>
                                        )}
                                        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    </div>
                                    <div className="p-4 md:p-6">
                                        <h4 className="font-bold text-base md:text-lg mb-3 group-hover:text-red-600 transition-colors line-clamp-2 leading-tight">
                                            {product.name}
                                        </h4>
                                        <p className="text-red-600 font-black text-xl md:text-2xl mb-4 md:mb-6">
                                            {price > 0
                                                ? `${price.toLocaleString('vi-VN')} đ`
                                                : 'Liên hệ'}
                                        </p>
                                        <button className="w-full bg-white text-red-600 border-2 border-red-600 py-2.5 md:py-3 rounded-xl font-black hover:bg-red-600 hover:text-white transition-all duration-300 shadow-sm uppercase text-xs md:text-sm tracking-widest">
                                            Xem chi tiết
                                        </button>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                ) : (
                    <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100">
                        <div className="text-6xl mb-4">📦</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Chưa có sản phẩm</h3>
                        <p className="text-gray-500">Danh mục này hiện đang được cập nhật sản phẩm mới.</p>
                        <Link href="/" className="inline-block mt-6 bg-red-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors">
                            Quay lại trang chủ
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
