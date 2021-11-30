import { API } from 'aws-amplify';
import { Dao } from '@defol-cl/root';

export const get = () => new Promise<Dao.Categoria[]>(
  (resolve, reject) => API.get('api', '/categorias', { })
    .then((response: Dao.Categoria[]) => resolve(response))
    .catch(error => reject(error))
);
