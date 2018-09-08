export interface IModalProps {
  isOpen: boolean;
  body: string;
  header: string;
  confirm: string;
  onConfirm: () => void;
  onClose: () => void;
}

export interface IModalState {
  isModalOpen: boolean;
}