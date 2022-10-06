import { parse } from 'date-fns';
import { v4 as uuid } from 'uuid';
import { DATABASE_NAME } from "../db/db.constants";
import { executeQuery } from "../db/queryExecuter";
import { ColumnParsingMap, DataSource } from "../types/excel.types";
import { Table } from "../types/table.types";

enum supportedDataTypes {
    date = "(DATE)",
    number = "(NUMBER)"
}

class ExcelService {
    tableName = "dataSources";

    parseTable(table: Table) {
        const columnParsingMap: ColumnParsingMap = {};
        table.schema.forEach(column => { // look in the office about locale. add error handle
            if (column.includes(supportedDataTypes.date)) { // support DD/MM/yyyy
                columnParsingMap[column] = (dateString: string) => {
                    const [month, date, year] = dateString?.split("/");
                    const formattedDate = [date.padStart(2, '0'), month.padStart(2, '0'), year.padStart(2, '0')].join('/');
                    return parse(`${formattedDate}`, 'dd/MM/yy', new Date(), { weekStartsOn: 1, firstWeekContainsDate: 1 });
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

    async addDataSource(client: any, excelDataSource: DataSource) {
        //todo: compress
        const id = uuid();
        const query = `
        INSERT INTO ${DATABASE_NAME}."${this.tableName}"
        ("dataSourceId", "displayName", "dashboardId", "dataTable")
        VALUES ('${id}', '${excelDataSource.displayName}', '${excelDataSource.dashboardId}', '${JSON.stringify(excelDataSource.table)}')
        ;`;
        await executeQuery(client, query);
        return id;
    }
}

export const excelService = new ExcelService();