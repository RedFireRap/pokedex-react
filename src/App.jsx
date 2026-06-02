import { useState } from "react";
import "./App.css";

function App() {

  const [pokemonName, setPokemonName] = useState("");
  const [pokemon, setPokemon] = useState(null);

  const buscarPokemon = async () => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
      );

      const data = await response.json();

      setPokemon(data);
    } catch (error) {
      console.log("Pokemon não encontrado");
    }
  };

  return (
    <div className="app">
      <h1 className="title">POKEDEX</h1>

      <form
        className="search-box"
        onSubmit={(e) => {
          e.preventDefault();
          buscarPokemon();
        }}
      >
        <input
          type="text"
          placeholder="Digite o nome do Pokémon..."
          value={pokemonName}
          onChange={(e) => setPokemonName(e.target.value)}
        />
        <button onClick={buscarPokemon}>
          Buscar
        </button>
      </form>

      <div className="pokemon-card">
        {pokemon && (
          <>
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
            />

            <h2>
              {pokemon.name.charAt(0).toUpperCase() +
                pokemon.name.slice(1)}
            </h2>

            <div className="info">
              <p>⚡ Tipo: {pokemon.types[0].type.name}</p>
              <p>📏 Altura: {pokemon.height}</p>
              <p>⚖️ Peso: {pokemon.weight}</p>
            </div>
          </>
        )}
      </div>
    </div >
  );
}

export default App;