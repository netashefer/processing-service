import { format, formatISO, parseISO } from "date-fns";
import { ColumnParsingMap, DataTypesToUse } from "../types/excel.types";
import { Table } from "../types/table.types";

enum SupportedDataTypes {
    date = "(DATE)",
    number = "(NUMBER)"
}

enum DataTypes {
    string = 'string',
    number = 'number',
    date = 'date'
}

const parseDateISO = (date: string) => {
    try {
        return date ? formatISO(parseISO(date)) : null;
    } catch {
        return null;
    }
};

const formatDate = (date: string) => {
    try {
        return date ? format(parseISO(date), 'dd/MM/yyyy') : null;
    } catch {
        return null;
    }
};

const parseString = (value: any) => value ? value.toString() : null;
const parseNumber = (value: any) => value ? parseInt(value) : null;

export const ParserToSaveMap: Record<DataTypes, (value: any) => DataTypesToUse> = {
    string: parseString,
    date: parseDateISO,
    number: parseNumber
};

export const ParserToSendMap: Record<DataTypes, (value: any) => DataTypesToUse> = {
    string: parseString,
    date: formatDate,
    number: parseNumber
};

export const buildParserBySchema = (schema: string[], parserMap: Record<DataTypes, (value: any) => DataTypesToUse>) => {
    const columnParsingMap: ColumnParsingMap = {};

    schema.forEach(column => {
        const columnType = getColumnType(column);
        columnParsingMap[column] = parserMap[columnType];
    });

    return columnParsingMap;
};

const getColumnType = (column: string): DataTypes => {
    if (column.includes(SupportedDataTypes.date)) {
        return DataTypes.date;
    } else if (column.includes(SupportedDataTypes.number)) {
        return DataTypes.number;
    } else {
        return DataTypes.string;
    }
};

export const parseDataByMap = (data: Table['data'], columnParsingMap: ColumnParsingMap) => {
    const parsedData: Table['data'] = [];
    data.forEach(dataRow => {
        Object.keys(columnParsingMap).forEach(column => {
            dataRow[column] = columnParsingMap[column]?.(dataRow[column]);
        });
        parsedData.push(dataRow);
    });
    return parsedData;
};