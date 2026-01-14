# WordPress & WooCommerce REST API - Tài Liệu Đầy Đủ

## 🔍 Phân biệt API Endpoints

### WordPress Core REST API (Luôn hoạt động - Không cần auth)

#### Posts (Bài viết)
```
GET /wp/v2/posts                    # Lấy danh sách bài viết
GET /wp/v2/posts?slug={slug}        # Lấy bài viết theo slug
GET /wp/v2/posts/{id}               # Lấy bài viết theo ID
```

#### Pages (Trang)
```
GET /wp/v2/pages                    # Lấy danh sách trang
GET /wp/v2/pages?slug={slug}        # Lấy trang theo slug
```

#### Categories (Danh mục bài viết)
```
GET /wp/v2/categories               # Lấy danh sách categories
```

#### Media (Hình ảnh)
```
GET /wp/v2/media                    # Lấy danh sách media
```

---

### WooCommerce Custom Post Type (WordPress REST API)

#### Products (Sản phẩm WooCommerce)
**⚠️ LƯU Ý: Endpoint là `product` (số ít), KHÔNG phải `products`**

```bash
# ✅ ĐÚNG - Lấy sản phẩm WooCommerce
GET /wp/v2/product                  # Lấy tất cả sản phẩm
GET /wp/v2/product?slug={slug}      # Lấy sản phẩm theo slug
GET /wp/v2/product?per_page=20      # Giới hạn số lượng
GET /wp/v2/product?_embed           # Kèm theo featured image

# ❌ SAI - Endpoint này không tồn tại
GET /wp/v2/products                 # KHÔNG hoạt động!
```

#### Product Categories (Danh mục sản phẩm)
```bash
# ✅ ĐÚNG
GET /wp/v2/product_cat              # Lấy danh mục sản phẩm
GET /wp/v2/product_cat?hide_empty=false  # Bao gồm cả danh mục trống

# ❌ SAI
GET /wp/v2/product_category         # KHÔNG hoạt động!
```

#### Product Tags (Thẻ sản phẩm)
```bash
GET /wp/v2/product_tag              # Lấy tags sản phẩm
```

---

### WooCommerce REST API v2/v3 (CẦN Authentication)

**⚠️ Các endpoint này YÊU CẦU Consumer Key & Secret**

```bash
# CẦN AUTH - Sẽ trả về 401 nếu không có key
GET /wc/v2/products                 # Lấy sản phẩm (cần auth)
GET /wc/v2/products/categories      # Lấy danh mục (cần auth)
GET /wc/v3/products                 # Version 3 (cần auth)
```

**Cách thêm authentication:**
```javascript
const auth = btoa(`${consumerKey}:${consumerSecret}`);
fetch(url, {
  headers: {
    'Authorization': `Basic ${auth}`
  }
});
```

---

## 📊 Cấu trúc dữ liệu trả về

### WordPress Product (từ /wp/v2/product)
```json
{
  "id": 123,
  "date": "2024-01-01T00:00:00",
  "slug": "may-may-brother",
  "status": "publish",
  "type": "product",
  "title": {
    "rendered": "Máy May Brother S-7100A"
  },
  "content": {
    "rendered": "<p>Mô tả sản phẩm...</p>"
  },
  "excerpt": {
    "rendered": "<p>Tóm tắt...</p>"
  },
  "featured_media": 456,
  "_embedded": {
    "wp:featuredmedia": [{
      "source_url": "http://example.com/image.jpg"
    }]
  },
  "product_cat": [12, 34],  // Category IDs
  "meta": {
    "_price": "15000000",
    "_regular_price": "15000000",
    "_sale_price": ""
  }
}
```

### WooCommerce Product (từ /wc/v2/products)
```json
{
  "id": 123,
  "name": "Máy May Brother S-7100A",
  "slug": "may-may-brother",
  "price": "15000000",
  "regular_price": "15000000",
  "sale_price": "",
  "images": [{
    "src": "http://example.com/image.jpg"
  }],
  "categories": [{
    "id": 12,
    "name": "Máy May Công Nghiệp"
  }]
}
```

---

## 🎯 Khuyến nghị cho dự án

### Nên dùng: WordPress REST API
```javascript
// ✅ Không cần authentication
export async function getProducts() {
  return fetchAPI('/wp/v2/product?per_page=20&_embed');
}

export async function getCategories() {
  return fetchAPI('/wp/v2/product_cat?hide_empty=false');
}

export async function getProductsByCategory(categoryId) {
  return fetchAPI(`/wp/v2/product?product_cat=${categoryId}&_embed`);
}
```

### Lấy giá sản phẩm từ WordPress API
```javascript
// Giá nằm trong meta fields
const price = product.meta?._price || product.meta?._regular_price || 0;
```

---

## 🧪 Test API Endpoints

### Kiểm tra trong browser:
```
http://localhost:8082/wp-json/wp/v2/product
http://localhost:8082/wp-json/wp/v2/product_cat
http://localhost:8082/wp-json/wp/v2/posts
```

### Kiểm tra với curl:
```bash
# Lấy sản phẩm
curl http://localhost:8082/wp-json/wp/v2/product

# Lấy danh mục
curl http://localhost:8082/wp-json/wp/v2/product_cat

# Lấy sản phẩm theo slug
curl http://localhost:8082/wp-json/wp/v2/product?slug=may-may-brother
```

---

## ⚠️ Lỗi thường gặp

### 1. Lỗi 401 Unauthorized
**Nguyên nhân:** Dùng WooCommerce API (`/wc/v2/` hoặc `/wc/v3/`) mà không có auth  
**Giải pháp:** Dùng WordPress API (`/wp/v2/product`) thay vì WooCommerce API

### 2. Lỗi 404 Not Found
**Nguyên nhân:** Sai endpoint (ví dụ: `/wp/v2/products` thay vì `/wp/v2/product`)  
**Giải pháp:** Kiểm tra lại endpoint, nhớ `product` là số ít

### 3. Không có giá sản phẩm
**Nguyên nhân:** Giá nằm trong `meta` fields, không phải `price`  
**Giải pháp:** Lấy từ `product.meta._price`

### 4. Không có ảnh sản phẩm
**Nguyên nhân:** Thiếu `_embed` parameter  
**Giải pháp:** Thêm `?_embed` vào URL

---

## 📚 Tài liệu chính thức

- WordPress REST API: https://developer.wordpress.org/rest-api/
- WooCommerce REST API: https://woocommerce.github.io/woocommerce-rest-api-docs/
- Custom Post Types: https://developer.wordpress.org/rest-api/reference/posts/
