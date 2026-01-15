'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function CategoryFilter({ categories }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentCategory = searchParams.get('category') || 'all';

    const handleCategoryClick = (slug) => {
        if (slug === 'all') {
            router.push('/tin-tuc');
        } else {
            router.push(`/tin-tuc?category=${slug}`);
        }
    };

    return (
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
                <button
                    key={cat.id || cat.slug}
                    onClick={() => handleCategoryClick(cat.slug)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm whitespace-nowrap transition-all ${currentCategory === cat.slug
                            ? 'bg-red-600 text-white shadow-lg'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                >
                    {cat.icon && <span>{cat.icon}</span>}
                    <span>{cat.name}</span>
                </button>
            ))}
        </div>
    );
}
