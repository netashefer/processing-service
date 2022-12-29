
import { Tables } from '../db/db.constants';
import { calcDataFieldsWeight, countByAggregation, pickDataFields } from '../helpers/aggregation/aggregation.decider';
import { buildParserBySchema, parseDataByMap, ParserToSendMap } from '../helpers/dataParser.helper';
import { GraphConfig } from '../types/graph.types';
import { excelService } from './excelService';

export class AggregationService {
    tableName = Tables.dashboards;

    async runAggregation(graphConfig: GraphConfig, dataSourceId: string) {
        const table = await this.getParsedTable(dataSourceId);

        if (graphConfig.dataFields) {
            if (graphConfig?.dataFieldsAggregation) {
                return calcDataFieldsWeight(table, graphConfig);
            }
            return pickDataFields(table, graphConfig);
        } else if (graphConfig.x_field) {
            return countByAggregation(table, graphConfig);
        }
    }

    async getParsedTable(dataSourceId: string) {
        const table = await excelService.getDataBySourceId(dataSourceId);
        const columnParsingMap = buildParserBySchema(table.schema, ParserToSendMap);
        table.data = parseDataByMap(table.data, columnParsingMap);
        return table;
    }
}

export const aggregationService = new AggregationService();