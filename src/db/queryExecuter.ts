export const executeQuery = async (client: any, queryToExecute: string) => {
    try {
        const { rows } = await client.query(queryToExecute);
        return rows;
    } catch (e) {
        console.log(e);
        throw e;
    }
};