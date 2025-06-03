import BaseModal from "./BaseModal";

type ModalConfirmDeleteProps = {
  isOpen: boolean;
  onClose: () => void;
  onClickConfirm: () => void;
};

const ModalConfirmDelete = ({
  isOpen,
  onClose,
  onClickConfirm,
}: ModalConfirmDeleteProps) => {
  const onClickDelete = () => {
    onClose();
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md mx-auto">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Please confirm if you wish to delete the post
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete the post? Once deleted, it cannot
              be recovered.
            </p>
            <div className="space-y-3">
              <button
                onClick={onClickConfirm}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-lg transition-colors"
              >
                Delete
              </button>
              <button
                onClick={onClickDelete}
                className="w-full bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-lg border border-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </BaseModal>
  );
};

export default ModalConfirmDelete;
