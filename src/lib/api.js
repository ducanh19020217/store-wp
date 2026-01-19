const getBaseUrl = () => {
    if (typeof window !== "undefined") return ""; // browser can use relative path
    return process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
};

// gọi WP core thông qua Next server route (không lộ kết nối)
async function fetchWP(endpoint) {
    // endpoint ví dụ: "/posts?_embed"
    // Proxy đã có sẵn tiền tố /wp-json/wp/v2/
    const baseUrl = getBaseUrl();
    const res = await fetch(`${baseUrl}/api/wp${endpoint}`, { cache: "no-store" });
    if (!res.ok) throw new Error(`WP fetch failed: ${res.status}`);
    return res.json();
}

// gọi Woo thông qua Next server route (không lộ key)
async function fetchWC(endpoint) {
    // endpoint ví dụ: "/products?per_page=20"
    const baseUrl = getBaseUrl();
    const res = await fetch(`${baseUrl}/api/wc${endpoint}`, { cache: "no-store" });
    if (!res.ok) throw new Error(`WC fetch failed: ${res.status}`);
    return res.json();
}

export async function getPosts(categoryId = null) {
    const endpoint = categoryId
        ? `/posts?categories=${categoryId}&_embed`
        : "/posts?_embed";
    return fetchWP(endpoint);
}

export async function getPostCategories() {
    return fetchWP("/categories?hide_empty=false");
}

export async function getProducts() {
    return fetchWC("/products?per_page=20");
}

export async function getCategories() {
    return fetchWC("/products/categories?per_page=50&hide_empty=false");
}

export async function getProductsByCategory(categoryId) {
    return fetchWC(`/products?category=${categoryId}&per_page=10`);
}

export async function searchProducts(query) {
    return fetchWC(`/products?search=${encodeURIComponent(query)}&per_page=5`);
}

export async function getPostBySlug(slug) {
    const posts = await fetchWP(`/posts?slug=${slug}&_embed`);
    return posts[0];
}

export async function getProductBySlug(slug) {
    const products = await fetchWC(`/products?slug=${slug}`);
    return products[0];
}
