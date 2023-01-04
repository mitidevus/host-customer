const { connection } = require('../../db');
const homeRepository = require('./homeRepository');

exports.getAllHotProduct = (page=1) => {
    return homeRepository.getAllHotProduct(page);
}

exports.getAllProduct = () => {
    return homeRepository.getAllProduct();
}
  
exports.getAllCategory = () => {
    return homeRepository.getAllCategory();
}

// exports.getAllProductCategory = (idCate,idProduct) => {
//     return homeRepository.getAllProductCategory(idCate,idProduct);
// }