require('../app/config/database');
const City = require('../app/models/city');
const Location = require("../app/models/location");
const User = require("../app/models/user");
const readXlsxFile = require('read-excel-file/node');
const _ = require("lodash");

const schema = {
    'name': {
        prop: 'name',
        type: String
    },
    'location': {
        prop: 'location',
        type: String
    },
    'telephone': {
      prop: 'telephone',
      type: String
    },
    'Email': {
      prop: 'Email',
      type: String
    },
}

const city = "Zaragoza";

const importData = () => {
    try {
        readXlsxFile('./agency.xlsx', { schema }).then(async ({ rows, errors }) => {
          City.findOne({ name: city}, (cityErr, cityData) => {
            if (cityErr) {
              console.log(1, cityErr)
            }
            if (cityData) {
              rows.forEach(data => {
                console.log(4, data);
                if (data.Email && data.Email !== "") {
                  const locationsParsed = _.uniq(_.split(data.location, ", "));
                  let locations = [];
                  locationsParsed.forEach(loc => {
                    Location.findOne({ name: loc}, (er, Loc) => {
                      if (er) {
                          console.log(2, er)
                      }
                      console.log(5, Loc);
                      if (Loc) {
                        locations = [...locations, Loc._id];
                      }
                    })
                  })
                  console.log(locations)
                  User.create({
                    fName: data.name,
                    email: data.Email,
                    telephone: data.telephone,
                    city: cityData._id,
                    locations: locations,
                  }, (error, user) => {
                    if (error) {
                        console.log(3, error)
                    } else {
                      console.log(user._id, user.fName);
                    }
                  });
                }
                

              });
            } else {
              console.log("No", cityData);
            }
          })
        })
    } catch (e) {
        console.log(e)
    }
}

importData()