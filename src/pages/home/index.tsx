import { useForm } from 'react-hook-form';
import api from '../../services/api';
import { AxiosError } from 'axios';
import { useNavigate, Link, } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../stores/hooks';
// import * as TrainerActions from '../../stores/trainer';
import pokeAPI from '../../services/pokeAPI';
import PokeCard, { IDataPokemon } from './components/pokeCard';

import { IDataRequest, IDataResponseSearch, IDataResponseMyPoke } from './types';

const Home = () => {
  const trainer = useAppSelector((state) => state.trainer);
  const navigate = useNavigate();
  const apiT = api();
  apiT.defaults.headers['Authorization'] = 'Bearer ' + trainer.token;

  const { register, watch } = useForm<IDataRequest>({
    defaultValues: {
      search: '',
    }
  });

  const [pokemons, setPokemons] = useState<{ value: IDataPokemon[] }>({ value: [] });
  const [myPokemons, setMyPokemons] = useState<{ value: IDataPokemon[] }>({ value: [] });

  const [offset, setOffset] = useState(0);
  const [tab, setTab] = useState('all_pokemons');

  const tabs = [
    {
      id: 'all_pokemons',
      desc: 'Todos os Pokemons'
    },
    {
      id: 'my_pokemons',
      desc: 'Meus Pokemons'
    },
  ];

  const fireSearch = async (search: string) => {
    try {
      const { data }: IDataResponseSearch = await pokeAPI().get(`pokemon/${search}?offset=${offset}&limit=10`);

      const arrayTemp: IDataPokemon[] = [];
      for (const item of data.results) {
        const pokemon: { data: IDataPokemon } = await pokeAPI().get('pokemon/' + item.name);
        console.log(pokemon.data);
        arrayTemp.push(pokemon.data);
      }

      setPokemons({
        value: arrayTemp
      });

    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response?.status == 404) {
          setPokemons({ value: [] });
          return console.log(e.response?.data);
        }

      }

      return console.log(e);
    }
  };

  const listMyPokemons = async () => {
    try {
      const { data }: IDataResponseMyPoke = await apiT.get('list-associated-pokemons');

      const arrayTemp: IDataPokemon[] = [];
      for (const item of data.myPokes) {
        const pokemon: { data: IDataPokemon } = await pokeAPI().get('pokemon/' + item.pokemonId);
        console.log(pokemon.data);
        arrayTemp.push(pokemon.data);
      }

      setMyPokemons({
        value: arrayTemp
      });

    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response?.status == 404) {
          setPokemons({ value: [] });
          return console.log(e.response?.data);
        }

      }

      return console.log(e);
    }
  };

  const addPokemonToTrainer = async (pokemonId: number) => {
    try {
      const associate = await apiT.post('/associate-pokemon-trainer', {
        pokemons: [pokemonId]
      });

      console.log(associate.data);
    } catch (e) {
      if (e instanceof AxiosError) {
        return console.log(e);
        return console.log(e.response?.data);
      }

      return console.log(e);
    }
  };

  const search = watch('search');
  useEffect(() => {
    // console.log(search);
    fireSearch(search);
  }, [search]);

  useEffect(() => {
    // console.log(search);
    listMyPokemons();
  }, []);

  return (
    <div className="flex justify-center w-full h-screen">
      <div className="w-3/12 py-4 h-96">
        <h1 className="mb-3 text-3xl font-bold text-center">
          <span className="text-red-500">Poke</span><span className="text-green-500">Trainers</span>
        </h1>
        <form>
          <div className="grid grid-cols-8 gap-3">
            <div className="col-span-8">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700">Pesquisar</label>
              <input
                id="search"
                className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder='Digite o nome do pokemon inteiro!'
                {...register('search')}
              />
            </div>
          </div>
        </form>
        <div className='flex items-center justify-center gap-6 p-2 mx-4 my-4 bg-green-100 rounded-md'>
          {tabs.map((item) => {
            return (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                className={`font-semibold transition-colors px-4 py-2 text-sm border-b-2 ${tab != item.id ? 'border-transparent' : 'border-blue-600'}`}
              >
                {item.desc}
              </button>
            );
          })}
        </div>
        <div className='grid grid-cols-8 gap-4 py-2'>
          {
            tab == 'all_pokemons' ? (
              pokemons.value.length ?
                pokemons.value.map((item, idx) => {
                  return (
                    <PokeCard
                      key={item.name}
                      pokemon={item}
                      isMyPoke={false}
                      addPokemonToTrainer={addPokemonToTrainer}
                      removePokemonFromTrainer={addPokemonToTrainer}
                    />
                  );
                }) : <h4 className='col-span-8'>Nenhum pokemon encontrado!</h4>
            ) : (
              myPokemons.value.length ?
                myPokemons.value.map((item, idx) => {
                  return (
                    <PokeCard
                      key={item.name}
                      pokemon={item}
                      isMyPoke={true}
                      addPokemonToTrainer={addPokemonToTrainer}
                      removePokemonFromTrainer={addPokemonToTrainer}
                    />
                  );
                })
                : <h4 className='col-span-8'>Nenhum pokemon encontrado!</h4>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default Home;
