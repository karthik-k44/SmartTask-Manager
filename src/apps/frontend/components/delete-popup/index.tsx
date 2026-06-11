import Modal from "../modal";
import Button from "../button";
import { ButtonKind, ButtonType } from "../../types/button";

interface DeletionPopupProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  isDeleteDisabled?: boolean;
  disabledTitle?: string;
  disabledMessage?: string;
}

const DeletionPopup: React.FC<DeletionPopupProps> = ({
  isOpen,
  setIsOpen,
  onConfirm,
  title = 'Are you sure you want to delete this item?',
  message = 'This action cannot be undone. Please confirm if you want to proceed with deletion.',
  isDeleteDisabled = false,
  disabledTitle = 'Deletion blocked',
  disabledMessage = 'This item cannot be deleted because it is protected or in an exceptional state.',
}) => {
  const handleClose = () => {
    setIsOpen(false);
  };

  const handleConfirm = () => {
    if (isDeleteDisabled) {
      return;
    }

    onConfirm();
    setIsOpen(false);
  };

  const currentTitle = isDeleteDisabled ? disabledTitle : title;

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title={currentTitle}>
      <div className="space-y-6">
        {!isDeleteDisabled ? (
          <p className="text-sm leading-6 text-slate-600">{message}</p>
        ) : (
          <div className="rounded-lg border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
            <p className="font-semibold">Delete disabled</p>
            <p>{disabledMessage}</p>
          </div>
        )}

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <div>
            <Button
              kind={ButtonKind.DISCARD}
              type={ButtonType.BUTTON}
              onClick={handleClose}
            >
              Cancel
            </Button>
          </div>
          <div>
            <Button
              kind={ButtonKind.DELETE}
              type={ButtonType.BUTTON}
              onClick={handleConfirm}
              disabled={isDeleteDisabled}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DeletionPopup;
