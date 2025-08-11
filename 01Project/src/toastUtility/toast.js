import { toast } from "react-toastify";

// Shared configuration for all toasts
const toastConfig = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "colored",
};

/**
 * Show a success toast message
 * @param {string} message
 */
export const showSuccess = (message) => {
  toast.success(message, toastConfig);
};

/**
 * Show an error toast message
 * @param {string} message
 */
export const showError = (message) => {
  toast.error(message, toastConfig);
};

/**
 * Show an info toast message
 * @param {string} message
 */
export const notifyInfo = (message) => {
  toast.info(message, toastConfig);
};

/**
 * Show a warning toast message
 * @param {string} message
 */
export const notifyWarning = (message) => {
  toast.warning(message, toastConfig);
};
