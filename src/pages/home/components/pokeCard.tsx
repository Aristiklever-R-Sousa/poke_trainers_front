
export interface IDataPokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  }
};

interface IDataPokemon2 {
  pokemon: IDataPokemon;
  isMyPoke: boolean;
  addPokemonToTrainer: (pokemonId: number) => void;
  removePokemonFromTrainer: ((pokemonId: number) => void);
}

const PokeCard = ({ pokemon, isMyPoke, addPokemonToTrainer, removePokemonFromTrainer }: IDataPokemon2) => {
  return (
    <div className='col-span-8 px-6 py-4 transition-all bg-gray-400 rounded-md group hover:bg-gray-600'>
      <div>
        <div className='w-24'>
          <img className='w-full' src={pokemon.sprites.front_default} />
        </div>
      </div>

      <div className='flex items-center justify-between'>
        <h4 className='font-semibold first-letter:uppercase group-hover:text-white'>{pokemon.name}</h4>
        {
          isMyPoke == false ? (
            <button
              onClick={() => addPokemonToTrainer(pokemon.id)}
              className='inline-flex justify-center px-4 py-2 text-2xl font-bold text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
            >
              +
            </button>
          ) : (
            <button
              onClick={() => removePokemonFromTrainer != null ? removePokemonFromTrainer(pokemon.id) : null}
              className='inline-flex justify-center px-4 py-2 text-2xl font-bold text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
            >
              -
            </button>
          )
        }
      </div>
    </div>
  );
};

export default PokeCard;
