const API_URL = process.env.NEXT_PUBLIC_WP_API_URL;

async function fetchAPI(endpoint) {
    const res = await fetch(`${API_URL}${endpoint}`);
    if (!res.ok) {
        throw new Error(`Failed to fetch API: ${res.status}`);
    }
    return res.json();
}

export async function getPosts() {
    return fetchAPI('/wp/v2/posts?_embed');
}

export async function getProducts() {
    return fetchAPI('/wp/v2/product?per_page=20&_embed');
}

export async function getCategories() {
    return fetchAPI('/wp/v2/product_cat?per_page=50&hide_empty=false');
}

export async function getProductsByCategory(categoryId) {
    return fetchAPI(`/wp/v2/product?product_cat=${categoryId}&per_page=10&_embed`);
}

export async function getPostBySlug(slug) {
    const posts = await fetchAPI(`/wp/v2/posts?slug=${slug}&_embed`);
    return posts[0];
}

export async function getProductBySlug(slug) {
    const products = await fetchAPI(`/wp/v2/product?slug=${slug}&_embed`);
    return products[0];
}
