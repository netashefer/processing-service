import Fastify from 'fastify';
import { PORT } from './config';
import rootRouter from './routes';

const fastify = Fastify();
fastify.register(rootRouter);

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