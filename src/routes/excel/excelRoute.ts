import { FastifyInstance } from "fastify";
import { excelService } from "../../services/excelService";
import { DataSourcePayload } from "../../types/excel.types";
import { excelPostSchema, excelPutSchema } from "./schemas";

const excelRoute = async (fastify: FastifyInstance) => {

    fastify.post<{ Body: DataSourcePayload; }>('/addDataSource', { schema: excelPostSchema }, async (request, reply) => {
        const { table, displayName, dashboardId } = request.body;
        const parsedTable = excelService.parseTable(table);
        return await excelService.addDataSource({ displayName, dashboardId, table: parsedTable });
    });

    fastify.get('/getDataTable/:id', {}, async (request, reply) => {
        // just for now, in the future it will be part of Execute request
        const { id } = request.params as any;
        const parsedTable = await excelService.getDataBySourceId(id);
        return parsedTable;
    });

    fastify.get('/dashboard/:id', {}, async (request, reply) => {
        const { id } = request.params as any;
        return await excelService.getAllDashboardDataSources(id);
    });

    fastify.get('/schema/:id', {}, async (request, reply) => {
        const { id } = request.params as any;
        return await excelService.getShcemaOfSourceId(id);
    });

    fastify.delete('/:id', {}, async (request, reply) => {
        const { id } = request.params as any;
        return await excelService.deleteDataSource(id);
    });

    fastify.put<{ Body: DataSourcePayload; }>('/replace', { schema: excelPutSchema }, async (request, reply) => {
        const { table, displayName, dashboardId, dataSourceId } = request.body;
        const parsedTable = excelService.parseTable(table);
        return await excelService.replaceDataSource({ dataSourceId, displayName, dashboardId, table: parsedTable });
    });
};

export default excelRoute;