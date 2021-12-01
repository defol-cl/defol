import { Dao, DynamoIteratorFront } from '@defol-cl/root';
import { API } from 'aws-amplify';
import { PreguntaMini } from "@defol-cl/root/src/dao";

export const get = (params: { estados?: string[], ejecutivo?: string }) => new Promise<DynamoIteratorFront<Dao.Pregunta>>(
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

export const byContactoEmail = (conId: string, email: string) => new Promise<Dao.PreguntaMini[]>(
  (resolve, reject) => API.get('api', `/preguntas/contacto/${email}`, {
    queryStringParameters: {
      convenioCod: conId,
    }
  })
    .then((response: Dao.PreguntaMini[]) => resolve(response))
    .catch(error => reject(error))
);

export const put = (email: string, timestamp: string, replica: string, categoria: string, agregarReplica: boolean) => new Promise<Dao.Pregunta>(
  (resolve, reject) => API.put('api', '/pregunta', {
    queryStringParameters: {
      contactoEmail: email,
      timestamp
    },
    body: { replica, categoria, agregarReplica: (agregarReplica ? true : undefined) }
  })
    .then((response: Dao.Pregunta) => resolve(response))
    .catch(error => reject(error))
);
