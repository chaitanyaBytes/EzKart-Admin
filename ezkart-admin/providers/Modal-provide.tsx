"use client";

import { useEffect, useState } from "react";

import { StoreModal } from "@/components/modals/store-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  //trick to prevent the hydration error because i'll be using it in a server component
  //server will not have any modal open but client will try to render the modal
  //This helps as this lifecycle event will only run in client component and until then i return null
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <StoreModal />
    </>
  );
};
