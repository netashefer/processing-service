import cors from '@fastify/cors';
import Fastify from 'fastify';
import fs from 'fs';
import path from 'path';
import { PORT } from './config';
import rootRouter from './routes';

const fastify = Fastify({https: {
	key: fs.readFileSync(path.join(__dirname, 'cert.key')),
	cert: fs.readFileSync(path.join(__dirname, 'cert.crt'))
  }});
fastify.register(cors, {origin: true});
fastify.register(rootRouter);

const start = async () => {
    try {
        await fastify.listen({ port: PORT });
        console.log(`server is listening on port ${PORT}`);
    } catch (err) {
        process.exit(1);
    }
};

start();