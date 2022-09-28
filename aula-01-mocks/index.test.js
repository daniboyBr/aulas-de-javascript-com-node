const { error } = require('./src/constants')
const File = require('./src/file')
const { rejects, deepStrictEqual } = require('assert')

    ;
(async () => {
    {
        const filePath = './mocks/emptyFile-invalid.csv'
        const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
        const result = File.csvToJson(filePath)
        await rejects(result, rejection)
    }
    {
        const filePath = './mocks/fourItems-invalid.csv'
        const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
        const result = File.csvToJson(filePath)
        await rejects(result, rejection)
    }
    {
        const filePath = './mocks/invalid-header.csv'
        const rejection = new Error(error.FILE_FIELDS_ERROR_MESSAGE)
        const result = File.csvToJson(filePath)
        await rejects(result, rejection)
    }
    {
        const filePath = './mocks/threeItems-valid.csv'
        const result = await File.csvToJson(filePath)
        const expected = [
            {
                "name": "Teste 1",
                "id": 123,
                "profession": "Pet care",
                "birthDay": 1997
            },
            {
                "name": "Teste 2",
                "id": 321,
                "profession": "Worker",
                "birthDay": 1996
            },
            {
                "name": "Teste 3",
                "id": 456,
                "profession": "Developer",
                "birthDay": 1966
            }
        ]
        deepStrictEqual(JSON.stringify(result), JSON.stringify(expected))
    }
})()