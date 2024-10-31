import React, { useEffect } from 'react';

interface ToastAlertProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const ToastAlert: React.FC<ToastAlertProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    // Fecha o toast automaticamente após 3 segundos
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-4 right-4 px-4 py-2 rounded-md text-white ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
      }`}
    >
      {message}
    </div>
  );
};

export default ToastAlert;
