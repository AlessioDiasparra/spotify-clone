"use client";

import React, { useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

import useAuthModal from "@/hooks/useAuthModal";

import Modal from "./Modal";

const AuthModal = () => {
  const { session } = useSessionContext();
  const router = useRouter();
  const { onClose, isOpen } = useAuthModal();

  //const supabaseClient = useSupabaseClient();
  const PROJECT_URL = "https://tlfqqotfbddajkttcbqh.supabase.co";
  const PROJECT_ANON_API_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsZnFxb3RmYmRkYWprdHRjYnFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY1MDI5MDIsImV4cCI6MjAwMjA3ODkwMn0.V_z7z7g4qzxrCRr0PSixK68SG0hUVnfv3LEKmVZCNT4";
  const supabase = createClient(PROJECT_URL, PROJECT_ANON_API_KEY);

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
          hd: "tlfqqotfbddajkttcbqh.supabase.co"
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
