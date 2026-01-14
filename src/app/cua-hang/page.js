import Link from 'next/link';
import { getProducts } from '@/lib/api';
import { siteConfig } from '@/config/site';

export const metadata = {
    title: `Cửa Hàng - ${siteConfig.company.fullName}`,
    description: `Xem tất cả sản phẩm phụ kiện nghề may tại ${siteConfig.company.name}. Chất lượng cao, giá cả cạnh tranh, giao hàng toàn quốc.`,
    keywords: 'cửa hàng phụ kiện may, mua phụ kiện nghề may, sản phẩm may mặc',
};

export default async function ShopPage() {
    let products = [];

    try {
        products = await getProducts();
    } catch (error) {
        console.error('Error fetching products:', error);
    }

    // Mock products if no real data
    const mockProducts = [
        { id: 1, name: "Kim May Công Nghiệp Organ", price: 50000, slug: "kim-may-organ" },
        { id: 2, name: "Chỉ May Polyester 40s/2", price: 15000, slug: "chi-may-polyester" },
        { id: 3, name: "Kéo Cắt Vải 10 Inch", price: 120000, slug: "keo-cat-vai" },
        { id: 4, name: "Thước Dây May Mặc 150cm", price: 25000, slug: "thuoc-day-may-mac" },
        { id: 5, name: "Phấn Vẽ Vải Chuyên Dụng", price: 8000, slug: "phan-ve-vai" },
        { id: 6, name: "Chân Vịt Máy May Đa Năng", price: 80000, slug: "chan-vit-may-may" },
        { id: 7, name: "Dầu Máy May Singer", price: 35000, slug: "dau-may-may-singer" },
        { id: 8, name: "Bàn Đạp Máy May Điện Tử", price: 450000, slug: "ban-dap-may-may" },
    ];

    const displayProducts = products.length > 0 ? products : mockProducts;

    return (
        <div className="min-h-screen bg-gray-50 py-8 md:py-12">
            {/* Breadcrumb */}
            <div className="container-custom px-4 mb-6 md:mb-8">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Link href="/" className="hover:text-red-600 transition-colors">Trang chủ</Link>
                    <span>/</span>
                    <span className="text-gray-900 font-medium">Cửa hàng</span>
                </div>
            </div>

            <div className="container-custom px-4">
                {/* Header */}
                <div className="mb-8 md:mb-12">
                    <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">Tất Cả Sản Phẩm</h1>
                    <p className="text-gray-600">
                        Hiển thị {displayProducts.length} sản phẩm
                    </p>
                </div>

                {/* Products Grid */}
                {displayProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        {displayProducts.map((product) => (
                            <Link
                                key={product.id}
                                href={`/san-pham/${product.slug}`}
                                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-300 group"
                            >
                                <div className="aspect-square bg-gray-50 flex items-center justify-center text-gray-300 font-bold relative overflow-hidden">
                                    {product._embedded?.['wp:featuredmedia']?.[0]?.source_url ? (
                                        <img
                                            src={product._embedded['wp:featuredmedia'][0].source_url}
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
                                    <p className="text-red-600 font-black text-xl md:text-2xl mb-4">
                                        {product.price && product.price > 0
                                            ? `${Number(product.price).toLocaleString('vi-VN')} đ`
                                            : 'Liên hệ'
                                        }
                                    </p>
                                    <button className="w-full bg-white text-red-600 border-2 border-red-600 py-2.5 md:py-3 rounded-xl font-black hover:bg-red-600 hover:text-white transition-all duration-300 shadow-sm uppercase text-xs md:text-sm tracking-widest">
                                        Xem chi tiết
                                    </button>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4 opacity-20">📦</div>
                        <p className="text-xl text-gray-500 font-medium">Chưa có sản phẩm nào</p>
                    </div>
                )}
            </div>
        </div>
    );
}
