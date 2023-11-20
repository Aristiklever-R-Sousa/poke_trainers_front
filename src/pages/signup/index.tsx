import { useForm } from 'react-hook-form';
import api from '../../services/api';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import * as TrainerActions from '../../stores/trainer';
import { AxiosError } from 'axios';
import { useNavigate, Link, } from 'react-router-dom';

interface IDataRequest {
  name: string;
  nickname: string;
  password: string;
  password_again: string;
}

interface IDataResponse {
  trainer: {
    id: number;
    nickname: string;
  };
  token_data: {
    access_token: string;
    expirationIn: number | string;
  }
}

const SignUp = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<IDataRequest>({
    defaultValues: {
      nickname: '',
      password: '',
    }
  });

  const fireRequest = async (dataRequest: IDataRequest) => {
    try {
      const { data }: { data: IDataResponse } = await api().post('auth/signup', dataRequest);

      // console.log(data);
      return navigate('/login');
    } catch (e) {
      if (e instanceof AxiosError) return console.log(e.response?.data);

      return console.log(e);
    }
  };

  // console.log(trainer);

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="w-3/12 h-96">
        <h1 className="mb-3 text-3xl font-bold text-center">
          Cadastre-se no <span className="text-red-500">Poke</span><span className="text-green-500">Trainers</span>
        </h1>
        <form onSubmit={handleSubmit(fireRequest)}>
          <div className="grid grid-cols-8 gap-3">
            <div className="col-span-8">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome</label>
              <input
                id="name"
                className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                {...register('name', { required: true })}
              />
              {errors.nickname &&
                <div className='text-red-600'>{errors.nickname.message}</div>
              }
            </div>
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
            <div className="col-span-8">
              <label htmlFor="password_again" className="block text-sm font-medium text-gray-700">Repita a Senha</label>
              <input
                id="password_again"
                type="password"
                className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                {...register('password_again', { required: true })}
              />
              {errors.password_again &&
                <div className='text-red-600'>{errors.password_again.message}</div>
              }
            </div>
            <div className="flex justify-between col-span-8">
              <Link
                to={'/login'}
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Entrar
              </Link>
              <button
                type='submit'
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Salvar
              </button>

            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
