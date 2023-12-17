import React, { useEffect, useState } from 'react';
import './PokemonList.css';

interface Ability {
  pokemon_v2_ability: {
    name: string;
  };
}

interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  pokemon_v2_pokemonabilities: Ability[];
  pokemon_v2_pokemonsprites: {sprites: string}[];
  base_experience: number;
}

interface ContainerProps {}

const PokemonList: React.FC<ContainerProps> = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://beta.pokeapi.co/graphql/v1beta', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: `query MyQuery {
              pokemon_v2_pokemon(where: {name: {_eq: "bulbasaur"}}) {
                id
                name
                height
                weight
                pokemon_v2_pokemonabilities {
                  pokemon_v2_ability {
                    name
                  }
                }
                base_experience
                pokemon_v2_pokemonsprites {
                  sprites
                }
              }
            }
            `,
          }),
        });

        if (!response.ok) {
          throw new Error('There was an error');
        }

        const data = await response.json();

        if (data.errors) {
          throw new Error(data.errors[0].message);
        }

        setPokemons(data.data.pokemon_v2_pokemon);
      } catch (error) {
        console.error('Error fetching Pokemon data:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <div id="container">
      {pokemons.map((pokemon) => (
        <div key={pokemon.id}>
          <h2>{pokemon.name}</h2>
          <img src={JSON.parse(pokemon.pokemon_v2_pokemonsprites[0].sprites).front_default} alt="" />
          <p>ID: {pokemon.id}</p>
          <p>Height: {pokemon.height}</p>
          <p>Weight: {pokemon.weight}</p>
          <p>BaseXP: {pokemon.base_experience}</p>
          <p>Abilities: {pokemon.pokemon_v2_pokemonabilities.map((ability) => ability.pokemon_v2_ability.name).join(', ')}</p>
        </div>
      ))}
    </div>
  );
};

export default PokemonList;
