import useEpisodesStore from "@/stores/EpisodesStore";
import { Episode } from "@/types/Episode";
import { Card, Divider, Tooltip } from "@nextui-org/react";
import React, { useEffect } from "react";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { IoEye, IoEyeOutline } from "react-icons/io5";

interface ActionsProps {
  episode: Episode;
  size: number;
}

const Actions: React.FC<ActionsProps> = ({ episode, size }) => {
  const { episodes, setEpisodes } = useEpisodesStore();


  const toggleFavorite = () => {
    const updatedEpisodes = episodes.map((e) =>
      e.id === episode.id ? { ...e, favorite: !e.favorite } : e
    );
    setEpisodes(updatedEpisodes);
  };

  const toggleViewed = () => {
    const updatedEpisodes = episodes.map((e) =>
      e.id === episode.id ? { ...e, viewed: !e.viewed } : e
    );
    setEpisodes(updatedEpisodes);
  };

  return (
    <div className="flex items-center end z-10">
      <Tooltip content={episode.favorite ? "Desmarcar Favorito": "Marcar como Favorito"  }>
        <Card
          isPressable
          className="flex p-3 justify-center items-center"
          onClick={toggleFavorite}
        >
          {episode.favorite ? (
            
            <GoHeartFill className="text-red-600" size={size} />
            
          ) : (<GoHeart size={size} />
          )}
        </Card>
      </Tooltip>
      <Divider orientation="vertical" className="mx-2"></Divider>

      <Tooltip content={episode.viewed ? "Desmarcar Visto": "Marcar como Visto"  }>
        <Card
          isPressable
          className="p-3 flex justify-center items-center"
          onClick={toggleViewed}
        >
          {episode.viewed ? (
            <IoEye className="text-blue-600" size={size} />
          ) : (
            <IoEyeOutline size={size} />
          )}
        </Card>
      </Tooltip>
    </div>
  );
};

export default Actions;
