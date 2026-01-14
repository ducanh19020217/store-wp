// Cart utilities - Quản lý giỏ hàng với localStorage

export const CART_STORAGE_KEY = 'dungdo_cart';

// Get cart from localStorage
export const getCart = () => {
    if (typeof window === 'undefined') return [];
    try {
        const cart = localStorage.getItem(CART_STORAGE_KEY);
        return cart ? JSON.parse(cart) : [];
    } catch (e) {
        console.error('Error reading cart:', e);
        return [];
    }
};

// Save cart to localStorage
export const saveCart = (cart) => {
    if (typeof window === 'undefined') return;
    try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
        // Dispatch custom event for cart updates
        window.dispatchEvent(new Event('cartUpdated'));
    } catch (e) {
        console.error('Error saving cart:', e);
    }
};

// Add item to cart
export const addToCart = (product, quantity = 1) => {
    const cart = getCart();
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price || 0,
            image: product.image || null,
            slug: product.slug,
            quantity: quantity,
        });
    }

    saveCart(cart);
    return cart;
};

// Remove item from cart
export const removeFromCart = (productId) => {
    const cart = getCart();
    const newCart = cart.filter(item => item.id !== productId);
    saveCart(newCart);
    return newCart;
};

// Update item quantity
export const updateQuantity = (productId, quantity) => {
    const cart = getCart();
    const item = cart.find(item => item.id === productId);

    if (item) {
        if (quantity <= 0) {
            return removeFromCart(productId);
        }
        item.quantity = quantity;
        saveCart(cart);
    }

    return cart;
};

// Clear cart
export const clearCart = () => {
    saveCart([]);
    return [];
};

// Get cart total
export const getCartTotal = (cart) => {
    return cart.reduce((total, item) => {
        const price = parseFloat(item.price) || 0;
        return total + (price * item.quantity);
    }, 0);
};

// Get cart count
export const getCartCount = (cart) => {
    return cart.reduce((count, item) => count + item.quantity, 0);
};
