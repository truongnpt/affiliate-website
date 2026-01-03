'use client';

import { useState, useEffect } from 'react';

export interface User {
  id?: string;
  full_name: string;
  username?: string;
  email?: string;
  [key: string]: any;
}

/**
 * Hook to get current user from localStorage
 * Returns reactive user state that updates when localStorage changes
 */
export function useUser() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUser = () => {
      try {
        const userStr = localStorage.getItem('user');
        if (userStr) {
          const userData = JSON.parse(userStr);
          setUser(userData);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error loading user from localStorage:', error);
        setUser(null);
      }
    };

    // Load user initially
    loadUser();

    // Listen for storage events (for cross-tab synchronization)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'user') {
        loadUser();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Also listen to custom events for same-tab updates
    const handleUserUpdate = () => {
      loadUser();
    };
    window.addEventListener('user-updated', handleUserUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('user-updated', handleUserUpdate);
    };
  }, []);

  return user;
}

/**
 * Get user from localStorage synchronously (non-reactive)
 * Use this when you need user data outside of React components
 */
export function getUser(): User | null {
  try {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      return JSON.parse(userStr);
    }
  } catch (error) {
    console.error('Error getting user from localStorage:', error);
  }
  return null;
}

/**
 * Set user in localStorage and dispatch update event
 */
export function setUserData(user: User | null) {
  if (user) {
    localStorage.setItem('user', JSON.stringify(user));
  } else {
    localStorage.removeItem('user');
  }
  // Dispatch custom event for same-tab updates
  window.dispatchEvent(new Event('user-updated'));
}

// Export a default user object that can be imported (non-reactive)
// Note: This won't be reactive. For reactive access, use useUser() hook
export const user = {
  get name() {
    const userData = getUser();
    return userData?.full_name || userData?.name || 'Admin';
  },
  get data() {
    return getUser();
  },
};

