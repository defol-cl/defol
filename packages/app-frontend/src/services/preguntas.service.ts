import { API } from 'aws-amplify';

export const get = () => new Promise(
  resolve => API.get('api', '/preguntas', {})
    .then(response => resolve(response))
);

export const post = (pregunta: { convenioCod: string, titulo: string, antecedentes: string, pregunta: string }) => new Promise(
  resolve => API.post('api', '/preguntas', { body: pregunta })
    .then(response => resolve(response))
);
