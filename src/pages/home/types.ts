export interface IDataRequest {
  search: string;
}

export interface IDataResponseSearch {
  data: {
    count: number;
    next: string | null;
    previous: string | null;
    results: IDataResponsePokemon[];
  }
}

interface IDataResponsePokemon {
  name: string;
  url: string;
}

export interface IDataResponseMyPoke {
  data: {
    myPokes: {
      id: number;
      pokemonId: number;
      trainerId: number;
    }[]
  }
}
