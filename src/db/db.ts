
import { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import { Client } from 'pg';
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import

dotenv.config(); // not ideal, but the only way I managed to make .env readable. TODO: try changing it in the future

export const client = new Client({
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: 5432,
    database: process.env.PGDATABASE,
	connectionString: process.env.DATABASE_URL,
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