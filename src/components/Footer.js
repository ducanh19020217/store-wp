import Link from 'next/link';
import { siteConfig } from '@/config/site';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white pt-16 pb-8">
            <div className="container-custom grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                {/* Company Info */}
                <div>
                    <h3 className="text-[#F97316] font-black text-xl mb-6 tracking-widest uppercase">{siteConfig.company.fullName}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">
                        {siteConfig.company.description}
                    </p>
                    <div className="flex items-center gap-4">
                        <a href="#" className="bg-[#1E3A8A] p-2 rounded-full hover:bg-[#1E40AF] transition-colors">
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                        </a>
                        <a href="#" className="bg-[#F97316] p-2 rounded-full hover:bg-[#EA580C] transition-colors">
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                        </a>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="text-white font-bold text-lg mb-6 border-l-4 border-[#F97316] pl-3">VỀ CHÚNG TÔI</h4>
                    <ul className="space-y-3 text-gray-400 text-sm">
                        <li><Link href="/gioi-thieu" className="hover:text-[#F97316] transition-colors">Giới thiệu</Link></li>
                        <li><Link href="/dich-vu" className="hover:text-[#F97316] transition-colors">Dịch vụ</Link></li>
                        <li><Link href="/tin-tuc" className="hover:text-[#F97316] transition-colors">Tin tức - Chia sẻ</Link></li>
                        <li><Link href="/lien-he" className="hover:text-[#F97316] transition-colors">Liên hệ</Link></li>
                    </ul>
                </div>

                {/* Categories */}
                <div>
                    <h4 className="text-white font-bold text-lg mb-6 border-l-4 border-[#F97316] pl-3">DANH MỤC</h4>
                    <ul className="space-y-3 text-gray-400 text-sm">
                        <li><Link href="#" className="hover:text-[#F97316] transition-colors">Máy May Công Nghiệp</Link></li>
                        <li><Link href="#" className="hover:text-[#F97316] transition-colors">Máy Cắt Vải</Link></li>
                        <li><Link href="#" className="hover:text-[#F97316] transition-colors">Máy Thêu Vi Tính</Link></li>
                        <li><Link href="#" className="hover:text-[#F97316] transition-colors">Máy May Cũ</Link></li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h4 className="text-white font-bold text-lg mb-6 border-l-4 border-[#F97316] pl-3">LIÊN HỆ</h4>
                    <ul className="space-y-3 text-gray-400 text-sm">
                        <li className="flex gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#F97316] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>{siteConfig.contact.factory1}</span>
                        </li>
                        <li className="flex gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#F97316] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>{siteConfig.contact.factory2}</span>
                        </li>
                        <li className="flex gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#F97316] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>{siteConfig.contact.factory3}</span>
                        </li>
                        <li className="flex gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#F97316] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 5z" />
                            </svg>
                            <div className="flex flex-col gap-1">
                                <span className="text-[#F97316] font-bold">{siteConfig.contact.phone}</span>
                                <span className="text-[#F97316] font-bold">{siteConfig.contact.phone2}</span>
                                <span className="text-[#F97316] font-bold">{siteConfig.contact.phone3}</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-xs">
                <p>Copyright 2026 © {siteConfig.company.englishName}</p>
            </div>
        </footer>
    );
}
