import { siteConfig } from '@/config/site';

export const metadata = {
    title: "Liên Hệ - Dung Đỗ | Phụ Kiện Nghề May Chuyên Nghiệp",
    description: `Liên hệ Dung Đỗ để được tư vấn và báo giá phụ kiện nghề may. Hotline: ${siteConfig?.contact?.phone || '0123 456 789'}. Địa chỉ: ${siteConfig?.contact?.addressShort || 'Hải Dương'}. Hỗ trợ 24/7.`,
    keywords: "liên hệ phụ kiện may, tư vấn phụ kiện nghề may, báo giá phụ kiện may, Dung Đỗ",
    openGraph: {
        title: "Liên Hệ - Dung Đỗ Phụ Kiện Nghề May",
        description: "Liên hệ ngay để được tư vấn và hỗ trợ tốt nhất",
        type: "website",
    },
};

export default function ContactPage() {
    const contactInfo = [
        {
            icon: "📍",
            title: "Địa Chỉ",
            content: "TP. Hồ Chí Minh, Việt Nam",
            link: null
        },
        {
            icon: "📞",
            title: "Hotline",
            content: "0914 639 068",
            link: "tel:0914639068"
        },
        {
            icon: "📧",
            title: "Email",
            content: "contact@dungdo.vn",
            link: "mailto:contact@dungdo.vn"
        },
        {
            icon: "⏰",
            title: "Giờ Làm Việc",
            content: "T2 - CN: 8:00 - 20:00",
            link: null
        },
    ];

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Hero Section - Mobile First */}
            <section className="bg-gradient-to-br from-red-600 via-red-700 to-blue-900 text-white py-12 md:py-20">
                <div className="container-custom">
                    <div className="text-center max-w-3xl mx-auto px-4">
                        <div className="mb-6 md:mb-8">
                            <div className="inline-block bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-2xl">
                                <div className="bg-blue-900 text-white p-3 md:p-4 rounded-full w-16 h-16 md:w-24 md:h-24 flex items-center justify-center font-bold text-2xl md:text-4xl italic">
                                    DD
                                </div>
                            </div>
                        </div>
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black mb-4 md:mb-6 uppercase leading-tight">
                            Liên Hệ Với Chúng Tôi
                        </h1>
                        <p className="text-lg md:text-2xl font-medium text-red-100 leading-relaxed">
                            Dung Đỗ - Phụ Kiện Nghề May Chuyên Nghiệp
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Info Cards - Mobile First Grid */}
            <section className="py-8 md:py-12 -mt-8 md:-mt-16 relative z-10">
                <div className="container-custom px-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        {contactInfo.map((info, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl md:rounded-2xl shadow-lg hover:shadow-2xl transition-all p-6 md:p-8 text-center group"
                            >
                                <div className="text-4xl md:text-5xl mb-3 md:mb-4 group-hover:scale-110 transition-transform">
                                    {info.icon}
                                </div>
                                <h3 className="text-base md:text-lg font-black text-gray-900 mb-2 md:mb-3">
                                    {info.title}
                                </h3>
                                {info.link ? (
                                    <a
                                        href={info.link}
                                        className="text-red-600 font-bold text-sm md:text-base hover:underline break-words"
                                    >
                                        {info.content}
                                    </a>
                                ) : (
                                    <p className="text-gray-600 font-medium text-sm md:text-base break-words">
                                        {info.content}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Main Content - Mobile First Layout */}
            <section className="py-8 md:py-16">
                <div className="container-custom px-4">
                    <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
                        {/* Contact Form - Full width on mobile */}
                        <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl p-6 md:p-10">
                            <div className="mb-6 md:mb-8">
                                <div className="flex items-center gap-3 mb-3 md:mb-4">
                                    <div className="h-8 md:h-10 w-1 md:w-2 bg-red-600"></div>
                                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-black uppercase">
                                        Gửi Tin Nhắn
                                    </h2>
                                </div>
                                <p className="text-sm md:text-base text-gray-600">
                                    Điền thông tin bên dưới, chúng tôi sẽ liên hệ lại trong thời gian sớm nhất
                                </p>
                            </div>

                            <form className="space-y-4 md:space-y-6">
                                <div>
                                    <label className="block text-sm md:text-base font-bold text-gray-900 mb-2">
                                        Họ và Tên <span className="text-red-600">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-4 md:px-6 py-3 md:py-4 border-2 border-gray-200 rounded-xl focus:border-red-600 focus:outline-none transition-colors text-sm md:text-base"
                                        placeholder="Nhập họ và tên của bạn"
                                    />
                                </div>

                                <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
                                    <div>
                                        <label className="block text-sm md:text-base font-bold text-gray-900 mb-2">
                                            Số Điện Thoại <span className="text-red-600">*</span>
                                        </label>
                                        <input
                                            type="tel"
                                            required
                                            className="w-full px-4 md:px-6 py-3 md:py-4 border-2 border-gray-200 rounded-xl focus:border-red-600 focus:outline-none transition-colors text-sm md:text-base"
                                            placeholder="0912 345 678"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm md:text-base font-bold text-gray-900 mb-2">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            className="w-full px-4 md:px-6 py-3 md:py-4 border-2 border-gray-200 rounded-xl focus:border-red-600 focus:outline-none transition-colors text-sm md:text-base"
                                            placeholder="email@example.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm md:text-base font-bold text-gray-900 mb-2">
                                        Chủ Đề
                                    </label>
                                    <select className="w-full px-4 md:px-6 py-3 md:py-4 border-2 border-gray-200 rounded-xl focus:border-red-600 focus:outline-none transition-colors text-sm md:text-base">
                                        <option>Tư vấn sản phẩm</option>
                                        <option>Báo giá</option>
                                        <option>Bảo hành - Sửa chữa</option>
                                        <option>Khác</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm md:text-base font-bold text-gray-900 mb-2">
                                        Nội Dung <span className="text-red-600">*</span>
                                    </label>
                                    <textarea
                                        required
                                        rows={5}
                                        className="w-full px-4 md:px-6 py-3 md:py-4 border-2 border-gray-200 rounded-xl focus:border-red-600 focus:outline-none transition-colors resize-none text-sm md:text-base"
                                        placeholder="Nhập nội dung cần tư vấn..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-red-600 text-white py-3 md:py-5 rounded-xl font-black text-base md:text-lg hover:bg-red-700 transition-all shadow-lg hover:shadow-xl uppercase"
                                >
                                    Gửi Tin Nhắn
                                </button>
                            </form>
                        </div>

                        {/* Info & Map - Stack on mobile */}
                        <div className="space-y-6 md:space-y-8">
                            {/* Why Contact Us */}
                            <div className="bg-gradient-to-br from-blue-900 to-blue-800 text-white rounded-2xl md:rounded-3xl p-6 md:p-8">
                                <h3 className="text-xl md:text-2xl font-black mb-4 md:mb-6 uppercase">
                                    Tại Sao Chọn Dung Đỗ?
                                </h3>
                                <ul className="space-y-3 md:space-y-4">
                                    <li className="flex items-start gap-3">
                                        <span className="text-xl md:text-2xl shrink-0">✓</span>
                                        <span className="text-sm md:text-base text-blue-100">
                                            <strong className="text-white">Phụ kiện chính hãng</strong> - Đa dạng, chất lượng cao
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-xl md:text-2xl shrink-0">✓</span>
                                        <span className="text-sm md:text-base text-blue-100">
                                            <strong className="text-white">Giá cả cạnh tranh</strong> - Ưu đãi cho khách mua sỉ
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-xl md:text-2xl shrink-0">✓</span>
                                        <span className="text-sm md:text-base text-blue-100">
                                            <strong className="text-white">Giao hàng nhanh</strong> - Toàn quốc trong 24-48h
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-xl md:text-2xl shrink-0">✓</span>
                                        <span className="text-sm md:text-base text-blue-100">
                                            <strong className="text-white">Hỗ trợ 24/7</strong> - Tư vấn nhiệt tình, chuyên nghiệp
                                        </span>
                                    </li>
                                </ul>
                            </div>

                            {/* Google Map - Real embedded map */}
                            <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl overflow-hidden">
                                <iframe
                                    src={siteConfig.contact.googleMapsUrl}
                                    width="100%"
                                    height="320"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="md:h-80 lg:h-96"
                                    title="Bản đồ Dung Đỗ - Hải Dương"
                                ></iframe>
                            </div>

                            {/* Quick Contact - Responsive padding */}
                            <div className="bg-red-600 text-white rounded-2xl md:rounded-3xl p-6 md:p-8 text-center">
                                <h3 className="text-xl md:text-2xl font-black mb-3 md:mb-4 uppercase">
                                    Cần Hỗ Trợ Ngay?
                                </h3>
                                <p className="text-sm md:text-base text-red-100 mb-4 md:mb-6">
                                    Gọi hotline để được tư vấn trực tiếp
                                </p>
                                <a
                                    href="tel:0914639068"
                                    className="inline-block bg-white text-red-600 px-6 md:px-10 py-3 md:py-5 rounded-xl font-black text-lg md:text-2xl hover:bg-gray-100 transition-all shadow-2xl"
                                >
                                    📞 0914 639 068
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section - Mobile optimized */}
            <section className="py-8 md:py-16 bg-white">
                <div className="container-custom px-4">
                    <div className="text-center mb-8 md:mb-12">
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-black uppercase mb-3 md:mb-4">
                            Câu Hỏi Thường Gặp
                        </h2>
                        <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
                            Những thắc mắc phổ biến từ khách hàng
                        </p>
                    </div>

                    <div className="max-w-3xl mx-auto space-y-4">
                        {[
                            {
                                q: "Dung Đỗ có giao hàng toàn quốc không?",
                                a: "Có, chúng tôi giao hàng toàn quốc trong vòng 24-48h. Miễn phí ship cho đơn hàng trên 500.000đ."
                            },
                            {
                                q: "Làm sao để đặt hàng số lượng lớn?",
                                a: "Vui lòng liên hệ hotline 0914 639 068 hoặc gửi yêu cầu qua form trên để được báo giá ưu đãi."
                            },
                            {
                                q: "Chính sách đổi trả như thế nào?",
                                a: "Đổi trả trong vòng 7 ngày nếu sản phẩm lỗi do nhà sản xuất hoặc không đúng mô tả."
                            },
                        ].map((faq, index) => (
                            <details
                                key={index}
                                className="bg-gray-50 rounded-xl md:rounded-2xl p-4 md:p-6 group hover:bg-gray-100 transition-colors"
                            >
                                <summary className="font-black text-sm md:text-base lg:text-lg text-gray-900 cursor-pointer list-none flex justify-between items-center">
                                    <span className="pr-4">{faq.q}</span>
                                    <span className="text-red-600 text-xl md:text-2xl group-open:rotate-180 transition-transform shrink-0">
                                        ▼
                                    </span>
                                </summary>
                                <p className="mt-3 md:mt-4 text-sm md:text-base text-gray-600 leading-relaxed">
                                    {faq.a}
                                </p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
