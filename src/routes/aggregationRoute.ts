import { FastifyInstance } from "fastify";
import { aggregationService } from "../services/aggregationService";
import CustomError from "../types/customError";
import { GraphConfig } from "../types/graph.types";

const aggregationRoute = async (fastify: FastifyInstance) => {
    fastify.post<{ Body: { dataSourceId: string, graphConfig: GraphConfig; }; }>('/data', async (request, reply) => {
        const { graphConfig, dataSourceId } = request.body;
        try {
            const aggregatedData = await aggregationService.runAggregation(graphConfig, dataSourceId);
            reply.code(200).send(aggregatedData);
        } catch (e) {
            if (e instanceof CustomError) {
                reply.code(406).send({ message: e.message, invalidFields: e.invalidFields });
            }
            reply.code(500).send(e);
        }
    });
};

export default aggregationRoute;