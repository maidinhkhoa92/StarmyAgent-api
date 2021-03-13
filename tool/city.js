require('../app/config/database');
const City = require('../app/models/city');
const Location = require("../app/models/location");
const readXlsxFile = require('read-excel-file/node');

const schema = {
    'city': {
        prop: 'city',
        type: String
    },
    'location': {
        prop: 'location',
        type: String
    },
}

const importData = () => {
    try {
        readXlsxFile('./locations.xlsx', { schema }).then(async ({ rows, errors }) => {
            rows.forEach(data => {
                City.findOne({ name: data.city}, (err, res) => {
                    if (err) {
                        console.log(1, err)
                    }
                    console.log(7, res)
                    if (res) {
                        Location.findOne({ name: data.location}, (er, loc) => {
                            if (er) {
                                console.log(2, er)
                            }
                            console.log(8, loc)
                            if (!loc) {
                                Location.create({ name: data.location, city: res._id }, (error, location) => {
                                    if (error) {
                                        console.log(3, error)
                                    }
                                    console.log(location._id, location.name);
                                });
                            }
                        });
                        
                    } else {
                        City.create({ name: data.city }, (e, city) => {
                            if (e) {
                                console.log(4, e)
                            }
                            console.log(9, city)
                            Location.findOne({ name: data.location}, (er, loc) => {
                                if (er) {
                                    console.log(5, er)
                                }
                                console.log(10, loc)
                                if (!loc) {
                                    Location.create({ name: data.location, city: city._id }, (error, location) => {
                                        if (error) {
                                            console.log(6, error)
                                        }
                                        console.log(location._id, location.name);
                                    });
                                }
                            });
                        });
                    }
                })
            });
            
        })
    } catch (e) {
        console.log(e)
    }
}

importData()