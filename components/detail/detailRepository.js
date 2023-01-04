const db = require('../../db');
const {REVIEW_ITEM_PER_PAGE} = require("../../constant")


exports.getAllProduct = async () => {
    const result = await db.connection.execute('select * from product');
    //console.log(result[0])
    return result[0];
}

exports.getProductById = async (productId) => {
    const result = await db.connection.execute('select * from product where product_Id=?', [productId]);
    //console.log(result[0][0])
    return result[0];
}

exports.getReviewByProductId = async (productId, page = 1) => {
    let count = await db.connection.execute('select count(*) from review where product_Id = ?', [productId]);
    const data = await db.connection.execute(`select * from review, user where review.product_Id = ? and review.user_Id = user.user_Id order by id desc limit ${REVIEW_ITEM_PER_PAGE} offset ${(page-1)*REVIEW_ITEM_PER_PAGE}`, [productId]);
    count= count[0][0]['count(*)']
    const result={
        data: data[0],
        page: page,
        total_page: Math.ceil(count/+ REVIEW_ITEM_PER_PAGE),
        item_per_page: REVIEW_ITEM_PER_PAGE
    }
    console.log(result);
    return result;


    // const result = await db.connection.execute('select * from review, user where review.product_Id = ? and review.user_Id = user.user_Id', [productId]);
    // //console.log(result[0])
    // return result[0];
}

exports.createReview = async (productId, userId, content) => {
    const result = await db.connection.execute('insert into review (content, user_Id, product_Id) values (?, ?, ?)', [content, userId, productId]);
    //console.log(result[0])
    return result[0];
}