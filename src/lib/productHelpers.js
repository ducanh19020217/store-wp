// Product data helpers - Xử lý dữ liệu sản phẩm từ WordPress API

/**
 * Lấy giá sản phẩm từ WordPress product meta
 * @param {Object} product - Product object từ WordPress API
 * @returns {number} - Giá sản phẩm (số)
 */
export function getProductPrice(product) {
    if (!product) return 0;

    // WooCommerce lưu giá trong meta fields
    const price = product.meta?._price ||
        product.meta?._regular_price ||
        product.price ||
        0;

    return parseFloat(price) || 0;
}

/**
 * Lấy giá sale của sản phẩm
 * @param {Object} product - Product object từ WordPress API
 * @returns {number} - Giá sale (số)
 */
export function getProductSalePrice(product) {
    if (!product) return 0;

    const salePrice = product.meta?._sale_price || product.sale_price || 0;
    return parseFloat(salePrice) || 0;
}

/**
 * Kiểm tra sản phẩm có đang sale không
 * @param {Object} product - Product object từ WordPress API
 * @returns {boolean}
 */
export function isOnSale(product) {
    const salePrice = getProductSalePrice(product);
    return salePrice > 0;
}

/**
 * Lấy URL ảnh đại diện của sản phẩm
 * @param {Object} product - Product object từ WordPress API
 * @returns {string|null} - URL ảnh hoặc null
 */
export function getProductImage(product) {
    if (!product) return null;

    // Từ _embedded (khi dùng ?_embed)
    if (product._embedded?.['wp:featuredmedia']?.[0]?.source_url) {
        return product._embedded['wp:featuredmedia'][0].source_url;
    }

    // Từ featured_media_src_url (một số theme/plugin)
    if (product.featured_media_src_url) {
        return product.featured_media_src_url;
    }

    // Từ images array (WooCommerce REST API format)
    if (product.images?.[0]?.src) {
        return product.images[0].src;
    }

    return null;
}

/**
 * Lấy tên sản phẩm
 * @param {Object} product - Product object từ WordPress API
 * @returns {string}
 */
export function getProductName(product) {
    if (!product) return '';

    // WordPress REST API format
    if (product.title?.rendered) {
        return product.title.rendered;
    }

    // WooCommerce REST API format
    if (product.name) {
        return product.name;
    }

    return '';
}

/**
 * Lấy mô tả ngắn của sản phẩm
 * @param {Object} product - Product object từ WordPress API
 * @returns {string}
 */
export function getProductExcerpt(product) {
    if (!product) return '';

    // WordPress REST API format
    if (product.excerpt?.rendered) {
        return product.excerpt.rendered;
    }

    // WooCommerce REST API format
    if (product.short_description) {
        return product.short_description;
    }

    return '';
}

/**
 * Format giá tiền theo định dạng Việt Nam
 * @param {number} price - Giá tiền
 * @returns {string}
 */
export function formatPrice(price) {
    if (!price || price <= 0) return 'Liên hệ';
    return `${Number(price).toLocaleString('vi-VN')} đ`;
}

/**
 * Chuẩn hóa dữ liệu sản phẩm từ WordPress API
 * @param {Object} product - Product object từ WordPress API
 * @returns {Object} - Normalized product object
 */
export function normalizeProduct(product) {
    return {
        id: product.id,
        name: getProductName(product),
        slug: product.slug,
        price: getProductPrice(product),
        salePrice: getProductSalePrice(product),
        isOnSale: isOnSale(product),
        image: getProductImage(product),
        excerpt: getProductExcerpt(product),
        categories: product.product_cat || product.categories || [],
    };
}
