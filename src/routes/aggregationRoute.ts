import { FastifyInstance } from "fastify";
import { aggregationService } from "../services/aggregationService";
import { GraphConfig } from "../types/graph.types";

const aggregationRoute = async (fastify: FastifyInstance) => {
    fastify.post<{ Body: { dataSourceId: string, graphConfig: GraphConfig; }; }>('/data', async (request, reply) => {
        const { graphConfig, dataSourceId } = request.body;
        return await aggregationService.runAggregation(graphConfig, dataSourceId);
    });
};

export default aggregationRoute;