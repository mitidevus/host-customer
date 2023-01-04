const shopService = require('./shopService');
const qs = require('qs');
const itemsPerPage = 3;

exports.shop = async (req, res) => {
  const filter = req.params.filter;
  const { name: nameFilter } = req.query;
  let currentPage = req.query.page || 1;
  let url_filter = "";
  let url_sort = "";

  currentPage=Number(currentPage);

  console.log("currentPage", currentPage);

  console.log("a= " + nameFilter)

  //kt nếu có số page
  if (nameFilter) {
    url_filter = "?name=" + nameFilter;
  }
  if (filter) url_sort = "/sort/" + filter;

  let listProducts = [];
  if (!nameFilter && !filter) {
    listProducts = await shopService.getAllProduct(currentPage);
  }
  if (nameFilter) {
    listProducts = await shopService.filter(nameFilter);
    console.log("listProducts Filter", listProducts);
  }
  if (filter === "price-asc") {
    if (listProducts.length === 0)
      listProducts = await shopService.getSortedProductByPrice_ASC();
    else listProducts.sort((a, b) => a.price - b.price);
    console.log("haha");
  }
  else if (filter === "price-desc") {
    if (listProducts.length === 0)
      listProducts = await shopService.getSortedProductByPrice_DESC();
    else listProducts.sort((a, b) => b.price - a.price);
  }
  else if (filter === "rate-star-asc") {
    if (listProducts.length === 0)
      listProducts = await shopService.getSortedProductByRate_Star_ASC();
    else listProducts.sort((a, b) => a.rate_star - b.rate_star);
  }
  else if (filter === "rate-star-desc") {
    if (listProducts.length === 0)
      listProducts = await shopService.getSortedProductByRate_Star_DESC();
    else listProducts.sort((a, b) => b.rate_star - a.rate_star);
  }
  const sumPage = listProducts.total_page;
  for (let i = 0; i < listProducts.data.length; i++) {
    listProducts.data[i].price = listProducts.data[i].price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
  }

  let listCategory = await shopService.getAllCategory();

  let latestProduct = await shopService.getSortedProductByRelease_Date_Latest();
  latestProduct = latestProduct.slice(0, 5);

  for (let i = 0; i < listProducts.data.length; i++) {
    listProducts.data[i].price = listProducts.data[i].price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
  }

  let listcurrentPage = currentPage;
  let listLeftPage = [];
  let listRightPage = [];

  for (let i = currentPage - 2; i <= currentPage + 2; i++) {
    if (i < currentPage) {
      if (i > 0) listLeftPage.push(i)
    }
    if (i > currentPage) {
      if (i <= sumPage) listRightPage.push(i)
    }
  }

  console.log("currentPage", currentPage);

  res.render('shop/page', { url_sort, url_filter, listProducts, listCategory, listLeftPage, listcurrentPage, listRightPage, latestProduct, originalUrl: `/shop/page/1/${qs.stringify(filter)}` });
};

exports.category = async (req, res) => {
  let cate_Id = req.params.category;
  const filter = req.params.filter; // sort
  let currentPage = req.params.page;
  const checkCategory = true;
  let url_link = "/product_category/" + cate_Id;
  let url_sort = "";

  console.log("currentPage", currentPage);

  currentPage=parseInt(currentPage);

  if (filter) url_sort = "/sort/" + filter;

  let listProducts = [];

  if (filter === "price-asc") {
    listProducts = await shopService.getProductByCategory(cate_Id);
    listProducts.sort((a, b) => a.price - b.price);
  }
  else if (filter === "price-desc") {
    listProducts = await shopService.getProductByCategory(cate_Id);
    listProducts.sort((a, b) => b.price - a.price);
  }
  else if (filter === "rate-star-asc") {
    listProducts = await shopService.getProductByCategory(cate_Id);
    listProducts.sort((a, b) => a.rate_Star - b.rate_Star);
    console.log("listProducts rate_Start up", listProducts);
  }
  else if (filter === "rate-star-desc") {
    listProducts = await shopService.getProductByCategory(cate_Id);
    listProducts.sort((a, b) => b.rate_Star - a.rate_Star);
    console.log("listProducts rate_Star down", listProducts);
  }
  else {
    listProducts = await shopService.getProductByCategory(cate_Id);
  }

  for (let i = 0; i < listProducts.data.length; i++) {
    listProducts.data[i].price = listProducts.data[i].price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
  }

  res.json(listProducts.data)
  // res.render('shop/page', { url_sort, url_link, cate_Id, checkCategory, listProducts, latestProduct, listCategory, listLeftPage, listcurrentPage, listRightPage, originalUrl: `/shop/product_category/${cate_Id}/page/1/${qs.stringify(filter)}` });
}

exports.getApiProducts = async (req, res) => {
  // const filter = req.params.filter
  const { name: nameFilter, sort: filter, cate_id: cate_id, min: min, max: max } = req.query;
  console.log("Query: ", req.query);
  let currentPage = req.query.page ||1;

  currentPage=Number(currentPage);
  //kt nếu có số page

  let listProducts;
  if (!nameFilter && !filter && !cate_id && !min && !max) {
    listProducts = await shopService.getAllProduct(currentPage);
    return res.json(listProducts);
  }
  
  if (filter === "price-asc") {
    listProducts = await shopService.getSortedProductByPrice_ASC(currentPage, cate_id, nameFilter, min, max);
  }
  else if (filter === "price-desc") {
      listProducts = await shopService.getSortedProductByPrice_DESC(currentPage, cate_id, nameFilter, min, max);
  }
  else if (filter === "rate-star-asc") {
      listProducts = await shopService.getSortedProductByRate_Star_ASC(currentPage, cate_id, nameFilter, min, max);
  }
  else if (filter === "rate-star-desc") {
      listProducts = await shopService.getSortedProductByRate_Star_DESC(currentPage, cate_id, nameFilter, min, max);
  }else {
    listProducts = await shopService.filter(currentPage, cate_id, nameFilter, min, max);
  }


  for (let i = 0; i < listProducts.data.length; i++) {
    listProducts.data[i].price = listProducts.data[i].price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
  }


  return res.json(listProducts);
}