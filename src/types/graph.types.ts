export type GraphConfig = {
    x_field: string,
    y_field: { aggragation?: "valuesCount" | "uniqueValues"; field?: string; };
    dataFields?: { field: string, label: string; }[];
};