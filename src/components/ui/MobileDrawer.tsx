import React from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const MobileDrawer: React.FC<Props> = ({ isOpen, onClose, children }) => {
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="mobile-drawer-overlay"
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 40,
        }}
      />

      {/* Drawer */}
      <div
        className="mobile-drawer-content"
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          height: "100vh",
          width: "100%",
          maxWidth: "280px",
          backgroundColor: "var(--color-panel-elevated)",
          zIndex: 50,
          overflow: "auto",
          animation: "slideIn 300ms ease-out",
        }}
      >
        {children}
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
};

export default MobileDrawer;
