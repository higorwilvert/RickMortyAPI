import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import INFO_EPISODE from "./querys/characters-episodes";
import './episodes.css';
import Loader from './loading';
import Input from './search-bar';

function CharacterEpisodes() {
  const { id } = useParams();
  const [ search, setSearch ] = useState('');
  const [filteredEpisodes, setFilteredEpisodes] = useState([]);

  const { loading, error, data} = useQuery(INFO_EPISODE, {
    variables: { id },
  });

  useEffect(() => {
    if (data) {
      const episodes = data.character.episode.filter((episode) => 
        episode.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredEpisodes(episodes);
    }
  }, [data, search]);

  if (loading) {
    return <Loader/>;
  }

  if (error) {
    return <p>An error occurred...</p>;
  }

  const handleSearch = (name) => {
    setSearch(name);
  };

  return (
    <div className="episodes-container">
      <h2 className="episodes-title">Episódios de {data.character.name}</h2>
      <Input onSearch={handleSearch}/>
      <ul className="episodes-list">
        {filteredEpisodes.map((episode) => (
          <li key={episode.id} className="episode-item">
            <div className="episode-name">{episode.episode} - {episode.name}</div>
            <div className="episode-date">{episode.air_date}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CharacterEpisodes;