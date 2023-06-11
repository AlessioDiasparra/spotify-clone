"use client";

import { useState, useEffect } from "react";

import Modal from "@/components/Modal";
import AuthModal from "@/components/authModal";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  //trick per errori nel server side
  if (!isMounted) {
    return null;
  }

  return (
    /* <Modal title='test modal' description='test desc' isOpen onChange={() => {}}>
      test children
    </Modal> */
    <AuthModal />
  );
};
export default ModalProvider;
