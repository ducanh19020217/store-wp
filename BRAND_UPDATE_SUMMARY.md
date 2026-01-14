# Tóm tắt cập nhật thương hiệu

## ✅ Đã hoàn thành:

### 1. File cấu hình (site.js)
- ✅ Đổi tên: "Hoàng Lâm" → "Dung Đỗ"
- ✅ Địa chỉ: TP. Hồ Chí Minh → **TP. Hải Dương, Tỉnh Hải Dương**
- ✅ Thêm Google Maps URL và tọa độ
- ✅ Số điện thoại: 0123 456 789

### 2. Components đã cập nhật
- ✅ Header.js - Sử dụng siteConfig
- ✅ Footer.js - Sử dụng siteConfig  
- ✅ Layout.js - Sử dụng siteConfig

### 3. Trang Liên hệ
- ✅ Thêm Google Maps iframe thực tế
- ✅ Hiển thị địa chỉ Hải Dương
- ✅ Sử dụng siteConfig

## ⚠️ Cần cập nhật thủ công:

Các file sau vẫn còn "Hoàng Lâm" hardcoded:

### Trang Giới thiệu (gioi-thieu/page.js)
- Line 4, 5, 6, 8: Metadata
- Line 58: Hero title
- Line 92, 104: Nội dung
- Line 145, 175: Headings

### Trang Dịch vụ (dich-vu/page.js)
- Line 4, 8: Metadata
- Line 137, 204: Nội dung

### Trang Tin tức (tin-tuc/page.js & [slug]/page.js)
- Metadata và author info

### Trang chủ (page.js)
- Line 26: Hero title

## 🔧 Cách sửa nhanh:

Thay tất cả "Hoàng Lâm" bằng "Dung Đỗ" hoặc sử dụng `{siteConfig.company.name}`

Ví dụ:
```javascript
// Thay vì:
"Điện Máy Tổng Hợp Hoàng Lâm"

// Dùng:
{siteConfig.company.fullName}
// hoặc
"Dung Đỗ - Phụ Kiện Nghề May"
```

## 📍 Google Maps đã thêm:

- URL: Hải Dương, Việt Nam
- Tọa độ: 20.93736, 106.31193
- Iframe responsive trên trang Liên hệ
