import { Episode } from '@/types/Episode';
import {create} from 'zustand';

interface EpisodesStoreState {
  episodes: Episode[];
  selectedEpisode: Episode
}

interface EpisodesStoreActions {
  setEpisodes: (data: Episode[]) => void;
  setSelectedEpisode: (data: Episode) => void;
}

const useEpisodesStore = create<EpisodesStoreState & EpisodesStoreActions>((set) => ({
  episodes: [],
  selectedEpisode:{id:0, name:'', air_date:'', characters:[], episode:''},
  setEpisodes: (data) => set({ episodes: data }),
  setSelectedEpisode: (data: Episode) => set({ selectedEpisode: data }),
}));

export default useEpisodesStore;