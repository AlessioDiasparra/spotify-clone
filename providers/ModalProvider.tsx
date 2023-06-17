"use client";

import { useState, useEffect } from "react";

import Modal from "@/components/Modal";
import AuthModal from "@/components/authModal";
import UploadModal from "@/components/UploadModal";

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
    <>
    <AuthModal />
    <UploadModal/>
    </>
  );
};
export default ModalProvider;
