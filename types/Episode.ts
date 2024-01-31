import { Character } from "./Character";

export interface Episode{
    id: number,
    name: string,
    episode: string,
    air_date: string,
    characters:Character[],
    viewed?: boolean,
    favorite?: boolean
}