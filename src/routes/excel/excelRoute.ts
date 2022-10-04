import { FastifyInstance } from "fastify";
import * as XLSX from 'xlsx';
import ExcelParserService from "../../services/excelParser";
import { Table } from "../../types/table.types";
import { excelFilePostSchema, excelPostSchema } from "./schemas";


const excelRoute = async (fastify: FastifyInstance) => {

    fastify.post<{ Body: { table: Table; }; }>('/parse', { schema: excelPostSchema }, async (request, reply) => {
        const table = request.body.table;
        const parsedTable = new ExcelParserService().parseTable(table);
        return parsedTable;
    });

    fastify.post<{ Body: { file: XLSX.WorkBook; }; }>('/save', { schema: excelFilePostSchema }, async (request, reply) => {
        const fileBinary = request.body.file;
        new ExcelParserService().saveExcelFile(fileBinary);
        return;
    });
};

export default excelRoute;