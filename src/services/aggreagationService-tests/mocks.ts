import { Table } from "../../types/table.types";

export enum SchemaMock {
    stringColumn = 'column1',
    dateColumn = 'column2(DATE)',
    numberColumn = 'column3(NUMBER)',
    sameDataColumn = 'column4'
}

export const mockedTable: Table = {
    schema: [SchemaMock.stringColumn, SchemaMock.numberColumn, SchemaMock.dateColumn, SchemaMock.sameDataColumn],
    data: [
        {
            [SchemaMock.stringColumn]: 'x',
            [SchemaMock.numberColumn]: 2,
            [SchemaMock.dateColumn]: '01/02/2014 00:01:01',
            [SchemaMock.sameDataColumn]: 'aa'
        },
        {
            [SchemaMock.stringColumn]: 'xx',
            [SchemaMock.numberColumn]: 50,
            [SchemaMock.dateColumn]: null,
            [SchemaMock.sameDataColumn]: 'aa'
        },
        {
            [SchemaMock.stringColumn]: 'xxx',
            [SchemaMock.numberColumn]: 100,
            [SchemaMock.dateColumn]: null,
            [SchemaMock.sameDataColumn]: 'a'
        },
    ]
};

export const mockedTable2: Table = {
    schema: [SchemaMock.stringColumn, SchemaMock.numberColumn, SchemaMock.dateColumn, SchemaMock.sameDataColumn],
    data: [
        {
            [SchemaMock.stringColumn]: 'x',
            [SchemaMock.numberColumn]: 2,
            [SchemaMock.dateColumn]: '01/02/2014 00:01:01',
            [SchemaMock.sameDataColumn]: 'aa'
        },
        {
            [SchemaMock.stringColumn]: 'x',
            [SchemaMock.numberColumn]: 2,
            [SchemaMock.dateColumn]: '01/02/2014 00:01:01',
            [SchemaMock.sameDataColumn]: 'aa'
        },
        {
            [SchemaMock.stringColumn]: 'x',
            [SchemaMock.numberColumn]: 3,
            [SchemaMock.dateColumn]: '01/02/2014 00:01:01',
            [SchemaMock.sameDataColumn]: 'aa'
        },
        {
            [SchemaMock.stringColumn]: 'xx',
            [SchemaMock.numberColumn]: 3,
            [SchemaMock.dateColumn]: '01/02/2014 00:01:01',
            [SchemaMock.sameDataColumn]: 'aa'
        },
        {
            [SchemaMock.stringColumn]: 'xxx',
            [SchemaMock.numberColumn]: 3,
            [SchemaMock.dateColumn]: '01/02/2014 00:01:01',
            [SchemaMock.sameDataColumn]: 'aa'
        },
    ]
};