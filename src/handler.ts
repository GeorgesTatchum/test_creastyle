import serverlessHttp from 'serverless-http';
import { app } from '.';

export const handler = serverlessHttp(app);