# Hướng Dẫn Cấu Hình Thông Tin Công Ty

## 📍 File cấu hình chính

Tất cả thông tin công ty được quản lý tập trung tại:
```
frontend/src/config/site.js
```

## ⚙️ Cách thay đổi thông tin

### 1. Thông tin công ty
```javascript
company: {
  name: "Dung Đỗ",                    // Tên ngắn gọn
  fullName: "Dung Đỗ - Phụ Kiện Nghề May",  // Tên đầy đủ
  slogan: "Phụ Kiện Nghề May Chuyên Nghiệp", // Slogan
  description: "...",                  // Mô tả ngắn
  logo: "DD",                          // Logo text (2 chữ cái)
}
```

### 2. Thông tin liên hệ
```javascript
contact: {
  phone: "0123 456 789",              // Số điện thoại hiển thị
  phoneRaw: "0123456789",             // Số điện thoại không khoảng trắng
  email: "contact@dungdo.vn",         // Email
  address: "123 Đường ABC, Quận 1, TP. HCM, Việt Nam", // Địa chỉ đầy đủ
  addressShort: "Quận 1, TP. Hồ Chí Minh",  // Địa chỉ ngắn gọn
  workingHours: "Thứ 2 - Chủ Nhật: 8:00 - 20:00", // Giờ làm việc
}
```

### 3. Mạng xã hội
```javascript
social: {
  facebook: "https://facebook.com/dungdo",
  zalo: "https://zalo.me/0123456789",
  youtube: "https://youtube.com/@dungdo",
}
```

### 4. SEO
```javascript
seo: {
  defaultTitle: "...",        // Title mặc định
  defaultDescription: "...",  // Description mặc định
  keywords: "...",            // Keywords
}
```

## 🔄 Sau khi thay đổi

1. Lưu file `site.js`
2. Next.js sẽ tự động reload (hot reload)
3. Kiểm tra lại trang web

## 📄 Các trang sử dụng cấu hình

- ✅ Header (Logo, Tên công ty, Hotline)
- ✅ Footer (Thông tin công ty, Địa chỉ, Số điện thoại)
- ✅ Layout (Floating buttons, Meta tags)
- ✅ Trang Liên hệ
- ⚠️ Các trang khác cần cập nhật thủ công nếu có

## 💡 Lưu ý

- **phoneRaw**: Phải giống với `phone` nhưng không có khoảng trắng (dùng cho href="tel:")
- **logo**: Nên là 2-3 chữ cái viết hoa
- **Sau khi đổi số điện thoại**: Nhớ cập nhật cả `phone` và `phoneRaw`
