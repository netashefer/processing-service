import Fastify from 'fastify';
import { PORT } from './config';
import excelRoute from './routes/excelRoute';
import cors from '@fastify/cors';

const fastify = Fastify();

fastify.register(excelRoute, { prefix: "excel" });

const start = async () => {
    try {
        await fastify.listen({ port: PORT });
        console.log(`server is listening on port ${PORT}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();