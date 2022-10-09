import cors from '@fastify/cors';
import Fastify from 'fastify';
import path from 'path';
import { PORT } from './config';
import dbConnector from './db/db';
import rootRouter from './routes';
import fs from 'fs';

const fastify = Fastify({
	https: {
		key: fs.readFileSync(path.join(__dirname, 'cert.key')),
		cert: fs.readFileSync(path.join(__dirname, 'cert.crt'))
	}}
);
fastify.register(cors, { origin: true });
fastify.register(rootRouter);
fastify.register(dbConnector);

const start = async () => {
    try {
        await fastify.listen({ port: PORT });
        console.log(`server is listening on port ${PORT}`);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

start();