import { ColumnParsingMap, DataSource } from "../types/excel.types";
import { Table } from "../types/table.types";
import * as XLSX from 'xlsx';
import fs from 'fs';
import { parse } from 'date-fns';
import { executeQuery } from "../db/queryExecuter";
import { DATABASE_NAME } from "../db/db.constants";
import { v4 as uuid } from 'uuid';
const DIRECTORY_PATH = "C:/Users/neta1/Desktop/try1/";
enum supportedDataTypes {
    date = "(DATE)",
    number = "(NUMBER)"
}

class ExcelService {
    tableName = "dataSources";

    parseTable(table: Table) {
        const columnParsingMap: ColumnParsingMap = {};
        table.schema.forEach(column => { // look in the office about locale
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

    saveExcelFile(file: XLSX.WorkBook) {
        const dataSourceId = "filename";
        if (!fs.existsSync(DIRECTORY_PATH)) {
            fs.mkdirSync(DIRECTORY_PATH, { recursive: true });
        }
        XLSX.writeFileXLSX(file, `${DIRECTORY_PATH}${dataSourceId}.xlsx`);
    }

    async addDataSource(client: any, excelDataSource: DataSource) {
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

export default ExcelService;