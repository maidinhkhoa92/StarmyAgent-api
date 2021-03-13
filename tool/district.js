require('../app/config/database');
const District = require('../app/services/district');
const City = require('../app/services/city');

const importData = async () => {
    let city_id = '';
    let city_name = '';
    for (let index = 0; index < data.length; index++) {
        try {
            const row = data[index];
            if (city_name !== row.city) {
                let params = {
                    name: row.city,
                    banner: ''
                }
                if(row.highlight) {
                    params.highlight = row.highlight
                }
                if(row.banner) {
                    params.banner = row.banner
                }
                const newCity = await City.create(params);
                city_name = newCity.name;
                city_id = newCity.id;
            }
            const newDistrict = await District.create({ name: row.name, city: city_id });
            console.log('imported:', newDistrict.name)
        } catch (e) {
            console.log('error =>>>>', e)
        }
    }
    console.log('Imported successfully.')
}

importData()