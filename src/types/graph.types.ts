export type GraphConfig = {
    x_field?: string,
    y_field?: { aggragation?: Aggragation; field?: string; };
    dataFields?: string[];
    dataFieldsAggregation?: 'weight' | null;
};

export enum Aggragation {
    uniqueValues = 'uniqueValues',
    valuesCount = 'valuesCount',
    sum = 'sum'
}