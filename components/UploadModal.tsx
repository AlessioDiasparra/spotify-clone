"use client";

import uniqid from "uniqid";
import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import { supabaseClient } from "@/app/supabaseClient";
import useUploadModal from "@/hooks/useUploadModal";
import { useUser } from "@/hooks/useUser";

import Modal from "./Modal";
import Input from "./Input";
import Button from "./Button";

const UploadModal = () => {
  const [isLoading, setIsLoading] = useState(false);

  const uploadModal = useUploadModal();
  const { user } = useUser();
  const router = useRouter();

  //hook use form della libreria
  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      author: "",
      title: "",
      song: null,
      image: null
    }
  });

  const onChange = (open: boolean) => {
    if (!open) {
      //resetta form
      reset();
      uploadModal.onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async values => {
    try {
      setIsLoading(true);

      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];

      if (!imageFile || !songFile || !user) {
        toast.error("Missing fields");
        return;
      }

      const uniqueID = uniqid();

      // Upload song
      const { data: songData, error: songError } = await supabaseClient.storage
        .from("songs")
        .upload(`song-${values.title}-${uniqueID}`, songFile, {
          cacheControl: "3600",
          upsert: false
        });

      if (songError) {
        setIsLoading(false);
        return toast.error("Caricamento file mp3 fallito");
      }

      // Upload image
      const { data: imageData, error: imageError } = await supabaseClient.storage
        .from("images")
        .upload(`image-${values.title}-${uniqueID}`, imageFile, {
          cacheControl: "3600",
          upsert: false
        });

      if (imageError) {
        setIsLoading(false);
        return toast.error("Caricamento file fallito");
      }

      const { error: supabaseError } = await supabaseClient.from("songs").insert({
        user_id: user.id,
        title: values.title,
        author: values.author,
        image_path: imageData.path,
        song_path: songData.path
      });

      if (supabaseError) {
        return toast.error(supabaseError.message);
      }

      router.refresh();
      setIsLoading(false);
      toast.success("Canzone aggiunta!");
      reset();
      uploadModal.onClose();
    } catch (error) {
      toast.error("Qualcosa è andato storto");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title='Aggiungi una canzone'
      description='Carica un file mp3'
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-4'>
        <Input
          id='title'
          disabled={isLoading}
          {...register("title", { required: true })}
          placeholder='Titolo canzone'
        />
        <Input
          id='author'
          disabled={isLoading}
          {...register("author", { required: true })}
          placeholder='Autore canzone'
        />
        <div>
          <div className='pb-1'>Seleziona un file mp3</div>
          <Input
            placeholder='test'
            disabled={isLoading}
            type='file'
            accept='.mp3'
            id='song'
            {...register("song", { required: true })}
          />
        </div>
        <div>
          <div className='pb-1'>Seleziona un'immagine</div>
          <Input
            placeholder='test'
            disabled={isLoading}
            type='file'
            accept='image/*'
            id='image'
            {...register("image", { required: true })}
          />
        </div>
        <Button disabled={isLoading} type='submit'>
          Aggiungi
        </Button>
      </form>
    </Modal>
  );
};

export default UploadModal;
