const homeService = require('./homeService');
const createError = require('http-errors');
const qs = require('qs');

exports.home = async (req, res) => {
  let hotProducts = [];
  let page= req.query.page || 1;
  //let  categories = [];
  hotProducts = await homeService.getAllHotProduct(page);
  //categories = await homeService.getAllCategory();

  for (let i = 0; i < hotProducts.data.length; i++)
    hotProducts.data[i].price = hotProducts.data[i].price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });


  // hotProducts = hotProducts.filter(e => e.hot_product === 1)
  // hotProducts = hotProducts.slice(0, 8);

  res.render('home/page', { hotProducts })
};