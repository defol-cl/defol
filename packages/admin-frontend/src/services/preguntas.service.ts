import { Dao, DynamoIteratorFront } from '@defol-cl/root';
import { API } from 'aws-amplify';

export const get = (params: {estados?: string[], ejecutivo?: string}) => new Promise<DynamoIteratorFront<Dao.Pregunta>>(
  (resolve, reject) => API.get('api', '/preguntas', {
    queryStringParameters: {
      estado: params?.estados ? params.estados.join(',') : undefined,
      ejecutivo: params?.ejecutivo
    }
  })
    .then((response: DynamoIteratorFront<Dao.Pregunta>) => resolve(response))
    .catch(error => reject(error))
);

export const getOne = (email: string, timestamp: string) => new Promise<Dao.Pregunta>(
  (resolve, reject) => API.get('api', '/pregunta', {
    queryStringParameters: {
      contactoEmail: email,
      timestamp
    }
  })
    .then((response: Dao.Pregunta) => resolve(response))
    .catch(error => reject(error))
);

export const put = (email: string, timestamp: string, replica: string, agregarReplica: boolean) => new Promise<Dao.Pregunta>(
  (resolve, reject) => API.put('api', '/pregunta', {
    queryStringParameters: {
      contactoEmail: email,
      timestamp
    },
    body: { replica, agregarReplica }
  })
    .then((response: Dao.Pregunta) => resolve(response))
    .catch(error => reject(error))
);
