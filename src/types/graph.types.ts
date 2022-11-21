export type Aggragation = 'uniqueValues' | 'valuesCount';

export type GraphConfig = {
    x_field: string,
    y_field: { aggragation?: Aggragation; field?: string; };
};
