import { useState } from "react";
import "./App.css";

function App() {

  const [pokemonName, setPokemonName] = useState("");
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(null);

  const buscarPokemon = async () => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
      );

      if (!response.ok) {
        throw new Error("Pokemon não encontrado");
      }

      const data = await response.json();

      setPokemon(data);
      setError("");
    } catch (error) {
      setPokemon(null);
      setError("Pokémon não encontrado.");
    }
  };

  /* Função para buscar um Pokémon aleatório */

  const pokemonAleatorio = async () => {
    const randomId = Math.floor(Math.random() * 1025) + 1;

    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${randomId}`
      );

      const data = await response.json();

      setPokemon(data);
      setPokemonName(data.name);
      setError("");
    } catch (error) {
      setError("Erro ao buscar Pokémon");
    }
  };

  /* Função para buscar um Pokémon aleatório */

  /* Cores para cada tipo de Pokémon */

  const typeColors = {
    fire: "#ef4444",
    water: "#3b82f6",
    grass: "#22c55e",
    electric: "#facc15",
    ghost: "#8b5cf6",
    rock: "#a16207",
    ice: "#67e8f9",
    dragon: "#2563eb",
    psychic: "#ec4899",
    fighting: "#dc2626",
    ground: "#ca8a04",
    poison: "#9333ea",
    bug: "#84cc16",
    normal: "#6b7280",
    flying: "#60a5fa",
    steel: "#94a3b8",
    fairy: "#f472b6",
    dark: "#374151",
  };

  const mainType = pokemon?.types[0].type.name;

  /* Cores para cada tipo de Pokémon */

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
        <button type="submit">
          Buscar
        </button>

        <button type="button" onClick={pokemonAleatorio}>
          🎲 Aleatório
        </button>

      </form>

      {error && <p className="error">{error}</p>}

      <div
        className="pokemon-card"
        style={{
          borderColor: typeColors[mainType],
          boxShadow: `0 0 30px ${typeColors[mainType]}50`,
        }}
      >

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
              <div className="types">
                {pokemon.types.map((type) => (
                  <span
                    key={type.type.name}
                    className="type-badge"
                    style={{
                      backgroundColor: typeColors[type.type.name],
                    }}
                  >
                    {type.type.name}
                  </span>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div >
  );
}

export default App;