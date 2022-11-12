export type GraphConfig = {
    x_field: string,
    y_field: { aggragation?: "sum" | "none"; field?: string; };
};