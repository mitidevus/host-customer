const shopRepository = require('./shopRepository');

exports.countAllProducts = async () => {
    return shopRepository.countAllProducts();
}

exports.getAllProduct = async (page=1) => {
  return shopRepository.getAllProduct(page);
}

exports.getProductByCategory = async (page=1, cate_Id) => {
    return shopRepository.getProductByCategory(page,cate_Id)
}

exports.getAllCategory = async () => {
    return shopRepository.getAllCategory();
}

exports.getSortedProductByPrice_ASC = async (page,cate_Id,nameFilter, min, max) => {
    return shopRepository.getSortedProductByPrice_ASC(page,cate_Id,nameFilter, min, max)
}

exports.getSortedProductByPrice_DESC = async (page,cate_Id,nameFilter, min, max) => {
    return shopRepository.getSortedProductByPrice_DESC(page,cate_Id,nameFilter, min, max)
}

exports.getSortedProductByRate_Star_ASC = async (page,cate_Id,nameFilter, min, max) => {
    return shopRepository.getSortedProductByRate_Star_ASC(page,cate_Id,nameFilter, min, max)
}

exports.getSortedProductByRate_Star_DESC = async (page,cate_Id,nameFilter, min, max) => {
    return shopRepository.getSortedProductByRate_Star_DESC(page,cate_Id,nameFilter, min, max)
}

exports.filter = async (page=1, cate_id=0, nameFilter, min, max) => {
    return shopRepository.filter(page, cate_id, nameFilter, min, max)
}

exports.getSortedProductByRelease_Date_Latest = () => {
    return shopRepository.getSortedProductByRelease_Date_Latest();
}