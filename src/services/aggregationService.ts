
import _ from 'lodash';
import { Tables } from '../db/db.constants';
import { getCountOfValue, getUniqAxisValues, getUniqAxisValuesWhere } from '../helpers/aggregation.helper';
import { buildParserBySchema, parseDataByMap, ParserToSendMap } from '../helpers/dataParser.helper';
import { GraphConfig } from '../types/graph.types';
import { excelService } from './excelService';

class AggregationService {
    tableName = Tables.dashboards;

    async runAggregation(graphConfig: GraphConfig, dataSourceId: string) {
        const table = await excelService.getDataBySourceId(dataSourceId);
        const columnParsingMap = buildParserBySchema(table.schema, ParserToSendMap);
        table.data = parseDataByMap(table.data, columnParsingMap);

        const series: { name: string; y: number; }[] = [];

        if (graphConfig.dataFields) {
            return table?.data?.map((record, index) => {
                const fields = _.pick(record, graphConfig.dataFields || []);
                return { ...fields, id: index };
            });
        } else if (graphConfig.x_field) {
            const xValues = getUniqAxisValues(table, graphConfig.x_field);
            xValues.forEach(v => {
                series.push({
                    name: v,
                    y: graphConfig.y_field.aggragation === "valuesCount" ?
                        getCountOfValue(table, graphConfig.x_field as string, v) :
                        getUniqAxisValuesWhere(table, graphConfig.x_field, graphConfig.y_field.field as string, v).length,
                });
            });
        } else if (graphConfig.y_field.aggragation === "valuesCount") {
            const uniqueValues: string[] = getUniqAxisValues(table, graphConfig.y_field.field as string);
            uniqueValues.forEach(v => {
                series.push({
                    name: v,
                    y: getCountOfValue(table, graphConfig.y_field.field as string, v),
                });
            });
        } else if (graphConfig.y_field.aggragation === "uniqueValues") {
            const uniqueValues: string[] = getUniqAxisValues(table, graphConfig.y_field.field as string);
            uniqueValues.forEach(v => {
                series.push({
                    name: v,
                    y: 1 // i am lazy
                });
            });
        }
        return series;
    }
}

export const aggregationService = new AggregationService();