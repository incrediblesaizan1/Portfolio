import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Alert = ({ isOpen, onClose, type = "success", title, message }) => {
  const modalRef = useRef(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Click outside to close
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const isSuccess = type === "success";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative w-full max-w-sm overflow-hidden rounded-2xl bg-[#0E0E10] border border-white/10 shadow-2xl p-6"
            ref={modalRef}
          >
            {/* Background Glow */}
            <div
              className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-[60px] opacity-20 ${isSuccess ? "bg-blue-900" : "bg-red-500"}`}
            />

            <div className="relative z-10 flex flex-col items-center text-center">
              {/* Icon */}
              <div
                className={`mb-4 flex h-12 w-12 items-center justify-center rounded-full border ${isSuccess ? "border-blue-500/20 bg-blue-500/10 text-blue-500" : "border-red-500/20 bg-red-500/10 text-red-400"}`}
              >
                {isSuccess ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                    />
                  </svg>
                )}
              </div>

              <h3 className="text-xl font-semibold text-white mb-2 font-generalsans">
                {title}
              </h3>
              <p className="text-white-600 text-sm mb-6 leading-relaxed">
                {message}
              </p>

              <button
                onClick={onClose}
                className="w-full rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white font-medium py-2.5 transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Alert;
