import _ from "lodash";
import { Table } from "../types/table.types";

export const getUniqAxisValues = (table: Table, field: string) => {
    return _.uniq(table?.data.map(record => record[field]));
};

export const getCountOfValue = (table: Table, field: string, value: string) => {
    return table?.data?.filter(record => record[field] === value).length;
};

export const getUniqAxisValuesWhere = (table: Table, xField: string, yfield: string, where: string) => {
    return _.uniq(table?.data.filter(record => record[xField] === where).map(record => record[yfield]));
};