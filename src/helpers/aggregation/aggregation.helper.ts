import _ from "lodash";
import { Table } from "../../types/table.types";

export const EMPTY_VALUE_FILLER = 'empty value';

export const getUniqAxisValues = (table: Table, field: string) => {
    return _.uniq(table?.data.map(record => record[field]));
};

export const countValueOccurances = (table: Table, field: string, value: string) => {
    return table?.data?.filter(record => record[field] === value).length;
};

export const countUniqYFiledValuesOfXAxisValue = (table: Table, xField: string, yfield: string, where: string) => {
    return _.uniq(table?.data.filter(record => record[xField] === where).map(record => record[yfield])).length || 0;
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