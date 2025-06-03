import { ReactNode } from "react";

type BaseModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  position?: "center" | "top-right" | "full";
};

const BaseModal = ({
  isOpen,
  onClose,
  children,
  position = "center",
}: BaseModalProps) => {
  if (!isOpen) return null;

  let backdropClasses = "fixed inset-0 bg-gray-50/50 z-50";
  if (position === "center") {
    backdropClasses += " flex items-center justify-center";
  }

  let modalContentClasses =
    "bg-white p-6 rounded-lg shadow-lg relative";
  if (position === "center") {
    modalContentClasses += " w-auto h-auto mx-auto";
  } else if (position === "top-right") {
    modalContentClasses +=
      " fixed top-0 right-0 w-auto h-auto rounded-none p-0";
  } else if (position === "full") {
    modalContentClasses += " w-screen h-screen rounded-none p-0";
  }

  return (
    <div className={backdropClasses}>
      <div
        style={{
          maxWidth: "90%",
        }}
        className={modalContentClasses}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500/50 hover:text-gray-700/50 z-10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
};

export default BaseModal;
