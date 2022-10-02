import fastifySwagger from '@fastify/swagger'
import { FastifyPluginCallback } from 'fastify';
import excelRoute from './excel/excelRoute'

const rootRouter: FastifyPluginCallback = async (fastify, options ,done) => {
    await fastify.register(fastifySwagger, {
        routePrefix: '/swagger', 
        exposeRoute: true,
        swagger: {
            info: {
                version: '1.0.0',
                title: 'processing-service',
                description: 'an absolutely beautiful service amazing wow'
            }
        }
    });

    await fastify.register(excelRoute, { prefix: "excel" });

    done();
}

export default rootRouter;