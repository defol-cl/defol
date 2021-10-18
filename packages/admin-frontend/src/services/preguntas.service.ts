import { API } from 'aws-amplify';

export const get = () => new Promise(
  resolve => API.get('api', '/preguntas', {})
    .then(response => resolve(response))
);
