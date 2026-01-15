const API_URL = process.env.NEXT_PUBLIC_WP_API_URL || 'http://localhost:8082/wp-json';
const JWT_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwODIiLCJpYXQiOjE3Njg0NDU3NzQsIm5iZiI6MTc2ODQ0NTc3NCwiZXhwIjoxNzY5MDUwNTc0LCJkYXRhIjp7InVzZXIiOnsiaWQiOiIzIn19fQ.MwbB4BaF87UsooPYC0fXsdgxRjn1u0WfODNU21X5BQA';

async function fetchAPI(endpoint) {
    const headers = {
        'Authorization': `Bearer ${JWT_TOKEN}`,
        'Content-Type': 'application/json',
    };

    // console.log(`Fetching API: ${API_URL}${endpoint}`);
    // Debug: Write to a file since we can't see console logs easily
    try {
        if (typeof window === 'undefined') {
            const fs = require('fs');
            fs.appendFileSync('/home/ducanh/Downloads/wordpress-6.9-vi/wordpress/frontend/api_debug.log', `${new Date().toISOString()} - Fetching: ${API_URL}${endpoint}\n`);
        }
    } catch (e) { }

    const res = await fetch(`${API_URL}${endpoint}`, {
        headers,
        cache: 'no-store'
    });
    if (!res.ok) {
        throw new Error(`Failed to fetch API: ${res.status}`);
    }
    return res.json();
}

export async function getPosts(categoryId = null) {
    const endpoint = categoryId
        ? `/wp/v2/posts?categories=${categoryId}&_embed`
        : '/wp/v2/posts?_embed';
    return fetchAPI(endpoint);
}

export async function getPostCategories() {
    return fetchAPI('/wp/v2/categories?hide_empty=false');
}

export async function getProducts() {
    return fetchAPI('/wc/v3/products?per_page=20');
}

export async function getCategories() {
    return fetchAPI('/wc/v3/products/categories?per_page=50&hide_empty=false');
}

export async function getProductsByCategory(categoryId) {
    return fetchAPI(`/wc/v3/products?category=${categoryId}&per_page=10`);
}

export async function searchProducts(query) {
    return fetchAPI(`/wc/v3/products?search=${encodeURIComponent(query)}&per_page=5`);
}

export async function getPostBySlug(slug) {
    const posts = await fetchAPI(`/wp/v2/posts?slug=${slug}&_embed`);
    return posts[0];
}

export async function getProductBySlug(slug) {
    const products = await fetchAPI(`/wc/v3/products?slug=${slug}`);
    return products[0];
}
