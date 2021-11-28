import { ConvenioDynamo, Dao } from '@defol-cl/root';
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

export const getOne = (id: string) => new Promise<Dao.Convenio>(
  (resolve, reject) => API.get('api', `/convenio>`, {
    queryStringParameters: {
      convenioCod: id
    }
  })
    .then((response: Dao.Convenio) => {
      resolve(response)
    })
    .catch(err => reject(err))
);

export const post = (convenio: ConvenioDynamo) => new Promise<void>(
  (resolve, reject) => API.post('api', '/convenios', { body: convenio })
    .then(() => resolve())
    .catch(err => reject(err))
);

export const put = (convenio: ConvenioDynamo) => new Promise<void>(
  (resolve, reject) => API.put('api', '/convenios', { body: convenio })
    .then(() => resolve())
    .catch(err => reject(err))
);

export const putContactos = (id: string, contactos: string, preguntasMax: number) => new Promise<void>(
  (resolve, reject) => API.post('api', '/contactos', { body: { convenioCod: id, correos: contactos, preguntasMax } })
    .then(() => resolve())
    .catch(err => reject(err))
);


