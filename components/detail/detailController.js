const detailService = require("./detailService");
const createError = require("http-errors");
const qs = require("qs");

exports.detail = async (req, res) => {
    const { productId } = req.params;

    const product = await detailService.getProductById(productId);
    const products = await detailService.getAllProduct();

    let page = req.query.page || 1;
    const reviews = await detailService.getReviewByProductId(productId, page);

    let listProductRelated = [];

    for (let i = 0; i < products.length; i++) {
        console.log(products[i].category_Id + " " + product[0].category_Id);
        if (products[i].category_Id === product[0].category_Id && products[i].product_Id != product[0].product_Id) {
            products[i].price = products[i].price.toLocaleString("it-IT", { style: "currency", currency: "VND" });
            listProductRelated.push(products[i]);
        }
    }
    //console.log(listProductRelated)

    product[0].price = product[0].price.toLocaleString("it-IT", { style: "currency", currency: "VND" });

    res.render("detail/page", { product, listProductRelated, reviews });
};