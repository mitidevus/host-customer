const { connection } = require('../../db');
const detailRepository = require('./detailRepository');

exports.getAllProduct = () => {
    return detailRepository.getAllProduct();
}
  
exports.getProductById = (productId) => {
    return detailRepository.getProductById(productId);
}

exports.getReviewByProductId = (productId, page = 1) => {
    return detailRepository.getReviewByProductId(productId, page);
}

exports.createReview = (productId, userId, content) => {
    return detailRepository.createReview(productId, userId, content);
}