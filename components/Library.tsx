"use-client";

import React from "react";
import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import useUploadModal from "@/hooks/useUploadModal";
import useSubscribeModal from "@/hooks/useSubscribeModal";
import useOnPlay from "@/hooks/useOnPlay";
import { Song } from "@/types";
import MediaItem from "./MediaItem";

interface LibraryProps {
  songs: Song[];
}

const Library: React.FC<LibraryProps> = ({
  songs
}) => {
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();
  const {user, subscription} = useUser();
  const subscribeModal = useSubscribeModal();

  const onPlay = useOnPlay(songs);

  const handleClick = () => {
    if (!user) {
      return authModal.onOpen();
    }
    // TODO: verifica abbonamento subscription
    if (!subscription) {
      return subscribeModal.onOpen();
    }

    return uploadModal.onOpen();
  };
  return (
    <div className='flex flex-col'>
      <div className='flex items-center justify-between px-5 pt-4'>
        <div className=' inline-flex items-center gap-y-2'>
          <TbPlaylist className='text-neutral-400' size={26} />
          <p className='text-neutral-400 font-medium text-md'>La tua libreria</p>
        </div>
        <AiOutlinePlus
          size={20}
          className='text-neutral-400 cursor-pointer hover:text-white transition'
          onClick={handleClick}
        />
      </div>
      <div className='flex flex-col gap-y-2 mt-4 px-3'>{songs.map((item) => (
          <MediaItem 
            onClick={(id: string) => onPlay(id)} 
            key={item.id} 
            data={item}
          />
        ))}</div>
    </div>
  );
};
export default Library;
