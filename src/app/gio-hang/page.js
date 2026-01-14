'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { getCart, updateQuantity, removeFromCart, clearCart, getCartTotal, getCartCount } from '@/lib/cart';

export default function CartPage() {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Load cart from localStorage
        setCart(getCart());
        setLoading(false);

        // Listen for cart updates
        const handleCartUpdate = () => {
            setCart(getCart());
        };

        window.addEventListener('cartUpdated', handleCartUpdate);
        return () => window.removeEventListener('cartUpdated', handleCartUpdate);
    }, []);

    const handleUpdateQuantity = (productId, newQuantity) => {
        updateQuantity(productId, newQuantity);
        setCart(getCart());
    };

    const handleRemove = (productId) => {
        if (confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
            removeFromCart(productId);
            setCart(getCart());
        }
    };

    const handleClearCart = () => {
        if (confirm('Bạn có chắc muốn xóa toàn bộ giỏ hàng?')) {
            clearCart();
            setCart([]);
        }
    };

    const total = getCartTotal(cart);
    const itemCount = getCartCount(cart);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Đang tải giỏ hàng...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 md:py-12">
            {/* Breadcrumb */}
            <div className="container-custom px-4 mb-6 md:mb-8">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Link href="/" className="hover:text-red-600 transition-colors">Trang chủ</Link>
                    <span>/</span>
                    <span className="text-gray-900 font-medium">Giỏ hàng</span>
                </div>
            </div>

            <div className="container-custom px-4">
                {/* Header */}
                <div className="mb-6 md:mb-8">
                    <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">Giỏ Hàng Của Bạn</h1>
                    <p className="text-gray-600">
                        {itemCount > 0 ? `Bạn có ${itemCount} sản phẩm trong giỏ hàng` : 'Giỏ hàng trống'}
                    </p>
                </div>

                {cart.length === 0 ? (
                    /* Empty Cart */
                    <div className="bg-white rounded-2xl md:rounded-3xl shadow-lg p-8 md:p-16 text-center">
                        <div className="max-w-md mx-auto">
                            <div className="text-6xl md:text-8xl mb-6 opacity-20">🛒</div>
                            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4">
                                Giỏ Hàng Trống
                            </h2>
                            <p className="text-gray-600 mb-8">
                                Bạn chưa có sản phẩm nào trong giỏ hàng. Hãy khám phá các sản phẩm của chúng tôi!
                            </p>
                            <Link
                                href="/"
                                className="inline-block bg-red-600 text-white px-8 py-4 rounded-xl font-black hover:bg-red-700 transition-all shadow-lg"
                            >
                                Tiếp Tục Mua Sắm
                            </Link>
                        </div>
                    </div>
                ) : (
                    /* Cart with items */
                    <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            {cart.map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-white rounded-xl md:rounded-2xl shadow-md hover:shadow-lg transition-all p-4 md:p-6"
                                >
                                    <div className="flex gap-4 md:gap-6">
                                        {/* Product Image */}
                                        <div className="w-20 h-20 md:w-28 md:h-28 bg-gray-100 rounded-lg flex items-center justify-center shrink-0 overflow-hidden">
                                            {item.image ? (
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <span className="text-2xl md:text-4xl opacity-30">📦</span>
                                            )}
                                        </div>

                                        {/* Product Info */}
                                        <div className="flex-1 min-w-0">
                                            <Link
                                                href={`/san-pham/${item.slug}`}
                                                className="font-black text-base md:text-lg text-gray-900 hover:text-red-600 transition-colors line-clamp-2 mb-2 block"
                                            >
                                                {item.name}
                                            </Link>

                                            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4">
                                                <p className="text-red-600 font-black text-lg md:text-xl">
                                                    {item.price > 0
                                                        ? `${(item.price * item.quantity).toLocaleString('vi-VN')} đ`
                                                        : 'Liên hệ'
                                                    }
                                                </p>
                                                {item.price > 0 && (
                                                    <p className="text-xs md:text-sm text-gray-500">
                                                        {item.price.toLocaleString('vi-VN')} đ x {item.quantity}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Quantity Controls */}
                                            <div className="flex items-center gap-3">
                                                <div className="flex items-center border-2 border-gray-200 rounded-lg">
                                                    <button
                                                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                                        className="px-3 py-1.5 md:px-4 md:py-2 hover:bg-gray-100 transition-colors font-bold text-gray-700"
                                                    >
                                                        −
                                                    </button>
                                                    <input
                                                        type="number"
                                                        value={item.quantity}
                                                        onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value) || 1)}
                                                        className="w-12 md:w-16 text-center font-bold border-x-2 border-gray-200 py-1.5 md:py-2 focus:outline-none"
                                                        min="1"
                                                    />
                                                    <button
                                                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                                        className="px-3 py-1.5 md:px-4 md:py-2 hover:bg-gray-100 transition-colors font-bold text-gray-700"
                                                    >
                                                        +
                                                    </button>
                                                </div>

                                                <button
                                                    onClick={() => handleRemove(item.id)}
                                                    className="text-red-600 hover:text-red-700 font-bold text-sm md:text-base flex items-center gap-1"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                    <span className="hidden sm:inline">Xóa</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Clear Cart Button */}
                            <button
                                onClick={handleClearCart}
                                className="w-full md:w-auto px-6 py-3 border-2 border-red-600 text-red-600 rounded-xl font-bold hover:bg-red-50 transition-all"
                            >
                                Xóa Toàn Bộ Giỏ Hàng
                            </button>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-6 md:p-8 sticky top-24">
                                <h2 className="text-xl md:text-2xl font-black mb-6 border-b-2 border-gray-100 pb-4">
                                    Tổng Đơn Hàng
                                </h2>

                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between text-gray-700">
                                        <span>Tạm tính ({itemCount} sản phẩm)</span>
                                        <span className="font-bold">{total.toLocaleString('vi-VN')} đ</span>
                                    </div>
                                    <div className="flex justify-between text-gray-700">
                                        <span>Phí vận chuyển</span>
                                        <span className="font-bold text-green-600">Miễn phí</span>
                                    </div>
                                    <div className="border-t-2 border-gray-100 pt-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-lg font-black">Tổng cộng</span>
                                            <span className="text-2xl md:text-3xl font-black text-red-600">
                                                {total.toLocaleString('vi-VN')} đ
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    disabled
                                    className="w-full bg-gray-300 text-gray-500 py-4 rounded-xl font-black mb-3 cursor-not-allowed"
                                >
                                    Thanh Toán (Sắp Ra Mắt)
                                </button>

                                <Link
                                    href={`tel:${siteConfig.contact.phoneRaw}`}
                                    className="block w-full bg-red-600 text-white py-4 rounded-xl font-black text-center hover:bg-red-700 transition-all shadow-lg"
                                >
                                    📞 Gọi Đặt Hàng: {siteConfig.contact.phone}
                                </Link>

                                <Link
                                    href="/"
                                    className="block w-full text-center text-blue-900 font-bold mt-4 hover:text-red-600 transition-colors"
                                >
                                    ← Tiếp tục mua sắm
                                </Link>

                                {/* Trust Badges */}
                                <div className="mt-8 pt-6 border-t-2 border-gray-100 space-y-3">
                                    <div className="flex items-center gap-3 text-sm text-gray-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span>Sản phẩm chính hãng 100%</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span>Miễn phí vận chuyển toàn quốc</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span>Hỗ trợ đổi trả trong 7 ngày</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
