import _ from "lodash";
import { Table } from "../../types/table.types";

export type AggregationFunc = (table: Table, where: string, xField: string, yfield: string) => number;

export const EMPTY_VALUE_FILLER = 'empty value';

export const getUniqAxisValues = (table: Table, field: string) => {
    return _.uniq(table?.data.map(record => record[field]));
};

export const countValueOccurances = (table: Table, value: string, field: string) => {
    return table?.data?.filter(record => record[field] === value && !record.isGenerated).length;
};

export const countUniqYFiledValuesOfXAxisValue = (table: Table, where: string, xField: string, yfield: string) => {
    return _.uniq(table?.data.filter(record => record[xField] === where).map(record => record[yfield])).length || 0;
};

export const sumYFiledValuesOfXAxisValue = (table: Table, where: string, xField: string, yfield: string) => {
    return _.sum(table?.data.filter(record => record[xField] === where).map(record => record[yfield]));
};

export const createWordsArr = (table: Table, dataFields: string[]) => {
    const wordsArr: string[] = [];
    table?.data?.forEach(record => {
        const fields = _.pick(record, dataFields || []);
        const valuesArr = Object.values(fields);
        valuesArr.forEach(value => {
            wordsArr.push(value ? value?.toString()?.split(' ') : EMPTY_VALUE_FILLER);
        });
    });
    return wordsArr.flat();
};

type WeightArr = { name: string, weight: number; }[];
export const calcWeight = (wordsArr: string[]) => {
    return wordsArr.reduce((arr: WeightArr, word) => {
        let obj = arr.find(obj => obj.name === word);
        if (obj) {
            obj.weight += 1;
        } else {
            obj = {
                name: word,
                weight: 1
            };
            arr.push(obj);
        }
        return arr;
    }, []);
};