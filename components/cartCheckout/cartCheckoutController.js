
exports.cartCheckout= (req, res) => {
  res.render('cartCheckout/page');
};
const cartService = require("./cartService")

exports.update = async(req, res) => {
  let cart_Id= req.params.id
  let quantity= req.body.quantity
  await cartService.update(cart_Id, quantity)

  let user_Id = res.locals?.user?.user_Id
  if (user_Id){
    let carts = await cartService.getCart(user_Id);
    let sum = carts.reduce((pre, curr)=> pre+curr.price*curr.quantity, 0)
    sum = sum.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
    res.json({sum});
  }
}

exports.cartCheckout= async(req, res) => {
  let user_Id = res.locals?.user?.user_Id
  if (user_Id){
    let carts = await cartService.getCart(user_Id);
    let sum = 0;
    carts = carts.map(v=> {
      sum+= (v.price*v.quantity)
      v.total = Number(Number(v.price)*v.quantity).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
      v.price = v.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
      return v
    })
    sum = sum.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
    res.render('cartCheckout/page', {carts, sum});
  }else {
    res.redirect("http://localhost:3000/auth/login")
  }
  
};

exports.addToCart= async(req, res) => {
  let {user_Id, product_Id, quantity} = req.body
  let result = await cartService.addToCart(user_Id, product_Id, quantity)
  res.json(result)
}

exports.delete = async(req, res) => {
  let cart_Id = req.params.id
  await cartService.delete(cart_Id)

  let user_Id = res.locals?.user?.user_Id
  if (user_Id){
    let carts = await cartService.getCart(user_Id);
    let sum =0;
    carts = carts.map(v=> {
      sum+= (v.price*v.quantity)
      v.total = Number(Number(v.price)*v.quantity).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
      v.price = v.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
      return v
    })
    sum = sum.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
    res.json({carts, sum});
  }
}