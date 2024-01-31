"use client";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from "@nextui-org/navbar";
import NextLink from "next/link";
import { ThemeSwitch } from "@/components/theme-switch";
import Image from "next/image";
import { useEffect, useState } from "react";
import useEpisodesStore from "@/stores/EpisodesStore";
import { useQuery } from "@apollo/client";
import GET_EPISODES from "@/services/RickAndMortyService/getEpisodes";

export const Navbar = () => {
  const episodes = useEpisodesStore((state) => state.episodes);
  const setEpisodes = useEpisodesStore((state) => state.setEpisodes);
  const [next, setNext] = useState(0);

  const { data, fetchMore } = useQuery(GET_EPISODES, {
    variables: { page: 1 },
  });
  useEffect(() => {
    const localData = localStorage.getItem("episodes");
    if (localData && JSON.parse(localData).length > 0) {
      setEpisodes(JSON.parse(localData));
    } else {
      const fetchData = async () => {
        if (data?.episodes?.results) {
          setEpisodes(data?.episodes?.results);
          setNext(data?.episodes?.info?.next);
        }
      };

      fetchData();
    }
  }, [data]);

  useEffect(() => {
    const fetchMoreEpisodes = async (next: number) => {
      if (next) {
        const { data: newData } = await fetchMore({
          variables: { page: next },
        });

        if (newData?.episodes?.results) {
          const newEpisodes = [...episodes, ...newData.episodes.results];
          setNext(newData?.episodes?.info?.next);
          await setEpisodes(newEpisodes);
        }
      }
    };
    fetchMoreEpisodes(next);
  }, [next]);

  useEffect(() => {
    return () => {
      if (episodes) {
        localStorage.setItem("episodes", JSON.stringify(episodes));
      }
    };
  }, [episodes]);

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Image
              alt="logo"
              src={"/logo.png"}
              width={120}
              height={120}
            ></Image>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className=" sm:flex basis-1/5 sm:basis-full" justify="end">
        <NavbarItem className=" sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>
    </NextUINavbar>
  );
};
