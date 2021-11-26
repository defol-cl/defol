import { Dao, DynamoIteratorFront } from '@defol-cl/root';
import { API } from 'aws-amplify';

export const get = (estados?: string[]) => new Promise<DynamoIteratorFront<Dao.Pregunta>>(
  (resolve, reject) =>
    API.get('api', '/preguntas', estados ? {
      queryStringParameters: {
        estado: estados.join(',')
      }
    } : {})
      .then((response: DynamoIteratorFront<Dao.Pregunta>) => resolve(response))
      .catch(error => reject(error))
);

export const getOne = (timestamp: string) => new Promise<Dao.Pregunta>(
  (resolve, reject) => API.get('api', '/pregunta', {
    queryStringParameters: {
      timestamp
    }
  })
    .then((response: Dao.Pregunta) => resolve(response))
    .catch(error => reject(error))
);

export const post = async (pregunta: { convenioCod: string, titulo: string, antecedentes: string, pregunta: string }) =>
  await API.post('api', '/preguntas', { body: pregunta })
;

export const put = async (pregunta: string, timestamp: string) =>
  await API.put('api', '/preguntas', { body: { pregunta, timestamp } })
;
