import Link from 'next/link';
import { siteConfig } from '@/config/site';

export const metadata = {
    title: "Giới Thiệu - Điện Máy Tổng Hợp Hải Anh | Thiết Bị May Mặc Uy Tín",
    description: "Điện Máy Tổng Hợp Hải Anh - Đơn vị hàng đầu chuyên cung cấp máy may công nghiệp, thiết bị may mặc chính hãng. Hơn 10 năm kinh nghiệm, cam kết chất lượng, giá tốt nhất thị trường.",
    keywords: "máy may công nghiệp, thiết bị may mặc, máy cắt vải, máy thêu vi tính, Hải Anh",
    openGraph: {
        title: "Giới Thiệu - Điện Máy Tổng Hợp Hải Anh",
        description: "Đơn vị hàng đầu chuyên cung cấp máy may công nghiệp, thiết bị may mặc chính hãng",
        type: "website",
    },
};

export default function AboutPage() {
    const achievements = [
        { icon: "🏆", number: "10+", label: "Năm Kinh Nghiệm" },
        { icon: "👥", number: "5000+", label: "Khách Hàng Tin Dùng" },
        { icon: "⚙️", number: "50+", label: "Dòng Sản Phẩm" },
        { icon: "🌟", number: "100%", label: "Hàng Chính Hãng" },
    ];

    const values = [
        {
            icon: "💎",
            title: "Chất Lượng Đảm Bảo",
            desc: "Cam kết 100% sản phẩm chính hãng từ các thương hiệu hàng đầu thế giới như Brother, Juki, Jack, Typical..."
        },
        {
            icon: "🤝",
            title: "Uy Tín Hàng Đầu",
            desc: "Được hàng nghìn doanh nghiệp may mặc trên toàn quốc tin tưởng và lựa chọn làm đối tác lâu dài."
        },
        {
            icon: "💰",
            title: "Giá Cả Cạnh Tranh",
            desc: "Nhập khẩu trực tiếp, bỏ qua trung gian, mang đến mức giá tốt nhất cho khách hàng."
        },
        {
            icon: "🛠️",
            title: "Bảo Hành Tận Tâm",
            desc: "Đội ngũ kỹ thuật viên chuyên nghiệp, hỗ trợ bảo hành, sửa chữa nhanh chóng tại xưởng khách hàng."
        },
    ];

    return (
        <div className="bg-white">
            {/* Hero Section with Logo */}
            <section className="bg-gradient-to-br from-[#1E3A8A] via-blue-700 to-[#F97316] text-white py-20">
                <div className="container-custom text-center">
                    <div className="flex justify-center mb-8">
                        <div className="bg-white p-6 rounded-3xl shadow-2xl">
                            <div className="bg-[#1E3A8A] text-white p-4 rounded-full w-24 h-24 flex items-center justify-center font-bold text-4xl italic mx-auto">
                                HA
                            </div>
                        </div>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black mb-6 uppercase tracking-tight">
                        Công ty Cổ phần May <span className="text-[#FBBF24]">Hải Anh</span>
                    </h1>
                    <p className="text-2xl font-medium text-blue-100 max-w-3xl mx-auto leading-relaxed">
                        Đối Tác Tin Cậy Của Hàng Nghìn Doanh Nghiệp May Mặc Việt Nam
                    </p>
                </div>
            </section>

            {/* Achievements */}
            <section className="py-16 bg-gray-50">
                <div className="container-custom">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {achievements.map((item, index) => (
                            <div key={index} className="text-center group">
                                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
                                <div className="text-4xl font-black text-[#F97316] mb-2">{item.number}</div>
                                <div className="text-gray-600 font-bold uppercase text-sm tracking-wider">{item.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Story */}
            <section className="py-20">
                <div className="container-custom max-w-4xl">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="h-12 w-2 bg-[#F97316]"></div>
                        <h2 className="text-4xl font-black uppercase">Câu Chuyện Của Chúng Tôi</h2>
                    </div>

                    <div className="prose prose-lg max-w-none space-y-6 text-gray-700 leading-relaxed">
                        <p className="text-xl font-medium text-gray-900 first-letter:text-6xl first-letter:font-black first-letter:text-[#F97316] first-letter:mr-2 first-letter:float-left">
                            Được thành lập với sứ mệnh mang đến những giải pháp thiết bị may mặc toàn diện và chất lượng cao,
                            <strong className="text-[#F97316]"> Điện Máy Tổng Hợp Hải Anh</strong> tự hào là đơn vị tiên phong
                            trong lĩnh vực cung cấp máy móc công nghiệp cho ngành may mặc tại Việt Nam.
                        </p>

                        <p>
                            Trải qua hơn <strong>10 năm hình thành và phát triển</strong>, chúng tôi đã không ngừng nỗ lực để trở thành
                            cầu nối đáng tin cậy giữa các thương hiệu thiết bị may mặc hàng đầu thế giới với các doanh nghiệp,
                            xưởng may tại Việt Nam. Với phương châm <em>&quot;Chất lượng tạo nên uy tín&quot;</em>, mỗi sản phẩm chúng tôi
                            cung cấp đều được tuyển chọn kỹ lưỡng, đảm bảo xuất xứ rõ ràng và chế độ bảo hành chu đáo.
                        </p>

                        <p>
                            Đội ngũ nhân viên của Hải Anh không chỉ am hiểu sâu sắc về sản phẩm mà còn luôn sẵn sàng tư vấn,
                            hỗ trợ khách hàng lựa chọn thiết bị phù hợp nhất với quy mô và nhu cầu sản xuất. Chúng tôi hiểu rằng,
                            mỗi chiếc máy không chỉ là công cụ lao động mà còn là tài sản quan trọng góp phần vào sự phát triển
                            bền vững của doanh nghiệp bạn.
                        </p>

                        <blockquote className="border-l-4 border-[#F97316] pl-6 italic text-xl text-gray-800 bg-orange-50 py-4 my-8">
                            &quot;Sự hài lòng của khách hàng chính là động lực lớn nhất để chúng tôi không ngừng hoàn thiện và phát triển.&quot;
                        </blockquote>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black uppercase mb-4">Giá Trị Cốt Lõi</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Những cam kết mà chúng tôi luôn đặt lên hàng đầu trong mọi hoạt động kinh doanh
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {values.map((value, index) => (
                            <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-gray-100 group">
                                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{value.icon}</div>
                                <h3 className="text-2xl font-black mb-4 text-gray-900 group-hover:text-[#F97316] transition-colors">
                                    {value.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">{value.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-20 bg-blue-900 text-white">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-4xl font-black uppercase mb-8">Tại Sao Chọn Hải Anh?</h2>
                        <div className="space-y-6 text-lg leading-relaxed text-blue-100">
                            <p>
                                ✓ <strong className="text-white">Sản phẩm đa dạng:</strong> Từ máy may 1 kim, máy vắt sổ, máy cắt vải,
                                máy thêu vi tính đến các thiết bị phụ trợ như bàn ủi, mô tơ, phụ tùng...
                            </p>
                            <p>
                                ✓ <strong className="text-white">Nhập khẩu chính ngạch:</strong> Hợp tác trực tiếp với các nhà sản xuất
                                hàng đầu như Brother (Nhật Bản), Juki (Nhật Bản), Jack (Trung Quốc), Typical (Đài Loan).
                            </p>
                            <p>
                                ✓ <strong className="text-white">Dịch vụ toàn diện:</strong> Tư vấn miễn phí, giao hàng toàn quốc,
                                lắp đặt tận nơi, đào tạo vận hành, bảo hành dài hạn.
                            </p>
                            <p>
                                ✓ <strong className="text-white">Hỗ trợ tài chính:</strong> Chính sách trả góp linh hoạt,
                                ưu đãi đặc biệt cho khách hàng mua số lượng lớn.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-secondary text-white">
                <div className="container-custom text-center">
                    <h2 className="text-4xl md:text-5xl font-black mb-6 uppercase">
                        Sẵn Sàng Hợp Tác Cùng Bạn
                    </h2>
                    <p className="text-xl mb-10 text-white/90 max-w-2xl mx-auto">
                        Hãy để Hải Anh đồng hành cùng doanh nghiệp bạn trên con đường phát triển và thành công
                    </p>
                    <div className="flex flex-wrap gap-6 justify-center">
                        <Link
                            href="/lien-he"
                            className="bg-white text-[#F97316] px-10 py-5 rounded-xl font-black text-lg hover:bg-gray-100 transition-all shadow-2xl uppercase tracking-wider"
                        >
                            Liên Hệ Ngay
                        </Link>
                        <a
                            href={`tel:${siteConfig.contact.phoneRaw}`}
                            className="bg-[#1E3A8A] text-white px-10 py-5 rounded-xl font-black text-lg hover:bg-blue-800 transition-all shadow-2xl uppercase tracking-wider"
                        >
                            📞 {siteConfig.contact.phone}
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
