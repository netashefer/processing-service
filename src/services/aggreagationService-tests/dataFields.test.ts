import { GraphConfig } from "../../types/graph.types";
import { AggregationService } from "../aggregationService";
import { mockedTable, SchemaMock } from "./mocks";

const aggregationService = new AggregationService();

describe("aggregationService tests - dataFields", () => {
    beforeAll(() => {
        const mock = jest.spyOn(AggregationService.prototype, 'getParsedTable');
        mock.mockImplementation(async (dataSourceId: string) => mockedTable);
    });

    describe("test dataFields", () => {
        describe("dataFields without aggregation", () => {
            test('pick field without empty data', async () => {
                // Arange
                const graphConfig: GraphConfig = {
                    dataFields: [SchemaMock.stringColumn],
                };

                // Act
                const aggregatedData = await aggregationService.runAggregation(graphConfig, '1');

                // Assert
                expect(aggregatedData).toEqual([
                    { [SchemaMock.stringColumn]: 'x', id: 0 },
                    { [SchemaMock.stringColumn]: 'xx', id: 1 },
                    { [SchemaMock.stringColumn]: 'xxx', id: 2 }
                ]);
            });

            test('pick field with empty data', async () => {
                // Arange
                const graphConfig: GraphConfig = {
                    dataFields: [SchemaMock.dateColumn],
                };

                // Act
                const aggregatedData = await aggregationService.runAggregation(graphConfig, '1');

                // Assert
                expect(aggregatedData).toEqual([
                    { [SchemaMock.dateColumn]: '01/02/2014 00:01:01', id: 0 },
                    { [SchemaMock.dateColumn]: null, id: 1 },
                    { [SchemaMock.dateColumn]: null, id: 2 },
                ]);
            });

            test('pick several fields', async () => {
                // Arange
                const graphConfig: GraphConfig = {
                    dataFields: [SchemaMock.stringColumn, SchemaMock.numberColumn],
                };

                // Act
                const aggregatedData = await aggregationService.runAggregation(graphConfig, '1');

                // Assert
                expect(aggregatedData).toEqual([
                    { [SchemaMock.stringColumn]: 'x', [SchemaMock.numberColumn]: 2, id: 0 },
                    { [SchemaMock.stringColumn]: 'xx', [SchemaMock.numberColumn]: 50, id: 1 },
                    { [SchemaMock.stringColumn]: 'xxx', [SchemaMock.numberColumn]: 100, id: 2 },
                ]);
            });
        });

        describe("dataFields with aggregation", () => {
            test('single field - same weight', async () => {
                // Arange
                const graphConfig: GraphConfig = {
                    dataFields: [SchemaMock.stringColumn],
                    dataFieldsAggregation: 'weight',
                };

                // Act
                const aggregatedData = await aggregationService.runAggregation(graphConfig, '1');

                // Assert
                expect(aggregatedData).toEqual([
                    { name: 'x', weight: 1 },
                    { name: 'xx', weight: 1 },
                    { name: 'xxx', weight: 1 },
                ]);
            });

            test('single field - different weight', async () => {
                // Arange
                const graphConfig: GraphConfig = {
                    dataFields: [SchemaMock.sameDataColumn],
                    dataFieldsAggregation: 'weight',
                };

                // Act
                const aggregatedData = await aggregationService.runAggregation(graphConfig, '1');

                // Assert
                expect(aggregatedData).toEqual([
                    { name: 'aa', weight: 2 },
                    { name: 'a', weight: 1 },
                ]);
            });
        });
    });
});
