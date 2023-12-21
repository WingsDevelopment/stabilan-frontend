"use client";

import React, {
  ReactNode,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";

import { Button, ButtonProps } from "../../button/Button/Button";
import { Icon } from "../../icon/Icon/Icon";
import { Icons } from "../../../meta";

import style from "./GenericModal.module.css";

// Define the interface for the GenericModal props
interface GenericModalProps {
  children: ReactNode;
  buttonProps: ButtonProps;
  buttonText: string;
  icon?: string; // Make icon optional
  onOpen?: () => void;
  onClose?: () => void;
}
export interface GenericModalHandles {
  close: () => void;
}

export const GenericModal = forwardRef<GenericModalHandles, GenericModalProps>(
  ({ children, buttonProps, buttonText, icon, onOpen, onClose }, ref) => {
    const [isModalOpen, setModalOpen] = useState(false);

    useImperativeHandle(ref, () => ({
      close: () => {
        setModalOpen(false);
        if (onClose) onClose();
      },
    }));

    const handleOverlayMouseDown = (
      event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
      if (event.target === event.currentTarget) {
        setModalOpen(false);
        if (onClose) onClose();
      }
    };

    return (
      <>
        <Button
          {...buttonProps}
          onClick={() => {
            setModalOpen(true);
            if (onOpen) onOpen();
          }}
        >
          {buttonText}
          {icon && <Icon src={icon} width={4} height={4} />}
        </Button>

        {isModalOpen && (
          <div
            className={style.modalBackdrop}
            onMouseDown={handleOverlayMouseDown}
          >
            <div
              className={style.modalContent}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className={style.modalCloseButton}
                onClick={() => setModalOpen(false)}
              >
                <Icon src={Icons.xButton} width={16} height={16} />
              </button>

              {children}
            </div>
          </div>
        )}
      </>
    );
  }
);

GenericModal.displayName = "GenericModal";
