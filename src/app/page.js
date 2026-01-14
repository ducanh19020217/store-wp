import Link from 'next/link';
import { getProducts, getCategories } from '@/lib/api';
import { siteConfig } from '@/config/site';

export default async function Home() {
  // Fetch real data from WordPress
  let products = [];
  let categories = [];

  try {
    const [productsData, categoriesData] = await Promise.all([
      getProducts(),
      getCategories()
    ]);

    products = productsData.slice(0, 4); // Get first 4 products
    categories = categoriesData.filter(cat =>
      cat.slug !== 'uncategorized' && cat.slug !== 'chua-phan-loai'
    ).slice(0, 12); // Get first 12 categories
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  // Mock data if no real data available
  const mockCategories = [
    { id: 1, name: "Máy May Công Nghiệp", slug: "may-may-cong-nghiep", icon: "🧵" },
    { id: 2, name: "Máy Cắt Vải", slug: "may-cat-vai", icon: "✂️" },
    { id: 3, name: "Máy Thêu Vi Tính", slug: "may-theu-vi-tinh", icon: "💻" },
    { id: 4, name: "Máy May Cũ", slug: "may-may-cu", icon: "♻️" },
    { id: 5, name: "Bàn Ủ Công Nghiệp", slug: "ban-u-cong-nghiep", icon: "💨" },
    { id: 6, name: "Máy Sang Chỉ", slug: "may-sang-chi", icon: "🧶" },
    { id: 7, name: "Máy Cán Rèm Cửa", slug: "may-can-rem-cua", icon: "🖼️" },
    { id: 8, name: "Mô Tơ Máy May", slug: "mo-to-may-may", icon: "⚙️" },
    { id: 9, name: "Phụ Tùng Máy May", slug: "phu-tung-may-may", icon: "🔧" },
    { id: 10, name: "Nồi Hơi Công Nghiệp", slug: "noi-hoi-cong-nghiep", icon: "🔥" },
    { id: 11, name: "Máy May Bao", slug: "may-may-bao", icon: "📦" },
    { id: 12, name: "Máy May Gia Đình", slug: "may-may-gia-dinh", icon: "🏠" },
  ];

  const mockProducts = [
    { id: 1, name: "Máy May Công Nghiệp Brother S-7100A", price: 15000000, slug: "may-may-brother-s7100a" },
    { id: 2, name: "Máy Cắt Vải Đứng Eastman CZD-3", price: 25000000, slug: "may-cat-vai-eastman" },
    { id: 3, name: "Máy Thêu Vi Tính Tajima 12 Kim", price: 0, slug: "may-theu-tajima" },
    { id: 4, name: "Máy May Jack A4F Điện Tử", price: 8500000, slug: "may-may-jack-a4f" },
  ];

  // Use real data if available, otherwise use mock
  const displayCategories = categories.length > 0 ? categories : mockCategories;
  const displayProducts = products.length > 0 ? products : mockProducts;

  // Category icons mapping
  const categoryIcons = {
    'may-may-cong-nghiep': '🧵',
    'may-cat-vai': '✂️',
    'may-theu-vi-tinh': '💻',
    'may-may-cu': '♻️',
    'ban-u-cong-nghiep': '💨',
    'may-sang-chi': '🧶',
    'may-can-rem-cua': '🖼️',
    'mo-to-may-may': '⚙️',
    'phu-tung-may-may': '🔧',
    'noi-hoi-cong-nghiep': '🔥',
    'may-may-bao': '📦',
    'may-may-gia-dinh': '🏠',
  };

  return (
    <div className="bg-gray-50 pb-20">
      {/* Hero Banner */}
      <section className="bg-blue-50 py-12 md:py-20 overflow-hidden relative">
        <div className="container-custom flex flex-col md:flex-row items-center gap-12 px-4">
          <div className="flex-1 z-10">
            <h2 className="text-4xl md:text-6xl font-black text-blue-900 mb-4 leading-tight uppercase">
              {siteConfig.company.name} <span className="text-red-600">{siteConfig.company.slogan}</span>
            </h2>
            <p className="text-xl text-gray-700 mb-8 font-medium">
              {siteConfig.company.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/" className="bg-red-600 text-white px-8 py-4 rounded-md font-black text-lg shadow-lg hover:bg-red-700 transition-all">
                XEM SẢN PHẨM BÁN CHẠY
              </Link>
              <Link href="/lien-he" className="bg-white text-red-600 border-2 border-red-600 px-8 py-4 rounded-md font-black text-lg shadow-lg hover:bg-red-50 transition-all">
                LIÊN HỆ TƯ VẤN
              </Link>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="bg-red-600 w-full aspect-video rounded-3xl shadow-2xl flex items-center justify-center text-white text-4xl font-bold italic overflow-hidden border-8 border-white">
              <div className="text-center">
                <p className="uppercase">Hình Ảnh</p>
                <p className="text-sm not-italic mt-2 uppercase">Phụ Kiện Nghề May</p>
              </div>
            </div>
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-red-600 rounded-full opacity-20 blur-2xl"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-900 rounded-full opacity-10 blur-3xl"></div>
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <section className="container-custom -mt-10 relative z-20 px-4">
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-xl border border-gray-100">
          <div className="flex items-center gap-4 mb-8 md:mb-10">
            <div className="h-8 w-2 bg-red-600"></div>
            <h3 className="text-2xl font-black uppercase tracking-tight">
              Danh mục sản phẩm
            </h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {displayCategories.map((cat) => (
              <Link
                key={cat.id}
                href={`/danh-muc/${cat.slug}`}
                className="group flex flex-col items-center text-center p-4 md:p-6 rounded-xl hover:bg-red-50 transition-all border border-gray-50 hover:border-red-200 hover:shadow-md"
              >
                <div className="text-4xl md:text-5xl mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                  {cat.icon || categoryIcons[cat.slug] || '📦'}
                </div>
                <span className="text-xs md:text-sm font-bold text-gray-800 group-hover:text-red-600 uppercase tracking-tighter leading-tight line-clamp-2">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="container-custom mt-16 md:mt-24 px-4">
        <div className="flex justify-between items-end mb-8 md:mb-12">
          <div className="flex items-center gap-4">
            <div className="h-10 w-2 bg-red-600"></div>
            <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight">Sản phẩm mới nhất</h3>
          </div>
          <Link href="/" className="text-red-600 font-bold hover:underline flex items-center gap-2 text-sm md:text-base">
            Xem tất cả
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

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
                <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Mới</div>
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div className="p-4 md:p-6">
                <h4 className="font-bold text-base md:text-lg mb-3 group-hover:text-red-600 transition-colors line-clamp-2 leading-tight">
                  {product.name}
                </h4>
                <p className="text-red-600 font-black text-xl md:text-2xl mb-4 md:mb-6">
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
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-red-600 mt-16 md:mt-24 py-12 md:py-16 text-white">
        <div className="container-custom grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center px-4">
          <div>
            <div className="text-4xl mb-4">🛡️</div>
            <h4 className="text-lg md:text-xl font-bold mb-2 uppercase">Bảo Hành Tận Nơi</h4>
            <p className="text-red-100 text-sm">Cam kết hỗ trợ kỹ thuật nhanh chóng trong vòng 24h.</p>
          </div>
          <div>
            <div className="text-4xl mb-4">🚚</div>
            <h4 className="text-lg md:text-xl font-bold mb-2 uppercase">Giao Hàng Toàn Quốc</h4>
            <p className="text-red-100 text-sm">Vận chuyển an toàn, lắp đặt tận xưởng cho khách hàng.</p>
          </div>
          <div>
            <div className="text-4xl mb-4">💎</div>
            <h4 className="text-lg md:text-xl font-bold mb-2 uppercase">Chất Lượng Chính Hãng</h4>
            <p className="text-red-100 text-sm">Cung cấp phụ kiện từ các thương hiệu hàng đầu thế giới.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
