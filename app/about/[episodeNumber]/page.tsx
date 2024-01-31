"use client";
import Actions from "@/components/Actions";
import CharacterCard from "@/components/CharacterCard";
import useEpisodesStore from "@/stores/EpisodesStore";
import translateDate from "@/utils/translateDate";
import { useEffect } from "react";

export default function AboutPage({
  params,
}: {
  params: { episodeNumber: number };
}) {

  const { episodes, setSelectedEpisode, selectedEpisode, setEpisodes } =
    useEpisodesStore();

  useEffect(() => {

    const selected = episodes.find(
      (episode) => episode.id === params.episodeNumber
    );
    if (selected?.id) {
      setSelectedEpisode(selected);
    }
  }, [episodes]);

  return (
    <section>
      {selectedEpisode.id && (
        <>
          {" "}
          <div className="flex justify-between items-start sm:flex-row flex-col gap-2">
            <div>
              <h1 className="text-4xl font-bold text-green-500 text-left ">
                {selectedEpisode.id} - {selectedEpisode.name}
              </h1>
              <p className="text-2xl font-bold text-left text-purple-600">
                {selectedEpisode.episode}
              </p>
              <p className="text-2xl font-bold text-left ">
                Lançado em: {translateDate(selectedEpisode.air_date)}
              </p>
            </div>
            <Actions episode={selectedEpisode} size={20} />
          </div>
          <h2 className="text-2xl mt-4">Personagens:</h2>
          <div className="flex w-full flex-wrap gap-3 justify-center py-4">
            {selectedEpisode.characters.map((character) => (
              <CharacterCard character={character} key={character.id}/>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
