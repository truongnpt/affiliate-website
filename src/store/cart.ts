'use client';

import { useState, useEffect } from 'react';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  discount: number;
  image: string;
  slug?: string;
  quantity: number;
  product_categories?: {
    name: string;
  };
}

/**
 * Hook to get cart items from localStorage
 * Returns reactive cart state that updates when localStorage changes
 */
export function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const loadCart = () => {
      try {
        const cartStr = localStorage.getItem('cart');
        if (cartStr) {
          const items = JSON.parse(cartStr);
          setCartItems(items);
        } else {
          setCartItems([]);
        }
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
        setCartItems([]);
      }
    };

    // Load cart initially
    loadCart();

    // Listen for storage events (for cross-tab synchronization)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'cart') {
        loadCart();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Also listen to custom events for same-tab updates
    const handleCartUpdate = () => {
      loadCart();
    };
    window.addEventListener('cart-updated', handleCartUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cart-updated', handleCartUpdate);
    };
  }, []);

  return cartItems;
}

/**
 * Get cart items from localStorage synchronously (non-reactive)
 * Use this when you need cart data outside of React components
 */
export function getCart(): CartItem[] {
  try {
    const cartStr = localStorage.getItem('cart');
    if (cartStr) {
      return JSON.parse(cartStr);
    }
  } catch (error) {
    console.error('Error getting cart from localStorage:', error);
  }
  return [];
}

/**
 * Get cart count
 */
export function getCartCount(): number {
  const items = getCart();
  return items.reduce((total, item) => total + item.quantity, 0);
}

/**
 * Add item to cart
 */
export function addToCart(item: Omit<CartItem, 'quantity'> & { quantity?: number }) {
  try {
    const cart = getCart();
    const existingItemIndex = cart.findIndex((cartItem) => cartItem.id === item.id);

    if (existingItemIndex >= 0) {
      // Item already in cart, update quantity
      cart[existingItemIndex].quantity += item.quantity || 1;
    } else {
      // New item, add to cart
      cart.push({
        ...item,
        quantity: item.quantity || 1,
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    // Dispatch custom event for same-tab updates
    window.dispatchEvent(new Event('cart-updated'));
    return true;
  } catch (error) {
    console.error('Error adding item to cart:', error);
    return false;
  }
}

/**
 * Remove item from cart
 */
export function removeFromCart(productId: number) {
  try {
    const cart = getCart();
    const filteredCart = cart.filter((item) => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(filteredCart));
    // Dispatch custom event for same-tab updates
    window.dispatchEvent(new Event('cart-updated'));
    return true;
  } catch (error) {
    console.error('Error removing item from cart:', error);
    return false;
  }
}

/**
 * Update item quantity in cart
 */
export function updateCartItemQuantity(productId: number, quantity: number) {
  try {
    if (quantity <= 0) {
      return removeFromCart(productId);
    }

    const cart = getCart();
    const itemIndex = cart.findIndex((item) => item.id === productId);

    if (itemIndex >= 0) {
      cart[itemIndex].quantity = quantity;
      localStorage.setItem('cart', JSON.stringify(cart));
      // Dispatch custom event for same-tab updates
      window.dispatchEvent(new Event('cart-updated'));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error updating cart item quantity:', error);
    return false;
  }
}

/**
 * Clear cart
 */
export function clearCart() {
  try {
    localStorage.removeItem('cart');
    // Dispatch custom event for same-tab updates
    window.dispatchEvent(new Event('cart-updated'));
    return true;
  } catch (error) {
    console.error('Error clearing cart:', error);
    return false;
  }
}

/**
 * Get cart total price
 */
export function getCartTotal(): number {
  const items = getCart();
  return items.reduce((total, item) => {
    const itemPrice = item.discount
      ? Math.round(item.price * (1 - item.discount / 100))
      : item.price;
    return total + itemPrice * item.quantity;
  }, 0);
}

