
import { v4 as uuid } from 'uuid';
import { DATABASE_NAME, Tables } from '../db/db.constants';
import { executeQuery } from '../db/queryExecuter';
import { GraphConfig } from '../types/graph.types';
import { excelService } from './excelService';
import _ from 'lodash';

class AggregationService {
    tableName = Tables.dashboards;

    async runAggregation(graphConfig: GraphConfig, dataSourceId: string) {
        const table = await excelService.getDataBySourceId(dataSourceId);
        const series: { name: string; y: number; }[] = [];
        if (graphConfig.y_field.aggragation === "sum") {
            const uniqValues: string[] = _.uniq(table?.data.map(record => record[graphConfig.x_field as any]));
            uniqValues.forEach(v => {
                series.push({
                    name: v,
                    y: table?.data?.filter(record => record[graphConfig.x_field as any] === v).length
                });
            });
        }
        return series;
    }
}

export const aggregationService = new AggregationService();