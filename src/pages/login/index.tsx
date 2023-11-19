import { useForm } from 'react-hook-form';
import api from '../../services/api';

interface IDataRequest {
  nickname: string;
  password: string;
}

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<IDataRequest>({
    defaultValues: {
      nickname: '',
      password: '',
    }
  });

  const fireLogin = async (dataRequest: IDataRequest) => {
    try {
      const { data } = await api().post('auth/login', dataRequest);

      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center w-full h-screen">
        <div className="w-3/12 h-72">
          <h1 className="mb-3 text-3xl font-bold text-center">
            <span className="text-red-500">Poke</span><span className="text-green-500">Trainers</span>
          </h1>
          <form onSubmit={handleSubmit(fireLogin)}>
            <div className="grid grid-cols-8 gap-3">
              <div className="col-span-8">
                <label htmlFor="nickname" className="block text-sm font-medium text-gray-700">Nickname</label>
                <input
                  id="nickname"
                  className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  {...register('nickname', { required: true })}
                />
                {errors.nickname &&
                  <div className='text-red-600'>{errors.nickname.message}</div>
                }
              </div>
              <div className="col-span-8">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Senha</label>
                <input
                  id="password"
                  type="password"
                  className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  {...register('password', { required: true })}
                />
                {errors.password &&
                  <div className='text-red-600'>{errors.password.message}</div>
                }
              </div>
              <div className="flex justify-end col-span-8">
                <button
                  type="submit"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Entrar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
