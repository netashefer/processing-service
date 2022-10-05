import cors from '@fastify/cors';
import Fastify from 'fastify';
import { PORT } from './config';
import rootRouter from './routes';
import dbConnector from './db/db';
const fastify = Fastify();
fastify.register(cors, { origin: true });
fastify.register(rootRouter);
fastify.register(dbConnector);

const start = async () => {
    try {
        await fastify.listen({ port: PORT });
        console.log(`server is listening on port ${PORT}`);
    } catch (err) {
        console.log(err);
        fastify.log.error(err);
        process.exit(1);
    }
};

start();