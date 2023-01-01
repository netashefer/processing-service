
import _ from 'lodash';
import { Tables } from '../db/db.constants';
import { calcDataFieldsWeight, countByAggregation, pickDataFields } from '../helpers/aggregation/aggregation.decider';
import { buildParserBySchema, parseDataByMap, ParserToSendMap } from '../helpers/dataParser.helper';
import CustomError from '../types/customError';
import { GraphConfig } from '../types/graph.types';
import { Table } from '../types/table.types';
import { excelService } from './excelService';

export class AggregationService {
    tableName = Tables.dashboards;

    async runAggregation(graphConfig: GraphConfig, dataSourceId: string) {
        const table = await this.getParsedTable(dataSourceId);
        this.validateGraphConfigBySchema(table, graphConfig);

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

    private validateGraphConfigBySchema(table: Table, graphConfig: GraphConfig) {
        const allFields = [...(graphConfig.dataFields || []), graphConfig.x_field, graphConfig.y_field?.field].filter(Boolean);
        const invalidFields = _.uniq(allFields).filter(field => {
            return !table.schema.includes(field);
        });
        if (invalidFields?.length) {
            throw new CustomError('config is not valid', invalidFields);
        }
    }
}

export const aggregationService = new AggregationService();