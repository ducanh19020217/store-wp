import Link from 'next/link';

export const metadata = {
    title: "Dịch Vụ - Điện Máy Tổng Hợp Hoàng Lâm | Tư Vấn, Lắp Đặt, Bảo Hành Máy May",
    description: "Dịch vụ chuyên nghiệp: Tư vấn thiết bị may mặc, lắp đặt tận nơi, bảo hành chu đáo, đào tạo vận hành, cho thuê máy may công nghiệp. Hotline: 0914 639 068",
    keywords: "dịch vụ máy may, lắp đặt máy may, bảo hành máy may, sửa chữa máy may công nghiệp, cho thuê máy may",
    openGraph: {
        title: "Dịch Vụ Chuyên Nghiệp - Điện Máy Tổng Hợp Hoàng Lâm",
        description: "Tư vấn, lắp đặt, bảo hành, đào tạo vận hành máy may công nghiệp chuyên nghiệp",
        type: "website",
    },
};

export default function ServicesPage() {
    const services = [
        {
            icon: "💡",
            title: "Tư Vấn Giải Pháp Thiết Bị",
            description: "Đội ngũ chuyên gia giàu kinh nghiệm sẽ khảo sát, phân tích nhu cầu sản xuất và đề xuất giải pháp thiết bị tối ưu nhất cho xưởng may của bạn.",
            features: [
                "Khảo sát hiện trạng xưởng may miễn phí",
                "Tư vấn lựa chọn máy móc phù hợp với sản phẩm",
                "Tính toán công suất, năng suất tối ưu",
                "Lập phương án đầu tư hiệu quả"
            ],
            color: "from-blue-500 to-blue-600"
        },
        {
            icon: "🚚",
            title: "Giao Hàng & Lắp Đặt Tận Nơi",
            description: "Dịch vụ vận chuyển an toàn, lắp đặt chuyên nghiệp tại xưởng khách hàng trên toàn quốc, đảm bảo máy móc hoạt động ổn định ngay từ đầu.",
            features: [
                "Giao hàng toàn quốc, đóng gói cẩn thận",
                "Lắp đặt, chạy thử máy tại xưởng",
                "Điều chỉnh thông số kỹ thuật phù hợp",
                "Bàn giao hồ sơ, tài liệu đầy đủ"
            ],
            color: "from-green-500 to-green-600"
        },
        {
            icon: "🎓",
            title: "Đào Tạo Vận Hành",
            description: "Chương trình đào tạo chuyên sâu giúp công nhân nắm vững kỹ năng vận hành, bảo dưỡng máy móc, nâng cao năng suất và chất lượng sản phẩm.",
            features: [
                "Hướng dẫn vận hành chi tiết từng loại máy",
                "Đào tạo bảo dưỡng định kỳ",
                "Xử lý sự cố thường gặp",
                "Cấp chứng nhận hoàn thành khóa học"
            ],
            color: "from-purple-500 to-purple-600"
        },
        {
            icon: "🛠️",
            title: "Bảo Hành & Sửa Chữa",
            description: "Cam kết bảo hành chính hãng, đội ngũ kỹ thuật viên sẵn sàng hỗ trợ 24/7, thời gian xử lý nhanh chóng để không làm gián đoạn sản xuất.",
            features: [
                "Bảo hành chính hãng 12-24 tháng",
                "Hỗ trợ kỹ thuật qua điện thoại miễn phí",
                "Sửa chữa tận nơi trong vòng 24h",
                "Phụ tùng thay thế chính hãng"
            ],
            color: "from-red-500 to-red-600"
        },
        {
            icon: "🔄",
            title: "Thu Mua & Trao Đổi Máy Cũ",
            description: "Chính sách thu mua máy cũ với giá hợp lý, hỗ trợ khách hàng nâng cấp thiết bị mới với chi phí tối ưu nhất.",
            features: [
                "Định giá máy cũ minh bạch, công bằng",
                "Hỗ trợ đổi máy cũ lấy máy mới",
                "Thanh toán nhanh chóng, tiện lợi",
                "Tư vấn nâng cấp thiết bị phù hợp"
            ],
            color: "from-orange-500 to-orange-600"
        },
        {
            icon: "📦",
            title: "Cho Thuê Máy May Công Nghiệp",
            description: "Giải pháp linh hoạt cho các đơn hàng ngắn hạn hoặc doanh nghiệp mới khởi nghiệp, tiết kiệm chi phí đầu tư ban đầu.",
            features: [
                "Đa dạng loại máy cho thuê",
                "Thời hạn thuê linh hoạt (ngày, tháng, năm)",
                "Bảo trì, bảo dưỡng trong thời gian thuê",
                "Hỗ trợ chuyển đổi sang mua đứt"
            ],
            color: "from-teal-500 to-teal-600"
        },
    ];

    const processSteps = [
        { step: "01", title: "Liên Hệ Tư Vấn", desc: "Gọi hotline hoặc để lại thông tin, chúng tôi sẽ liên hệ ngay" },
        { step: "02", title: "Khảo Sát Nhu Cầu", desc: "Chuyên gia đến tận nơi khảo sát và tư vấn giải pháp" },
        { step: "03", title: "Báo Giá & Ký Hợp Đồng", desc: "Nhận báo giá chi tiết, ký kết hợp đồng minh bạch" },
        { step: "04", title: "Giao Hàng & Lắp Đặt", desc: "Vận chuyển an toàn, lắp đặt chuyên nghiệp" },
        { step: "05", title: "Đào Tạo & Bàn Giao", desc: "Hướng dẫn vận hành, bàn giao đầy đủ hồ sơ" },
        { step: "06", title: "Hỗ Trợ Sau Bán", desc: "Bảo hành, bảo trì, hỗ trợ kỹ thuật lâu dài" },
    ];

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-red-600 via-red-700 to-blue-900 text-white py-24 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-300 rounded-full blur-3xl"></div>
                </div>
                <div className="container-custom relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-5xl md:text-6xl font-black mb-6 uppercase tracking-tight">
                            Dịch Vụ Chuyên Nghiệp
                        </h1>
                        <p className="text-2xl font-medium text-red-100 leading-relaxed">
                            Giải Pháp Toàn Diện Cho Ngành May Mặc - Từ Tư Vấn Đến Bảo Hành
                        </p>
                        <div className="mt-10 flex flex-wrap gap-4 justify-center">
                            <a href="tel:0914639068" className="bg-white text-red-600 px-8 py-4 rounded-xl font-black hover:bg-gray-100 transition-all shadow-2xl">
                                📞 Hotline: 0914 639 068
                            </a>
                            <Link href="/lien-he" className="bg-blue-900 text-white px-8 py-4 rounded-xl font-black hover:bg-blue-800 transition-all shadow-2xl">
                                Đăng Ký Tư Vấn
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-20 bg-gray-50">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-3 mb-4">
                            <div className="h-1 w-12 bg-red-600"></div>
                            <h2 className="text-4xl font-black uppercase">Các Dịch Vụ Của Chúng Tôi</h2>
                            <div className="h-1 w-12 bg-red-600"></div>
                        </div>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Hoàng Lâm cung cấp đầy đủ các dịch vụ hỗ trợ doanh nghiệp may mặc vận hành hiệu quả và bền vững
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-100"
                            >
                                <div className={`bg-gradient-to-r ${service.color} p-6 text-center`}>
                                    <div className="text-6xl mb-3 group-hover:scale-110 transition-transform">{service.icon}</div>
                                    <h3 className="text-2xl font-black text-white uppercase tracking-tight">{service.title}</h3>
                                </div>
                                <div className="p-6">
                                    <p className="text-gray-700 leading-relaxed mb-6">{service.description}</p>
                                    <ul className="space-y-3">
                                        {service.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-sm text-gray-600">
                                                <span className="text-red-600 font-bold shrink-0">✓</span>
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process Steps */}
            <section className="py-20 bg-white">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black uppercase mb-4">Quy Trình Làm Việc</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            6 bước đơn giản để bạn sở hữu thiết bị may mặc chất lượng cao
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {processSteps.map((item, index) => (
                            <div key={index} className="relative group">
                                <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-8 rounded-2xl border-2 border-gray-100 hover:border-red-600 transition-all">
                                    <div className="text-6xl font-black text-red-600 mb-4 opacity-20 group-hover:opacity-100 transition-opacity">
                                        {item.step}
                                    </div>
                                    <h3 className="text-xl font-black mb-3 text-gray-900 group-hover:text-red-600 transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                                </div>
                                {index < processSteps.length - 1 && (
                                    <div className="hidden lg:block absolute top-1/2 -right-4 text-4xl text-red-600 z-10">→</div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Our Services */}
            <section className="py-20 bg-gradient-to-br from-blue-900 to-blue-800 text-white">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-4xl font-black uppercase mb-12 text-center">
                            Cam Kết Của Hoàng Lâm
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="flex gap-4 items-start">
                                <div className="text-4xl shrink-0">⚡</div>
                                <div>
                                    <h3 className="text-xl font-black mb-2">Phản Hồi Nhanh Chóng</h3>
                                    <p className="text-blue-100">Tiếp nhận yêu cầu 24/7, xử lý trong vòng 2 giờ làm việc</p>
                                </div>
                            </div>
                            <div className="flex gap-4 items-start">
                                <div className="text-4xl shrink-0">👨‍🔧</div>
                                <div>
                                    <h3 className="text-xl font-black mb-2">Đội Ngũ Chuyên Nghiệp</h3>
                                    <p className="text-blue-100">Kỹ thuật viên được đào tạo bài bản, chứng chỉ quốc tế</p>
                                </div>
                            </div>
                            <div className="flex gap-4 items-start">
                                <div className="text-4xl shrink-0">💯</div>
                                <div>
                                    <h3 className="text-xl font-black mb-2">Chất Lượng Đảm Bảo</h3>
                                    <p className="text-blue-100">Sử dụng phụ tùng chính hãng, quy trình chuẩn quốc tế</p>
                                </div>
                            </div>
                            <div className="flex gap-4 items-start">
                                <div className="text-4xl shrink-0">🤝</div>
                                <div>
                                    <h3 className="text-xl font-black mb-2">Hỗ Trợ Lâu Dài</h3>
                                    <p className="text-blue-100">Đồng hành cùng khách hàng suốt quá trình sử dụng</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-red-600 to-red-700 text-white">
                <div className="container-custom text-center">
                    <h2 className="text-4xl md:text-5xl font-black mb-6 uppercase">
                        Bạn Cần Tư Vấn Dịch Vụ?
                    </h2>
                    <p className="text-xl mb-10 text-red-100 max-w-2xl mx-auto">
                        Để lại thông tin hoặc gọi ngay hotline, chuyên gia của chúng tôi sẽ hỗ trợ bạn trong thời gian sớm nhất
                    </p>
                    <div className="flex flex-wrap gap-6 justify-center">
                        <Link
                            href="/lien-he"
                            className="bg-white text-red-600 px-10 py-5 rounded-xl font-black text-lg hover:bg-gray-100 transition-all shadow-2xl uppercase"
                        >
                            Đăng Ký Ngay
                        </Link>
                        <a
                            href="tel:0914639068"
                            className="bg-blue-900 text-white px-10 py-5 rounded-xl font-black text-lg hover:bg-blue-800 transition-all shadow-2xl uppercase"
                        >
                            📞 0914 639 068
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
