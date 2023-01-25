import { addDays, differenceInDays, formatISO, isBefore, max, min } from "date-fns";
import _ from "lodash";
import { Table } from "../types/table.types";
import { formatDate, parseGraphitFormat } from "./dataParser.helper";

export const fillMissingDates = (table: Table, xField: string) => {
    const existDates = table.data.map(d => parseGraphitFormat(d[xField]));
    const dates = getAllDates(addDays(min(existDates), 1), addDays(max(existDates), 1)); // min and max return day before
    const filledDates = dates.map(d => ({
        [xField]: formatDate(formatISO(d)),
        isGenerated: true,
    }));
    // should parse dates at the end of aggregation
    table.data = [...filledDates, ...table.data].sort((a: any, b: any) => {
        const aDate = parseGraphitFormat(a[xField]);
        const bDate = parseGraphitFormat(b[xField]);
        return isBefore(aDate, bDate) ? -1 : 1;
    });
    return table.data;
};

const getAllDates = (startDate: Date, endDate: Date) => {
    const dates = [];
    for (let i in _.range(differenceInDays(endDate, startDate))) {
        const d = addDays(startDate, +i);
        dates.push(d);
    }

    return dates;
};