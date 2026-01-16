'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { searchProducts, getCategories } from '@/lib/api';

export default function Search() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState({ products: [], categories: [] });
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const searchRef = useRef(null);

    // Helper to remove accents for Vietnamese search
    const removeAccents = (str) => {
        return str.normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd')
            .replace(/Đ/g, 'D');
    };

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (query.length >= 2) {
                setLoading(true);
                setIsOpen(true);
                try {
                    const [products, allCategories] = await Promise.all([
                        searchProducts(query),
                        getCategories()
                    ]);

                    // Filter categories client-side with case and accent insensitivity
                    const normalizedQuery = removeAccents(query.toLowerCase());
                    const matchedCategories = allCategories.filter(cat => {
                        const normalizedName = removeAccents(cat.name.toLowerCase());
                        return normalizedName.includes(normalizedQuery);
                    }).slice(0, 3);

                    setResults({ products, categories: matchedCategories });
                } catch (error) {
                    console.error('Search error:', error);
                } finally {
                    setLoading(false);
                }
            } else {
                setResults({ products: [], categories: [] });
                setIsOpen(false);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [query]);

    // Close on click outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative w-full max-w-xl mx-auto" ref={searchRef}>
            <div className="relative">
                <input
                    type="text"
                    placeholder="Tìm kiếm sản phẩm, danh mục..."
                    className="w-full pl-12 pr-4 py-3 bg-gray-100 border-transparent focus:bg-white focus:border-red-600 rounded-xl transition-all outline-none shadow-sm"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => query.length >= 2 && setIsOpen(true)}
                />
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                {loading && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                    </div>
                )}
            </div>

            {/* Dropdown Results */}
            {isOpen && (results.products.length > 0 || results.categories.length > 0) && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-[9999] max-h-[80vh] overflow-y-auto">

                    {/* Categories */}
                    {results.categories.length > 0 && (
                        <div className="p-2 bg-gray-50 border-b border-gray-100">
                            <h3 className="text-xs font-bold text-gray-500 uppercase px-3 py-2">Danh mục</h3>
                            <div className="grid grid-cols-1 gap-1">
                                {results.categories.map(cat => (
                                    <Link
                                        key={cat.id}
                                        href={`/danh-muc/${cat.slug}`}
                                        className="flex items-center px-3 py-2 hover:bg-white hover:shadow-sm rounded-lg transition-all"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <span className="text-sm font-medium text-gray-700">{cat.name}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Products */}
                    {results.products.length > 0 && (
                        <div className="p-2">
                            <h3 className="text-xs font-bold text-gray-500 uppercase px-3 py-2">Sản phẩm</h3>
                            <div className="space-y-1">
                                {results.products.map(product => {
                                    const price = Number(product.price || 0);
                                    const regularPrice = Number(product.regular_price || 0);
                                    const onSale = product.on_sale;
                                    const image = product.images?.[0]?.src;

                                    return (
                                        <Link
                                            key={product.id}
                                            href={`/san-pham/${product.slug}`}
                                            className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-all group"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <div className="w-12 h-12 bg-white rounded-lg border border-gray-100 flex items-center justify-center overflow-hidden shrink-0 relative">
                                                {image ? (
                                                    <Image src={image} alt={product.name} fill className="object-cover" />
                                                ) : (
                                                    <span className="text-xs text-gray-300">NO IMG</span>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-sm font-bold text-gray-900 truncate group-hover:text-red-600 transition-colors">
                                                    {product.name}
                                                </h4>
                                                <div className="flex items-center gap-2 mt-0.5">
                                                    {onSale ? (
                                                        <>
                                                            <span className="text-xs font-bold text-red-600">{price.toLocaleString('vi-VN')}đ</span>
                                                            <span className="text-[10px] text-gray-400 line-through">{regularPrice.toLocaleString('vi-VN')}đ</span>
                                                        </>
                                                    ) : (
                                                        <span className="text-xs font-bold text-red-600">
                                                            {price > 0 ? `${price.toLocaleString('vi-VN')}đ` : 'Liên hệ'}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {isOpen && query.length >= 2 && results.products.length === 0 && results.categories.length === 0 && !loading && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 p-8 text-center z-50">
                    <p className="text-gray-500 text-sm">Không tìm thấy kết quả nào cho &quot;{query}&quot;</p>
                </div>
            )}
        </div>
    );
}
