require('../app/config/database');
const CalculatedData = require('../app/models/calculated_data');
const readXlsxFile = require('read-excel-file/node');
const _ = require("lodash");

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
        prop: 'rent',
        type: Number
    },
    'Venta': {
        prop: 'sale',
        type: Number
    },
}

const RunTool = async () => {
    try {
        readXlsxFile('./calculated_data.xlsx', { schema }).then(async ({ rows, errors }) => {
            const data = await _.chain(rows)
                .groupBy("city")
                .map((value, key) => ({ city: key, district: _.map(value, item => ({ name: item.district, sale: item.sale, rent: item.rent })) }))
                .value()
            
            CalculatedData.insertMany(data, (err, docs) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log("Multiple documents inserted to Collection");
                }
            })
            
        })
    } catch (e) {
        console.log(e)
    }
}

RunTool();