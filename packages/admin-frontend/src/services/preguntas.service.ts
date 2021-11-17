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
