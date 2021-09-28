import { Context, Callback, APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';

export type ProxyHandler<E=APIGatewayEvent, R=APIGatewayProxyResult> = (event: E, context: Context, callback: Callback<R>) => void;
export type CustomHandler<E extends {}, C = any> = (event: E, context: Context | null, callback: Callback<C>) => void;
