import { FastifyInstance } from "fastify";
import { excelService } from "../../services/excelService";
import { DataSourcePayload } from "../../types/excel.types";
import { excelPostSchema } from "./schemas";

const excelRoute = async (fastify: FastifyInstance) => {

    fastify.post<{ Body: DataSourcePayload; }>('/addDataSource', { schema: excelPostSchema }, async (request, reply) => {
        const { table, displayName, dashboardId } = request.body;
        const parsedTable = excelService.parseTable(table);
        return excelService.addDataSource({ displayName, dashboardId, table: parsedTable });
    });

    fastify.get('/getDataTable/:id', {}, async (request, reply) => {
        const { id } = request.params as any;
        const parsedTable = await excelService.getDataBySourceId(id);
        console.log("parsedTable", parsedTable);

        return parsedTable;
    });
};

export default excelRoute;