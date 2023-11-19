import axios from 'axios';
// import Cookies from 'js-cookie';

const api = function () {
  // const token = Cookies.get('@IH.token');

  return (
    axios.create({
      baseURL: 'http://localhost:4000/api',
      // headers: token ? {
      //   'Authorization': `Bearer ${token}`
      // } : undefined
    })
  );
};

export default api;
