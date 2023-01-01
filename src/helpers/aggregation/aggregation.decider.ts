import _ from "lodash";
import { Aggragation, GraphConfig } from "../../types/graph.types";
import { Series, Table } from "../../types/table.types";
import { calcWeight, createWordsArr, EMPTY_VALUE_FILLER, countValueOccurances, getUniqAxisValues, countUniqYFiledValuesOfXAxisValue, sumYFiledValuesOfXAxisValue, AggregationFunc } from "./aggregation.helper";

const AggregationFuncMap: Record<Aggragation, AggregationFunc> = {
    valuesCount: countValueOccurances,
    uniqueValues: countUniqYFiledValuesOfXAxisValue,
    sum: sumYFiledValuesOfXAxisValue
};

export const countByAggregation = (table: Table, graphConfig: GraphConfig) => {
    const xValues = getUniqAxisValues(table, graphConfig.x_field);
    const series: Series = [];

    const aggregationFunc = AggregationFuncMap[graphConfig.y_field.aggragation];

    xValues.forEach(value => {
        series.push({
            name: value ?? EMPTY_VALUE_FILLER,
            y: aggregationFunc?.(table, value, graphConfig.x_field, graphConfig.y_field.field),
        });
    });

    return series;
};

export const pickDataFields = (table: Table, graphConfig: GraphConfig) => {
    return table?.data?.map((record, index) => {
        const fields = _.pick(record, graphConfig.dataFields || []);
        return { ...fields, id: index };
    });
};

export const calcDataFieldsWeight = (table: Table, graphConfig: GraphConfig) => {
    const wordsArr = createWordsArr(table, graphConfig.dataFields || []);
    return calcWeight(wordsArr);
};