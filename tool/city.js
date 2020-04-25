require('../app/config/database');
const District = require('../app/models/city');

const data = [
    { name: 'San Sebastián', banner: 'https://firebasestorage.googleapis.com/v0/b/starmy-agent.appspot.com/o/cities%2FSan%20Sebasti%C3%A1n.jpg?alt=media&token=8aa617e2-872a-4e42-900b-4b93d10fdac4' },
]

const importData = () => {
    District.insertMany(data, function (err, docs) {
        if (err) {
            return console.error(err);
        } else {
            console.log("Multiple documents inserted to Collection");
        }
    });
}

importData()