export const executeQuery = async (client: any, query: string) => {
    try {
        const { rows } = await client.query(query);
        return rows;
    } catch (e) {
        console.log(e);
        throw e;
    }
};