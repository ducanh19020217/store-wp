import { siteConfig } from '@/config/site';

export const metadata = {
    title: `Giỏ Hàng - ${siteConfig.company.fullName}`,
    description: `Xem và quản lý giỏ hàng của bạn tại ${siteConfig.company.name}. Miễn phí vận chuyển, hỗ trợ đổi trả trong 7 ngày.`,
    robots: 'noindex, nofollow', // Cart pages shouldn't be indexed
};

export { default } from './page';
