import { createDatabaseClient, getDatabaseConfig } from './config';

const config = getDatabaseConfig();
export const db = createDatabaseClient(config);
