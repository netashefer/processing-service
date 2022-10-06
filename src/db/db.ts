
import { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import { Client } from 'pg';
// TODO: secure details
const client = new Client({
    user: 'ilhsuqjubsxvgv',
    password: "620c24888ed48e741b4cb45d7b96e22a232468a1632fa9f5fb49d353b4e155e1",
    host: 'ec2-34-247-72-29.eu-west-1.compute.amazonaws.com',
    port: 5432,
    database: "df9qiqql7gpdtj",
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