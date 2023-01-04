const db = require('../../db');
const {ITEM_PER_PAGE} = require("../../constant")

exports.getAllHotProduct = async (page=1) => { //phan trang o day
    let count = await db.connection.execute(`select count(*) from product where hot_product=1`);
    const data = await db.connection.execute(`select * from product where hot_product=1 limit ${ITEM_PER_PAGE} offset ${(page-1)*ITEM_PER_PAGE}`);
    count= count[0][0]['count(*)']
    const result={
        data: data[0],
        page: page,
        total_page: Math.ceil(count/+ITEM_PER_PAGE),
        item_per_page: ITEM_PER_PAGE
    }

    return result;
}

exports.getAllProduct = async () => {
    const result = await db.connection.execute('select * from product');
    //console.log(result[0])
    return result[0];
}

exports.getAllCategory = async () => {
    const result = await db.connection.execute('select * from category');
    console.log(result[0])
    return result[0];
}