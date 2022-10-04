import { ColumnParsingMap } from "../types/excel.types";
import { Table } from "../types/table.types";
import * as XLSX from 'xlsx';
import fs from 'fs';

const DIRECTORY_PATH = "C:/Users/neta1/Desktop/try1/";
enum supportedDataTypes {
    date = "(DATE)",
    number = "(NUMBER)"
}

class ExcelParserService {

    parseTable(table: Table) {
        const columnParsingMap: ColumnParsingMap = {};
        table.schema.forEach(column => {
            if (column.includes(supportedDataTypes.date)) {
                columnParsingMap[column] = (date: string) => new Date(date);
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
        XLSX.writeFile(file, `${DIRECTORY_PATH}${dataSourceId}.xlsx`);
    }
}

export default ExcelParserService;