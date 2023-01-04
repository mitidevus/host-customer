const cartRepository = require("./cartRepository")

exports.getCart = async(user_Id)=>{
  return cartRepository.getCart(user_Id)
}

exports.addToCart = async(user_Id, product_Id, quantity)=>{
  return cartRepository.addToCart(user_Id, product_Id, quantity)
}

exports.delete = async(cart_Id) => {
  return cartRepository.delete(cart_Id)
}

exports.update = async(cart_Id, quantity) =>{
  return cartRepository.update(cart_Id, quantity)
}