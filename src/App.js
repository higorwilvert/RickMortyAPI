import { useQuery } from '@apollo/client';
import { Routes, Route, useNavigate } from 'react-router-dom';
import INFO_PERSON from './querys/characters';
import './App.css';
import CharacterEpisodes from './episodes';
import Loader from './loading';

function App() {
  const {loading, error, data} = useQuery(INFO_PERSON);
  const navigate = useNavigate();

  if (loading){
    return <Loader/>;
  }

  if (error){
    return <p>An error occurred...</p>;
  }

  const handleCharacterClick = (id) => {
    navigate(`/character/${id}/episodes`);
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
          <h1 className="title">Personagens de Rick and Morty</h1>
          <h2 className="subtitle">Clique em um personagem para ver seus episódios</h2>
          <section className="parent">
            {data.characters.results.map((person) => (
              <div
                className="card"
                key={person.id}
                onClick={() => handleCharacterClick(person.id)}
                style={{ cursor: 'pointer' }}
              >
                <img src={person.image} alt={person.name} style={{ width: '100%' }} />
                <div className="container">
                  <h4>
                    <b>{person.name}</b>
                  </h4>
                  <p>
                    <b>Gênero:</b> {person.gender}
                  </p>
                  <p>
                    <b>Espécie:</b> {person.species}
                  </p>
                </div>
              </div>
            ))}
          </section>
          </>
        }
      />
      <Route path="/character/:id/episodes" element={<CharacterEpisodes />} />
    </Routes>
  );
}

export default App;
