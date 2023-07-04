"use client";

import { useState, useEffect } from "react";

import Modal from "@/components/Modal";
import AuthModal from "@/components/authModal";
import UploadModal from "@/components/UploadModal";
import SubscribeModal from "@/components/subscribeModal";
import { ProductWithPrice } from "@/types";

interface ModalProviderProps {
  products: ProductWithPrice[];
}

const ModalProvider: React.FC<ModalProviderProps> = ({ products }) => {
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
      <UploadModal />
      <SubscribeModal products={products} />
    </>
  );
};
export default ModalProvider;
