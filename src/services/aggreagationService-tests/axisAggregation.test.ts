import { GraphConfig } from "../../types/graph.types";
import { AggregationService } from "../aggregationService";
import { mockedTable2, SchemaMock } from "./mocks";

const aggregationService = new AggregationService();

describe("aggregationService tests - axisAggregation", () => {
    beforeAll(() => {
        const mock = jest.spyOn(AggregationService.prototype, 'getParsedTable');
        mock.mockImplementation(async (dataSourceId: string) => mockedTable2);
    });

    describe("test records count", () => {
        test('string xField', async () => {
            // Arange
            const graphConfig: GraphConfig = {
                x_field: SchemaMock.stringColumn,
                y_field: { aggragation: 'valuesCount' }
            };

            // Act
            const aggregatedData = await aggregationService.runAggregation(graphConfig, '1');

            // Assert
            expect(aggregatedData).toEqual([
                { name: 'x', y: 3 },
                { name: 'xx', y: 1 },
                { name: 'xxx', y: 1 },
            ]);
        });

        test('number xField', async () => {
            // Arange
            const graphConfig: GraphConfig = {
                x_field: SchemaMock.numberColumn,
                y_field: { aggragation: 'valuesCount' }
            };

            // Act
            const aggregatedData = await aggregationService.runAggregation(graphConfig, '1');

            // Assert
            expect(aggregatedData).toEqual([
                { name: 2, y: 2 },
                { name: 3, y: 3 },
            ]);
        });
    });

    describe("test uniqe values count", () => {
        test('string xField, number yField', async () => {
            // Arange
            const graphConfig: GraphConfig = {
                x_field: SchemaMock.stringColumn,
                y_field: { aggragation: 'uniqueValues', field: SchemaMock.numberColumn }
            };

            // Act
            const aggregatedData = await aggregationService.runAggregation(graphConfig, '1');

            // Assert
            expect(aggregatedData).toEqual([
                { name: 'x', y: 2 },
                { name: 'xx', y: 1 },
                { name: 'xxx', y: 1 },
            ]);
        });

        test('number xField, string yField', async () => {
            // Arange
            const graphConfig: GraphConfig = {
                x_field: SchemaMock.numberColumn,
                y_field: { aggragation: 'uniqueValues', field: SchemaMock.stringColumn }
            };

            // Act
            const aggregatedData = await aggregationService.runAggregation(graphConfig, '1');

            // Assert
            expect(aggregatedData).toEqual([
                { name: 2, y: 1 },
                { name: 3, y: 3 },
            ]);
        });
    });
});
