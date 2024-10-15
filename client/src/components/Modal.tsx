import { ReactNode, useEffect, useRef } from 'react';

type modalProps = {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

export function Modal({ children, isOpen, onClose }: modalProps) {
  const modal = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    function openCloseModal() {
      if (isOpen) modal.current?.showModal();
      else modal.current?.close();
    }
    openCloseModal();
  }, [isOpen]);

  return (
    <dialog ref={modal} onClose={onClose}>
      {children}
    </dialog>
  );
}
