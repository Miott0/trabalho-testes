// components/ToastAlert.tsx
import React, { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastType } from '../types/ToastType';

interface ToastAlertProps {
  message: string;
  type: ToastType;
}

const ToastAlert: React.FC<ToastAlertProps> = ({ message, type }) => {
  useEffect(() => {
    if (type === ToastType.CREATE) {
      toast.success(message, { position: 'top-right', autoClose: 2500 });
    } else if (type === ToastType.UPDATE) {
      toast.info(message, { position: 'top-right', autoClose: 2500 });
    } else if (type === ToastType.DELETE) {
      toast.error(message, { position: 'top-right', autoClose: 2500 });
    }
  }, [message, type]);

  return <ToastContainer />;
};

export default ToastAlert;
