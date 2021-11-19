import { Dao } from '@defol-cl/root';
import { API } from 'aws-amplify';

export const get = () => new Promise<Dao.Pregunta[]>(
  (resolve, reject) =>
    API.get('api', '/preguntas', {})
      .then(response => resolve(response))
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

export const post = async (pregunta: { convenioCod: string, titulo: string, antecedentes: string, pregunta: string }) =>
  await API.post('api', '/preguntas', { body: pregunta })
;
