"use client";

import React, {useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/supabaseClient";

import useAuthModal from "@/hooks/useAuthModal";

import Modal from "./Modal";

const AuthModal = () => {
  const { session } = useSessionContext();
  const router = useRouter();
  const { onClose, isOpen } = useAuthModal();

  useEffect(() => {
    if (session) {
      router.refresh();
      onClose();
    }
  }, [session, router, onClose]);

  const onChange = (open: boolean) => {
    //close onChange
    if (!open) {
      onClose();
    }
  };

  return (
    <Modal
      title='Welcome back'
      description='Login to your account.'
      isOpen={isOpen}
      onChange={onChange}
    >
      <Auth
        theme='dark'
        supabaseClient={supabase}
        providers={["google"]}
        queryParams={{
          access_type: "offline",
          prompt: "consent",
          hd: "localhost:3000"
        }}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: "#404040",
                brandAccent: "#22c55e"
              }
            }
          }
        }}
      />
    </Modal>
  );
};

export default AuthModal;
