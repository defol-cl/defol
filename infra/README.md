# Administración de la Infraestructura Base

## Comandos relevantes

 * `npm run build` o `tsc` compila typescript a js (no es necesario ejecutarlo para ejecutar el deploy)
 * `cdk bootstrap <account>/<region>`
 * `cdk deploy -c branch=<branch>` hace deploy del stack de CloudFormation

## Parámetros SSM

 * `/defol/${branch}/base/resources-bucket-name`, nombre del bucket utilizado para cargar los recursos de AWS e instanciar los stacks de CloudFormation
 * `/defol/${branch}/frontend/cf-distribution-id`, identificador de la distribución de CloudFront
 * `/defol/${branch}/frontend/bucket-name`, nombre del bucket utilizado para el deploy de la aplicación web
 * `/defol/${branch}/backend/api-gateway-domain-name`, nombre del bucket utilizado para el deploy de la aplicación web
