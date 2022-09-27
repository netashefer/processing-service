import { ColumnParsingMap } from "../types/excel.types";
import { Table } from "../types/table.types";

enum supportedDataTypes {
    date = "(DATE)",
    number = "(NUMBER)"
}

class ExcelParserService {

    parseTable(table: Table) {
        const columnParsingMap: ColumnParsingMap = {};
        table.schema.forEach(column => {
            if (column.includes(supportedDataTypes.date)) {
                columnParsingMap[column] = (date: string) => new Date(date)
            } else if (column.includes(supportedDataTypes.number)) {
                columnParsingMap[column] = parseInt;
            }
        })

        const data: any[] = [];
        table.data.forEach(dataRow => {
            Object.keys(columnParsingMap).forEach(column => {
                dataRow[column] = columnParsingMap[column]?.(dataRow[column]);
            })
            data.push(dataRow);
        })

        table.data = data;
        return table;
    }
}

export default ExcelParserService;