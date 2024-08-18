"use client";

import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "@/components/ui/modal";

export const StoreModal = () => {
  const storeModel = useStoreModal();

  return (
    <Modal
      title="Create Store"
      description="Add a new store to manage product and categories"
      isOpen={storeModel.isOpen}
      onClose={storeModel.onClose}
    >
      Future Create Storee Form
    </Modal>
  );
};
