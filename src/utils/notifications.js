// Simple toast notification system
let toastCounter = 0;
const toasts = new Map();

// Create a simple toast element
const createToast = (message, type = "info") => {
  const toastId = `toast-${++toastCounter}`;

  // Create toast container if it doesn't exist
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    container.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 10000;
      display: flex;
      flex-direction: column;
      gap: 10px;
    `;
    document.body.appendChild(container);
  }

  // Create toast element
  const toast = document.createElement("div");
  toast.id = toastId;
  toast.style.cssText = `
    background: ${type === "success" ? "#4CAF50" : type === "error" ? "#f44336" : type === "loading" ? "#2196F3" : "#333"};
    color: white;
    padding: 12px 20px;
    border-radius: 4px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    min-width: 250px;
    max-width: 400px;
    word-wrap: break-word;
    opacity: 0;
    transform: translateX(100%);
    transition: all 0.3s ease;
    position: relative;
    cursor: pointer;
  `;

  // Add loading spinner for loading toasts
  if (type === "loading") {
    toast.innerHTML = `
      <div style="display: flex; align-items: center; gap: 10px;">
        <div style="
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        "></div>
        <span>${message}</span>
      </div>
    `;

    // Add CSS animation for spinner
    if (!document.getElementById("toast-spinner-style")) {
      const style = document.createElement("style");
      style.id = "toast-spinner-style";
      style.textContent = `
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `;
      document.head.appendChild(style);
    }
  } else {
    toast.textContent = message;
  }

  // Add close button for non-loading toasts
  if (type !== "loading") {
    const closeBtn = document.createElement("span");
    closeBtn.innerHTML = "&times;";
    closeBtn.style.cssText = `
      position: absolute;
      top: 5px;
      right: 10px;
      font-size: 18px;
      font-weight: bold;
      cursor: pointer;
      opacity: 0.7;
    `;
    closeBtn.onclick = () => removeToast(toastId);
    toast.appendChild(closeBtn);
  }

  // Add click to close functionality
  toast.onclick = () => {
    if (type !== "loading") {
      removeToast(toastId);
    }
  };

  container.appendChild(toast);
  toasts.set(toastId, toast);

  // Animate in
  setTimeout(() => {
    toast.style.opacity = "1";
    toast.style.transform = "translateX(0)";
  }, 10);

  // Auto remove after delay (except for loading toasts)
  if (type !== "loading") {
    setTimeout(() => {
      removeToast(toastId);
    }, 5000);
  }

  return toastId;
};

// Remove toast
const removeToast = (toastId) => {
  const toast = toasts.get(toastId);
  if (toast) {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(100%)";
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
      toasts.delete(toastId);
    }, 300);
  }
};

// Update existing toast
const updateToast = (toastId, type, message) => {
  const toast = toasts.get(toastId);
  if (toast) {
    // Update background color
    toast.style.background =
      type === "success" ? "#4CAF50" : type === "error" ? "#f44336" : "#333";

    // Update content
    if (type === "loading") {
      toast.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
          <div style="
            width: 16px;
            height: 16px;
            border: 2px solid rgba(255,255,255,0.3);
            border-top: 2px solid white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          "></div>
          <span>${message}</span>
        </div>
      `;
    } else {
      toast.innerHTML = `
        <span>${message}</span>
        <span style="
          position: absolute;
          top: 5px;
          right: 10px;
          font-size: 18px;
          font-weight: bold;
          cursor: pointer;
          opacity: 0.7;
        ">&times;</span>
      `;

      // Re-add click handlers
      toast.onclick = () => removeToast(toastId);
      const closeBtn = toast.querySelector("span:last-child");
      if (closeBtn) {
        closeBtn.onclick = (e) => {
          e.stopPropagation();
          removeToast(toastId);
        };
      }
    }

    // Auto remove after delay (except for loading toasts)
    if (type !== "loading") {
      setTimeout(() => {
        removeToast(toastId);
      }, 5000);
    }
  }
};

// Export functions
export const showSuccess = (message) => createToast(message, "success");
export const showError = (message) => createToast(message, "error");
export const showLoading = (message) => createToast(message, "loading");
export { updateToast };
