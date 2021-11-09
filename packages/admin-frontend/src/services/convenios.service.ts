import { Dao } from '@defol-cl/root';
import { API } from 'aws-amplify';

export const get = () => new Promise<Dao.Convenio[]>(
  (resolve, reject) => API.get('api', '/convenios', {})
    .then((response: Dao.Convenio[]) => {
      if ((response as any).errorType) {
        reject(response);
      } else {
        resolve(response)
      }
    })
    .catch(err => reject(err))
);
