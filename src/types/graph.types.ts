export type GraphConfig = {
    x_field: string,
    y_field: { aggragation?: "valuesCount" | "uniqueValues"; field?: string; };
};