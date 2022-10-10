import cors from '@fastify/cors';
import Fastify from 'fastify';
import { fastifyAuth0Verify } from 'fastify-auth0-verify';
import fs from 'fs';
import path from 'path';
import { auth0Config } from './auth/authConfig';
import { PORT } from './config';
import dbConnector from './db/db';
import rootRouter from './routes';

const fastify = Fastify({
	https: {
		key: fs.readFileSync(path.join(__dirname, 'cert.key')),
		cert: fs.readFileSync(path.join(__dirname, 'cert.crt'))
	}}
);

fastify.register(cors, { origin: true });
fastify.register(rootRouter);
fastify.register(dbConnector);
fastify.register(fastifyAuth0Verify, auth0Config);
fastify.addHook("onRequest", async (request, reply) => {
	try {
	  await request.jwtVerify()
	} catch (err) {
	console.log(err);
	  reply.send(err)
	}
  });

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