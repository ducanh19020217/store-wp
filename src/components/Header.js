'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getCategories, getProductsByCategory } from '@/lib/api';
import { siteConfig } from '@/config/site';
import Search from '@/components/Search';

export default function Header() {
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState(null);
    const [categoryProducts, setCategoryProducts] = useState({});
    const [loadingProducts, setLoadingProducts] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        async function fetchCats() {
            try {
                const data = await getCategories();
                const filtered = data.filter(cat => cat.slug !== 'uncategorized' && cat.slug !== 'chua-phan-loai');
                setCategories(filtered);
            } catch (e) {
                console.error("Error fetching categories:", e);
            }
        }
        fetchCats();
    }, []);

    const handleCategoryHover = async (category) => {
        setActiveCategory(category);
        if (!categoryProducts[category.id]) {
            setLoadingProducts(true);
            try {
                const products = await getProductsByCategory(category.id);
                setCategoryProducts(prev => ({ ...prev, [category.id]: products.slice(0, 5) }));
            } catch (e) {
                console.error("Error fetching products for category:", e);
            } finally {
                setLoadingProducts(false);
            }
        }
    };

    return (
        <header className="w-full">
            {/* Top Bar - Hidden on mobile */}
            <div className="hidden md:block bg-white border-b border-gray-100 py-2">
                <div className="container-custom flex justify-between items-center text-sm text-gray-600">
                    <div className="flex items-center gap-4">
                        <span>Hotline: <a href={`tel:${siteConfig.contact.phoneRaw}`} className="font-bold text-[#F97316]">{siteConfig.contact.phone}</a></span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/login" className="hover:text-[#F97316] transition-colors">Đăng nhập</Link>
                        <Link href="/gio-hang" className="hover:text-[#F97316] transition-colors">Giỏ hàng / 0 đ</Link>
                    </div>
                </div>
            </div>

            {/* Main Header - Mobile optimized */}
            <div className="bg-white py-3 md:py-4 shadow-sm relative z-[101]">
                <div className="container-custom">
                    <div className="flex justify-between items-center gap-3">
                        {/* Logo - Smaller on mobile */}
                        <Link href="/" className="flex items-center group shrink-0">
                            <div className="bg-[#1E3A8A] text-white p-1.5 md:p-2 rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center font-bold text-lg md:text-xl italic group-hover:scale-110 transition-transform">
                                {siteConfig.company.logo}
                            </div>
                            <div className="ml-2 md:ml-3">
                                <h1 className="text-sm md:text-xl font-black text-[#1E3A8A] leading-none uppercase">{siteConfig.company.name}</h1>
                                <p className="text-xs md:text-sm font-bold text-[#F97316] tracking-wider md:tracking-widest uppercase hidden sm:block">{siteConfig.company.slogan}</p>
                            </div>
                        </Link>

                        {/* Search Bar - Responsive */}
                        <div className="flex-1 max-w-md md:max-w-2xl">
                            <Search />
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden bg-[#F97316] text-white p-2 rounded-lg"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                            </svg>
                        </button>

                        {/* Contact Info - Desktop only */}
                        <div className="hidden lg:flex items-center gap-3 shrink-0">
                            <div className="bg-orange-100 p-2 rounded-full text-[#F97316] animate-pulse">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 5z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase font-bold">Hotline</p>
                                <p className="text-lg font-black text-[#F97316]">{siteConfig.contact.phone}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Menu - Desktop */}
            <nav className="hidden md:block bg-[#1E3A8A] text-white relative z-[100]">
                <div className="container-custom flex items-center">
                    {/* Dropdown Category Menu */}
                    <div className="relative group">
                        <div className="bg-[#1E3A8A] px-4 lg:px-6 py-3 font-bold flex items-center gap-2 cursor-pointer hover:bg-[#1E40AF] transition-colors text-sm lg:text-base">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 lg:h-5 lg:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            <span className="hidden lg:inline">DANH MỤC SẢN PHẨM</span>
                            <span className="lg:hidden">DANH MỤC</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 lg:h-4 lg:w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>

                        {/* Mega Menu Content - Responsive width */}
                        <div className="absolute top-full left-0 w-screen max-w-[95vw] lg:w-[800px] bg-white shadow-2xl border border-gray-100 hidden group-hover:flex animate-in fade-in slide-in-from-top-2 duration-200 rounded-b-xl overflow-hidden">
                            <div className="w-1/3 bg-gray-50 border-r border-gray-100 max-h-[60vh] overflow-y-auto">
                                <ul className="py-2">
                                    {categories.length > 0 ? categories.map((cat) => (
                                        <li
                                            key={cat.id}
                                            onMouseEnter={() => handleCategoryHover(cat)}
                                            className={`border-b border-gray-100 last:border-0 ${activeCategory?.id === cat.id ? 'bg-white text-[#F97316]' : 'text-gray-700'}`}
                                        >
                                            <Link
                                                href={`/danh-muc/${cat.slug}`}
                                                className="block px-4 lg:px-6 py-3 hover:text-[#F97316] font-bold text-xs lg:text-sm transition-colors flex justify-between items-center"
                                            >
                                                <span className="line-clamp-1">{cat.name}</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" className={`h-3 w-3 shrink-0 ${activeCategory?.id === cat.id ? 'text-[#F97316]' : 'text-gray-300'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </Link>
                                        </li>
                                    )) : (
                                        <li className="px-6 py-4 text-gray-400 text-sm italic">Đang tải...</li>
                                    )}
                                </ul>
                            </div>

                            <div className="w-2/3 p-4 lg:p-6 bg-white max-h-[60vh] overflow-y-auto">
                                {activeCategory ? (
                                    <div>
                                        <h3 className="text-[#F97316] font-black text-base lg:text-lg mb-4 border-b pb-2 uppercase tracking-tight line-clamp-1">
                                            {activeCategory.name}
                                        </h3>
                                        {loadingProducts ? (
                                            <div className="flex items-center gap-2 text-gray-400 text-sm italic">
                                                <div className="w-4 h-4 border-2 border-[#F97316] border-t-transparent rounded-full animate-spin"></div>
                                                Đang tải...
                                            </div>
                                        ) : categoryProducts[activeCategory.id]?.length > 0 ? (
                                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
                                                {categoryProducts[activeCategory.id].map((product) => (
                                                    <Link
                                                        key={product.id}
                                                        href={`/san-pham/${product.slug}`}
                                                        className="flex items-center gap-2 lg:gap-3 p-2 rounded-lg hover:bg-orange-50 transition-colors group"
                                                    >
                                                        <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gray-100 rounded flex items-center justify-center text-[10px] text-gray-400 font-bold shrink-0">
                                                            IMG
                                                        </div>
                                                        <div className="overflow-hidden flex-1 min-w-0">
                                                            <p className="text-xs lg:text-sm font-bold text-gray-800 truncate group-hover:text-[#F97316]">{product.name}</p>
                                                            <p className="text-[10px] lg:text-xs text-[#F97316] font-black">
                                                                {product.price ? `${Number(product.price).toLocaleString('vi-VN')} đ` : 'Liên hệ'}
                                                            </p>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-gray-400 text-sm italic">Chưa có sản phẩm.</p>
                                        )}
                                        <Link
                                            href={`/danh-muc/${activeCategory.slug}`}
                                            className="inline-block mt-4 lg:mt-6 text-xs lg:text-sm font-bold text-[#1E3A8A] hover:text-[#F97316] transition-colors"
                                        >
                                            Xem tất cả &rarr;
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="h-full flex flex-col items-center justify-center text-gray-300 py-8">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 lg:h-12 lg:w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <p className="text-xs lg:text-sm">Rê chuột vào danh mục</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <ul className="flex items-center">
                        <li><Link href="/" className="px-3 lg:px-6 py-3 hover:bg-[#1E40AF] font-bold text-xs lg:text-sm block transition-colors">TRANG CHỦ</Link></li>
                        <li><Link href="/gioi-thieu" className="px-3 lg:px-6 py-3 hover:bg-[#1E40AF] font-bold text-xs lg:text-sm block transition-colors">GIỚI THIỆU</Link></li>
                        <li><Link href="/dich-vu" className="px-3 lg:px-6 py-3 hover:bg-[#1E40AF] font-bold text-xs lg:text-sm block transition-colors">DỊCH VỤ</Link></li>
                        <li><Link href="/tin-tuc" className="px-3 lg:px-6 py-3 hover:bg-[#1E40AF] font-bold text-xs lg:text-sm block transition-colors uppercase">Tin tức</Link></li>
                        <li><Link href="/lien-he" className="px-3 lg:px-6 py-3 hover:bg-[#1E40AF] font-bold text-xs lg:text-sm block transition-colors">LIÊN HỆ</Link></li>
                    </ul>
                </div>
            </nav>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-white border-t shadow-lg">
                    <div className="container-custom py-4">
                        <ul className="space-y-2">
                            <li><Link href="/" className="block px-4 py-3 hover:bg-gray-100 rounded-lg font-bold text-gray-900" onClick={() => setMobileMenuOpen(false)}>Trang chủ</Link></li>
                            <li><Link href="/gioi-thieu" className="block px-4 py-3 hover:bg-gray-100 rounded-lg font-bold text-gray-900" onClick={() => setMobileMenuOpen(false)}>Giới thiệu</Link></li>
                            <li><Link href="/dich-vu" className="block px-4 py-3 hover:bg-gray-100 rounded-lg font-bold text-gray-900" onClick={() => setMobileMenuOpen(false)}>Dịch vụ</Link></li>
                            <li><Link href="/tin-tuc" className="block px-4 py-3 hover:bg-gray-100 rounded-lg font-bold text-gray-900" onClick={() => setMobileMenuOpen(false)}>Tin tức - Chia sẻ</Link></li>
                            <li><Link href="/lien-he" className="block px-4 py-3 hover:bg-gray-100 rounded-lg font-bold text-gray-900" onClick={() => setMobileMenuOpen(false)}>Liên hệ</Link></li>
                            <li className="pt-4 border-t">
                                <a href={`tel:${siteConfig.contact.phoneRaw}`} className="block px-4 py-3 bg-[#F97316] text-white rounded-lg font-black text-center">
                                    📞 {siteConfig.contact.phone}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </header>
    );
}
