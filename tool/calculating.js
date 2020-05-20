const readXlsxFile = require('read-excel-file/node');

const schema = {
    'City': {
        prop: 'city',
        type: String
    },
    'District': {
        prop: 'district',
        type: String
    },
    'Alquiler': {
        prop: 'sale',
        type: Number
    },
    'Venta': {
        prop: 'rent',
        type: Number
    },
}

const readFile = async () => {
    try {
        const { rows, errors } = await readXlsxFile('./test.xlsx', { schema })

        return rows
    } catch {
        
    }
}

const RunTool = async () => {

}