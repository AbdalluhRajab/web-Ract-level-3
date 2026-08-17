import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

export function Modal({ open, onClose, title, description, children, confirmLabel, onConfirm, confirmTone = "primary", busy = false }) {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const previousFocus = document.activeElement;
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && !busy) onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.classList.add("modal-open");
    window.setTimeout(() => closeButtonRef.current?.focus(), 0);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("modal-open");
      previousFocus?.focus?.();
    };
  }, [busy, onClose, open]);

  if (!open) return null;
  return createPortal(
    <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && !busy && onClose()}>
      <section className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="modal-header">
          <div>
            <h2 id="modal-title">{title}</h2>
            {description && <p>{description}</p>}
          </div>
          <button ref={closeButtonRef} className="icon-button" type="button" onClick={onClose} aria-label="Close dialog" disabled={busy}><X size={18} /></button>
        </div>
        <div className="modal-body">{children}</div>
        {confirmLabel && (
          <div className="modal-footer">
            <button className="button button-ghost" type="button" onClick={onClose} disabled={busy}>Cancel</button>
            <button className={`button button-${confirmTone}`} type="button" onClick={onConfirm} disabled={busy}>{busy ? "Working…" : confirmLabel}</button>
          </div>
        )}
      </section>
    </div>,
    document.body,
  );
}
