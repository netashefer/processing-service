import pako from 'pako';
import { v4 as uuid } from 'uuid';
import { DATABASE_NAME, Tables } from "../db/db.constants";
import { executeQuery } from "../db/queryExecuter";
import { buildParserBySchema, parseDataByMap, ParserToSaveMap, ParserToSendMap } from '../helpers/dataParser.helper';
import { DataSourcePayload } from "../types/excel.types";
import { Table } from "../types/table.types";

class ExcelService {
    tableName = Tables.dataSources;

    parseTable(table: Table) {
        const columnParsingMap = buildParserBySchema(table.schema, ParserToSaveMap);
        table.data = parseDataByMap(table.data, columnParsingMap);
        return table;
    }

    async addDataSource(excelDataSource: DataSourcePayload) {
        const id = uuid();
        const compressedTable = this.compressTable(excelDataSource.table);
        const query = `
        INSERT INTO ${DATABASE_NAME}."${this.tableName}"
        ("dataSourceId", "displayName", "dashboardId", "dataTable")
        VALUES ('${id}', '${excelDataSource.displayName}', '${excelDataSource.dashboardId}', '${compressedTable}')
        ;`;
        await executeQuery(query);
        return id;
    }

    async getDataBySourceId(dataSourceId: string): Promise<Table> {
        const query = `
        SELECT "dataTable" FROM ${DATABASE_NAME}."${this.tableName}"
        WHERE "dataSourceId" = '${dataSourceId}'
        ;`;
        const rows = await executeQuery<{ dataTable: string; }>(query);
        return this.decompressTable(rows?.[0]?.dataTable);
    }

    async getShcemaOfSourceId(dataSourceId: string) {
        const query = `
        SELECT "dataTable" FROM ${DATABASE_NAME}."${this.tableName}"
        WHERE "dataSourceId" = '${dataSourceId}'
        ;`;

        const rows = await executeQuery<{ dataTable: string; }>(query);
        return this.decompressTable(rows?.[0]?.dataTable)?.schema;
    }

    async getAllDashboardDataSources(dashboardId: string) {
        const query = `
        SELECT "dataSourceId", "displayName" FROM ${DATABASE_NAME}."${this.tableName}"
        WHERE "dashboardId" = '${dashboardId}'
        ;`;
        return await executeQuery<{ dataSourceId: string, displayName: string; }>(query);
    }

    async deleteDataSource(dataSourceId: string) {
        const query = `
        DELETE FROM ${DATABASE_NAME}."${this.tableName}"
        WHERE "dataSourceId" = '${dataSourceId}'
        ;`;
        return await executeQuery(query);
    }

    async replaceDataSource(excelDataSource: DataSourcePayload) {
        const parsedTable = this.parseTable(excelDataSource.table);
        const compressedTable = this.compressTable(parsedTable);

        const query = `
        UPDATE ${DATABASE_NAME}."${this.tableName}"
        SET "displayName" = '${excelDataSource.displayName}', "dataTable" = '${compressedTable}'
        WHERE "dataSourceId" = '${excelDataSource.dataSourceId}'
        ;`;
        return await executeQuery(query);
    }

    private compressTable(table: Table) {
        return pako.deflate(JSON.stringify(table), { level: 9 });
    }

    private decompressTable(compressedTable: string) {
        if (!compressedTable) return null;
        const list = compressedTable.split(",") as any;
        return JSON.parse(pako.inflate(list as any, { to: 'string' }));
    }
}

export const excelService = new ExcelService();