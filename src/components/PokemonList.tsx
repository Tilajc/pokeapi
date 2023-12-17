import React, { useEffect, useState } from 'react';
import './PokemonList.css';
import { IonCard, IonCardContent, IonCardHeader, IonGrid, IonRow, IonCol, } from '@ionic/react';

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
              pokemon_v2_pokemon {
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

        const shuffledPokemons = [...data.data.pokemon_v2_pokemon];
        for(let i=shuffledPokemons.length - 1; i>0; i-- ){
          const j=Math.floor(Math.random() * (i + 1))
          const aux = shuffledPokemons[i]
          shuffledPokemons[i] = shuffledPokemons[j]
          shuffledPokemons[j] = aux
        }
        setPokemons(shuffledPokemons);

      } catch (error) {
        console.error('Error fetching Pokemon data:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <div id="container">
      <IonGrid>
        <IonRow>
          {pokemons.map((pokemon) => (
            <IonCol size='4'>
                <IonCard key={pokemon.id}>
                  <IonCardHeader>
                    <h2>{pokemon.name}</h2>
                  </IonCardHeader>
                  <IonCardContent>
                    <img src={JSON.parse(pokemon.pokemon_v2_pokemonsprites[0].sprites).front_default} alt="pokemon-sprite" className='spriteSize' />
                    <p>ID: {pokemon.id}</p>
                    <p>Height: {pokemon.height}</p>
                    <p>Weight: {pokemon.weight}</p>
                    <p>BaseXP: {pokemon.base_experience}</p>
                    <p>Abilities: {pokemon.pokemon_v2_pokemonabilities.map((ability) => ability.pokemon_v2_ability.name).join(', ')}</p>
                  </IonCardContent>
              </IonCard>
            </IonCol>
          ))}
        </IonRow>
      </IonGrid>
    </div>
  );
};

export default PokemonList;
