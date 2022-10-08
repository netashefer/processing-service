
import { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import { Client } from 'pg';
// TODO: secure details
export const client = new Client({
    user: 'tivbbvpcyifsmb',
    password: "14e33f00cacb4bc5591250387370c3fa1e51ef684d1f66f1a6d6b4bb30142708",
    host: 'ec2-52-18-201-153.eu-west-1.compute.amazonaws.com',
    port: 5432,
    database: "detg4pkjjgn995",
    ssl: {
        rejectUnauthorized: false,
    }
});

async function dbconnector(fastify: FastifyInstance) {
    try {
        await client.connect();
        console.log("db connected succesfully");
        fastify.decorate('db', { client });
    } catch (err) {
        console.error(err);
    }
}
export default fastifyPlugin(dbconnector);