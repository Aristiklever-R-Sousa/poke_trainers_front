import axios from 'axios';
// import Cookies from 'js-cookie';

const pokeAPI = function () {
  // const token = Cookies.get('@IH.token');

  return (
    axios.create({
      baseURL: 'https://pokeapi.co/api/v2',
      // headers: token ? {
      //   'Authorization': `Bearer ${token}`
      // } : undefined
    })
  );
};

export default pokeAPI;
