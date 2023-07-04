"use client";

import React, { useState } from "react";
import { toast } from "react-hot-toast";

import useSubscribeModal from "@/hooks/useSubscribeModal";
import { useUser } from "@/hooks/useUser";
import { postData } from "@/libs/helpers";
import { getStripe } from "@/libs/stripeClient";
import { Price, ProductWithPrice } from "@/types";

import Modal from "./Modal";
import Button from "./Button";

interface SubscribeModalProps {
  products: ProductWithPrice[];
}

//formato prezzo
const formatPrice = (price: Price) => {
  const priceString = new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: price.currency,
    minimumFractionDigits: 0
  }).format((price?.unit_amount || 0) / 100);

  return priceString;
};

const SubscribeModal: React.FC<SubscribeModalProps> = ({ products }) => {
  const subscribeModal = useSubscribeModal();
  const { user, isLoading, subscription } = useUser();

  const [priceIdLoading, setPriceIdLoading] = useState<string>();

  const onChange = (open: boolean) => {
    if (!open) {
      subscribeModal.onClose();
    }
  };

  const handleCheckout = async (price: Price) => {
    setPriceIdLoading(price.id);
    if (!user) {
      setPriceIdLoading(undefined);
      return toast.error("Dovresti essere loggato");
    }

    if (subscription) {
      setPriceIdLoading(undefined);
      return toast("Sei già abbonato");
    }

    try {
      const { sessionId } = await postData({
        url: "/api/create-checkout-session",
        data: { price }
      });

      const stripe = await getStripe();
      stripe?.redirectToCheckout({ sessionId });
    } catch (error) {
      return toast.error((error as Error)?.message);
    } finally {
      setPriceIdLoading(undefined);
    }
  };

  let content = <div className='text-center'>Nessun prodotto disponibile.</div>;

  if (products.length) {
    content = (
      <div>
        {products.map(product => {
          if (!product.prices?.length) {
            return <div key={product.id}>Nessun prezzo disponibile</div>;
          }

          return product.prices.map(price => (
            <Button
              key={price.id}
              onClick={() => handleCheckout(price)}
              disabled={isLoading || price.id === priceIdLoading}
              className='mb-4'
            >
              {`Abbonati per ${formatPrice(price)} al ${price.interval === "month" ? "mese" : ""}`}
            </Button>
          ));
        })}
      </div>
    );
  }

  if (subscription) {
    content = <div className='text-center'>Already subscribed.</div>;
  }

  return (
    <Modal
      title='Solo per utenti premium'
      description='Ascolta la musica su Spotify Premium'
      isOpen={subscribeModal.isOpen}
      onChange={onChange}
    >
      {content}
    </Modal>
  );
};

export default SubscribeModal;
