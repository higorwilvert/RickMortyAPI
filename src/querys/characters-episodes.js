import { gql } from '@apollo/client';

const INFO_EPISODE = gql`
    query GetCharacterEpisodes($id: ID!) {
    character(id: $id) {
      name
      episode {
        id
        name
        episode
        air_date
      }
    }
  }
`;

export default INFO_EPISODE;