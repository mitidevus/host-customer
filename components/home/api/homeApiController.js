const homeServive = require('../homeService');
const createError = require('http-errors');

const { ITEM_PER_PAGE, TOTAL_PAGING_LINK } = require('../../../constant');

exports.getAllHotProduct = async (req, res) => {
  let { page } = req.query;
  if (isNaN(page) || !Number.isInteger(parseFloat(page)) || page < 1) {
    page = 1;
  }
  let products;
  products = await homeServive.getAllHotProduct(parseInt(page));
  res.json(products);
};
