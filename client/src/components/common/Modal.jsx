import { useEffect, useRef } from "react";
import { X } from "lucide-react";

const Modal = ({ isOpen, onClose, title, children, maxWidth = "max-w-lg" }) => {
  const modalRef = useRef(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  // Depend only on `isOpen` — modal consumers often pass an inline onClose
  // that gets a new reference on every render, and re-running this effect
  // on every keystroke would re-steal focus to the first focusable element.
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onCloseRef.current();
        return;
      }
      if (e.key === "Tab" && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    modalRef.current?.querySelector("button, input, textarea")?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "var(--modal-backdrop)" }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`relative w-full ${maxWidth} max-h-[90vh] overflow-y-auto rounded-modal bg-white shadow-card`}
      >
        <div className="pointer-events-none absolute -top-10 -left-10 h-40 w-40 rounded-full bg-brand-gradient opacity-20 blur-2xl" />
        <div className="pointer-events-none absolute -top-6 left-16 h-24 w-24 rounded-full bg-brand-gradient opacity-10 blur-xl" />

        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 rounded-full p-1.5 text-text-muted hover:bg-gray-100 hover:text-text-heading"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="relative px-6 py-8 sm:px-10">
          {title && (
            <h2 className="mb-6 text-center text-xl font-bold text-text-heading">
              {title}
            </h2>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
