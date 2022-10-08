import { QueryResultRow } from "pg";
import { client } from "./db";

export const executeQuery = async <T extends QueryResultRow>(queryToExecute: string): Promise<T[]> => {
    try {
        const { rows } = await client.query<T>(queryToExecute);
        return rows;
    } catch (e) {
        console.log(e);
        throw e;
    }
};