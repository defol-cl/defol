import { Dao, DynamoIteratorFront } from '@defol-cl/root';
import { API } from 'aws-amplify';

export const resumenPreguntas = () => new Promise<Dao.ResumenPreguntas>(
  (resolve, reject) => API.get('api', '/dashboard/resumen-preguntas', {})
    .then((response: Dao.ResumenPreguntas) => resolve(response))
    .catch(err => reject(err))
);

export const ultimasActualizaciones = () => new Promise<DynamoIteratorFront<Dao.Pregunta>>(
  (resolve, reject) => API.get('api', '/preguntas/ultimas-actualizaciones', {})
    .then((response: DynamoIteratorFront<Dao.Pregunta>) => {
      if ((response as any).errorType) {
        reject(response);
      } else {
        resolve(response)
      }
    })
    .catch(err => reject(err))
);
