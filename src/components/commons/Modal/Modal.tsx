import React from 'react';
import { createPortal } from 'react-dom';
import { Button } from '../Button/Button';

interface ModalButtonProps {
  label: string;
  btntype?: 'enabled' | 'secondary' | 'modalDefault' | 'modalSecondary' | 'modalError' | 'delete';
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  primaryButton: {
    label: string;
    onClick: () => void;
    btntype?: ModalButtonProps['btntype'];
  };
  secondaryButton?: ModalButtonProps;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  primaryButton,
  secondaryButton,
}) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="font-[NanumGothic] bg-[var(--bg-default-black)] rounded-2xl shadow-xl w-[90%] max-w-md p-6 text-center flex flex-col gap-[30px]">
        {/* text */}
        <div className="flex flex-col gap-[10px]">
          <h2 className="text-[var(--text-primary)] text-[16px] font-semibold">{title}</h2>
          <p className="text-[14px] text-[var(--text-secondary)] whitespace-pre-line">
            {description}
          </p>
        </div>

        {/* button */}
        <div className="flex flex-col gap-[10px]">
          <Button btntype={primaryButton.btntype || 'modalDefault'} onClick={primaryButton.onClick}>
            {primaryButton.label}
          </Button>
          {secondaryButton && (
            <Button btntype={secondaryButton.btntype || 'modalSecondary'} onClick={onClose}>
              {secondaryButton.label}
            </Button>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
