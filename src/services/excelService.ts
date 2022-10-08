import { compress, decompress } from 'compress-json';
import { parse } from 'date-fns';
import { v4 as uuid } from 'uuid';
import { DATABASE_NAME, Tables } from "../db/db.constants";
import { executeQuery } from "../db/queryExecuter";
import { ColumnParsingMap, DataSourcePayload } from "../types/excel.types";
import { Table } from "../types/table.types";

enum supportedDataTypes {
    date = "(DATE)",
    number = "(NUMBER)"
}

class ExcelService {
    tableName = Tables.dataSources;

    parseTable(table: Table) {
        const columnParsingMap: ColumnParsingMap = {};
        table.schema.forEach(column => { // look in the office about locale. add error handle
            if (column.includes(supportedDataTypes.date)) { // support DD/MM/yyyy
                columnParsingMap[column] = (dateString: string) => {
                    try {
                        const [month, date, year] = dateString?.split("/");
                        const formattedDate = [date.padStart(2, '0'), month.padStart(2, '0'), year.padStart(2, '0')].join('/');
                        return parse(`${formattedDate}`, 'dd/MM/yy', new Date(), { weekStartsOn: 1, firstWeekContainsDate: 1 });
                    } catch {
                        return null;
                    }
                };
            } else if (column.includes(supportedDataTypes.number)) {
                columnParsingMap[column] = parseInt;
            }
        });

        const data: any[] = [];
        table.data.forEach(dataRow => {
            Object.keys(columnParsingMap).forEach(column => {
                dataRow[column] = columnParsingMap[column]?.(dataRow[column]);
            });
            data.push(dataRow);
        });

        table.data = data;
        return table;
    }

    async addDataSource(excelDataSource: DataSourcePayload) {
        const id = uuid();
        let compressed = JSON.stringify(compress(excelDataSource.table));

        const query = `
        INSERT INTO ${DATABASE_NAME}."${this.tableName}"
        ("dataSourceId", "displayName", "dashboardId", "dataTable")
        VALUES ('${id}', '${excelDataSource.displayName}', '${excelDataSource.dashboardId}', '${compressed}')
        ;`;
        await executeQuery(query);
        return id;
    }

    async getDataBySourceId(dataSoucreId: string) {
        const query = `
        SELECT "dataTable" FROM ${DATABASE_NAME}."${this.tableName}"
        WHERE "dataSourceId" = '${dataSoucreId}'
        ;`;
        const rows = await executeQuery<{ dataTable: string; }>(query);
        const compressTable = rows?.[0]?.dataTable;
        try {
            return compressTable ? decompress(JSON.parse(compressTable)) : null;
        } catch (e) {
            console.log(e);
            return null;
        }
    }
}

export const excelService = new ExcelService();