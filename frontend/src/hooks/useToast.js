import { useState, useCallback } from 'react';

// Toast context hook
export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success', duration = 3000) => {
    const id = Date.now();
    
    const toast = {
      id,
      message,
      type, // 'success', 'error', 'info', 'warning'
      duration,
    };

    setToasts((prev) => [...prev, toast]);

    // Auto-remove toast after duration
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }

    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return {
    toasts,
    addToast,
    removeToast,
  };
};

export default useToast;
