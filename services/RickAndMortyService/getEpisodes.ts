import { gql } from "@apollo/client";

const GET_EPISODES = gql`
  query GetEpisodes($page: Int) {
    episodes(page: $page) {
      info { pages next prev }
      results {
        id
        name
        air_date
        episode
        characters {
          id
          name
          species
          status
          image
        }
      }
    }
  }
`;

export default GET_EPISODES;
