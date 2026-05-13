import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertCircle, CheckCircle, InfoIcon, AlertTriangle } from 'lucide-react';

const Toast = ({ toast, onClose }) => {
  const getTypeStyles = () => {
    switch (toast.type) {
      case 'success':
        return {
          bg: 'bg-green-50',
          border: 'border-green-200',
          text: 'text-green-800',
          icon: <CheckCircle className="w-5 h-5 text-green-600" />,
        };
      case 'error':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          text: 'text-red-800',
          icon: <AlertCircle className="w-5 h-5 text-red-600" />,
        };
      case 'warning':
        return {
          bg: 'bg-yellow-50',
          border: 'border-yellow-200',
          text: 'text-yellow-800',
          icon: <AlertTriangle className="w-5 h-5 text-yellow-600" />,
        };
      case 'info':
      default:
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          text: 'text-blue-800',
          icon: <InfoIcon className="w-5 h-5 text-blue-600" />,
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <motion.div
      initial={{ opacity: 0, y: -10, x: 300 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, y: -10, x: 300 }}
      transition={{ duration: 0.3 }}
      className={`${styles.bg} ${styles.border} ${styles.text} border rounded-lg shadow-lg p-4 flex items-center gap-3 min-w-64`}
    >
      {styles.icon}
      <span className="flex-1">{toast.message}</span>
      <button
        onClick={onClose}
        className="p-1 hover:bg-white hover:bg-opacity-50 rounded transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

export const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div className="fixed top-6 right-6 z-50 space-y-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <Toast toast={toast} onClose={() => removeToast(toast.id)} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Toast;
