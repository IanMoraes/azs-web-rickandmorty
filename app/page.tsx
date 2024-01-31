"use client";

import LoadingEpisodes from "@/components/LoadingEpisodes";
import EpisodeCard from "@/components/EpisodeCard";
import { Episode } from "@/types/Episode";
import useEpisodesStore from "@/stores/EpisodesStore";
import {
  Button,
  Input,
  NavbarItem,
  Tooltip,
  Navbar as NextUINavbar,
  NavbarContent,
} from "@nextui-org/react";
import { GoHeart, GoHeartFill, GoSearch } from "react-icons/go";
import { useState } from "react";

export default function Home() {
  const episodes = useEpisodesStore((state) => state.episodes);

  const [searchTerm, setSearchTerm] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);
  const searchInput = (
    <Input
      aria-label="Buscar"
      labelPlacement="outside"
      placeholder="Buscar..."
      startContent={<GoSearch />}
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      type="search"
    />
  );
  const filteredEpisodes = episodes.filter((episode) => {
    const isFavorite = showFavorites ? episode.favorite : true;
    const matchesSearch = episode.name.toLowerCase().includes(searchTerm.toLowerCase());
    return isFavorite && matchesSearch;
  });
  const toggleFavorites = () => {
    setShowFavorites(!showFavorites);
  };
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <NextUINavbar  >
        <NavbarContent className=" basis-full" justify="center">
          <NavbarItem >{searchInput}</NavbarItem>

          <Tooltip content={showFavorites ? "Mostrar todos" : "Mostrar favoritos"}>
            <NavbarItem className="md:flex">
              <Button
                className="text-sm font-normal text-default-600 bg-default-100"
                startContent={showFavorites ? <GoHeartFill fill="#CF1818" fontSize={20} /> : <GoHeart fontSize={20}/>}
                variant="flat"
                onClick={toggleFavorites}
              >
                <p className="hidden sm:block">Favoritos</p>
              </Button>
            </NavbarItem>
          </Tooltip>
        </NavbarContent>
      </NextUINavbar>
      {filteredEpisodes.length > 0 && (
        <div className="flex gap-8 flex-wrap text-center justify-center">
          {filteredEpisodes.map((episode: Episode) => (
            <EpisodeCard episode={episode} key={episode.id} />
          ))}
        </div>
      ) }
      
      {episodes.length == 0 &&(
        <div className="flex gap-8 flex-wrap text-center justify-center">
          {Array(9)
            .fill(9)
            .map((_, index) => (
              <LoadingEpisodes key={index} />
            ))}
        </div>
      )}
    </section>
  );
}
