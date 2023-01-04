const db= require("../../db")

exports.update = async (cart_Id, quantity) =>{
  const data = await db.connection.execute(`update cart set quantity=${quantity} where id=${cart_Id}`)
  return data[0]
}

exports.getCart = async(user_Id)=>{
  const data = await db.connection.execute(`select * from cart inner join product on cart.product_Id=product.product_Id where user_Id=${user_Id}`)
  return data[0]
}

exports.addToCart = async(user_Id, product_Id, quantity)=>{
  const oldData = await db.connection.execute(`select quantity from cart where user_Id=${user_Id} and product_Id=${product_Id}`)
  console.log(oldData[0][0])
  if (!oldData[0][0]){
    const data = await db.connection.execute(`insert into cart (user_Id, product_Id, quantity) values (${user_Id}, ${product_Id}, ${quantity})`)
    return data
  }else {
    return await db.connection.execute(`update cart set quantity=quantity+1 where user_Id=${user_Id} and product_Id=${product_Id}`)
  }  
}

exports.delete = async(cart_Id) => {
  return await db.connection.execute(`delete from cart where id=${cart_Id}`)
}