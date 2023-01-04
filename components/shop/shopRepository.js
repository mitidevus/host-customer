const db = require('../../db');
const {ITEM_PER_PAGE,ITEM_PER_PAGE_SHOP} = require("../../constant/index")

exports.countAllProducts = async () => {
    let count = await db.connection.execute(`select count(*) from product`);
    return count[0][0]['count(*)'];
}

exports.getAllProduct = async (page=1) => {
    // const result = await db.connection.execute('select * from Product');
    // return result[0];

    let count = await this.countAllProducts();
    const data = await db.connection.execute(`select * from product limit ${ITEM_PER_PAGE_SHOP} offset ${(Number(page)-1)*ITEM_PER_PAGE_SHOP}`);

    const result={
        data: data[0],
        page: page,
        total_page: Math.ceil(count/+ITEM_PER_PAGE_SHOP),
        item_per_page: ITEM_PER_PAGE_SHOP
    }
    return result;
}

exports.getProductByCategory = async (page, cate_Id) => {
    // const result = await db.connection.execute('select * from Product');
    // return result[0];

    let count = await db.connection.execute(`select count(*) from Product where category_Id = ?`, [cate_Id]);
    const data = await db.connection.execute(`select * from Product where category_Id = ? limit ${ITEM_PER_PAGE_SHOP} offset ${(Number(page)-1)*ITEM_PER_PAGE_SHOP}`, [cate_Id]);
    count= count[0][0]['count(*)']
    const result={
        data: data[0],
        page: page,
        total_page: Math.ceil(count/+ITEM_PER_PAGE_SHOP),
        item_per_page: ITEM_PER_PAGE_SHOP
    }

    return result;
}


exports.getAllCategory = async () => {
    
    const result = await db.connection.execute('select * from category');
    return result[0];
}

exports.getSortedProductByPrice_ASC = async (page, cate_Id, nameFilter, min, max) => {
    //let count = this.countAllProducts();
    //const result = await db.connection.execute('select * from Product order by price where category_Id=?',[cate_Id]);
    let sqlCount= "select count(*) from Product"
    let sqlData = "select * from Product"
    let data;
    let count;
    console.log("name repo: ", nameFilter);
    console.log("cate repo: ", cate_Id);
    console.log("SQL: ", `${sqlData} ${(nameFilter||cate_Id || min)?" where ":""} ${nameFilter?" name LIKE '%"+nameFilter+"%' ":""} ${cate_Id? (nameFilter?"and": "") +" category_Id="+cate_Id: ""} ${min?((nameFilter||cate_Id)?" and ": "")+ "price between "+min+" and " + max: ""} order by price  limit ${ITEM_PER_PAGE_SHOP} offset ${(Number(page)-1)*ITEM_PER_PAGE_SHOP}`);
    count = await db.connection.execute(`${sqlCount} ${(nameFilter||cate_Id || min)?" where ":""} ${nameFilter?" name LIKE '%"+nameFilter+"%' ":""} ${cate_Id? (nameFilter?"and": "") +" category_Id="+cate_Id:""} ${min?((nameFilter||cate_Id)?" and ": "")+ "price between "+min+" and " + max: ""} `);    
    data = await db.connection.execute(`${sqlData} ${(nameFilter||cate_Id || min)?" where ":""} ${nameFilter?" name LIKE '%"+nameFilter+"%' ":""} ${cate_Id? (nameFilter?"and": "") +" category_Id="+cate_Id: ""} ${min?((nameFilter||cate_Id)?" and ": "")+ "price between "+min+" and " + max: ""} order by price  limit ${ITEM_PER_PAGE_SHOP} offset ${(Number(page)-1)*ITEM_PER_PAGE_SHOP}`);    
    count=count[0][0]['count(*)']
    const result={
        data: data[0],
        page: page,
        total_page: Math.ceil(count/+ITEM_PER_PAGE_SHOP),
        item_per_page: ITEM_PER_PAGE_SHOP
    }


    return result;
    
        //return result[0];
}

exports.getSortedProductByPrice_DESC = async (page, cate_Id, nameFilter, min, max) => {
    //let count = this.countAllProducts();
    //const result = await db.connection.execute('select * from Product order by price where category_Id=?',[cate_Id]);
    let sqlCount= "select count(*) from Product"
    let sqlData = "select * from Product"
    let data;
    let count;
    console.log("name repo: ", nameFilter);
    console.log("cate repo: ", cate_Id);
    console.log("SQL: ", `${sqlData} ${(nameFilter||cate_Id || min)?" where ":""} ${nameFilter?" name LIKE '%"+nameFilter+"%' ":""} ${cate_Id? (nameFilter?"and": "") +" category_Id="+cate_Id: ""} ${min?((nameFilter||cate_Id)?" and ": "")+ "price between "+min+" and " + max: ""} order by price desc limit ${ITEM_PER_PAGE_SHOP} offset ${(Number(page)-1)*ITEM_PER_PAGE_SHOP}`);
    count = await db.connection.execute(`${sqlCount} ${(nameFilter||cate_Id || min)?" where ":""} ${nameFilter?" name LIKE '%"+nameFilter+"%' ":""} ${cate_Id? (nameFilter?"and": "") +" category_Id="+cate_Id:""} ${min?((nameFilter||cate_Id)?" and ": "")+ "price between "+min+" and " + max: ""}`);    
    data = await db.connection.execute(`${sqlData} ${(nameFilter||cate_Id || min)?" where ":""} ${nameFilter?" name LIKE '%"+nameFilter+"%' ":""} ${cate_Id? (nameFilter?"and": "") +" category_Id="+cate_Id: ""} ${min?((nameFilter||cate_Id)?" and ": "")+ "price between "+min+" and " + max: ""} order by price desc limit ${ITEM_PER_PAGE_SHOP} offset ${(Number(page)-1)*ITEM_PER_PAGE_SHOP}`);    
    count=count[0][0]['count(*)']
    const result={
        data: data[0],
        page: page,
        total_page: Math.ceil(count/+ITEM_PER_PAGE_SHOP),
        item_per_page: ITEM_PER_PAGE_SHOP
    }


    return result;
  
}

exports.getSortedProductByRate_Star_ASC = async (page,cate_Id,nameFilter, min, max) => {
    //let count = this.countAllProducts();
    //const result = await db.connection.execute('select * from Product order by price where category_Id=?',[cate_Id]);
    let sqlCount= "select count(*) from Product"
    let sqlData = "select * from Product"
    let data;
    let count;
    console.log("name repo: ", nameFilter);
    console.log("cate repo: ", cate_Id);
    console.log("SQL: ", `${sqlData} ${(nameFilter||cate_Id || min)?" where ":""} ${nameFilter?" name LIKE '%"+nameFilter+"%' ":""} ${cate_Id? (nameFilter?" and ": "")+" category_Id="+cate_Id: ""}  ${min?((nameFilter||cate_Id)?" and ": "")+ "price between "+min+" and " + max: ""} order by rate_star  limit ${ITEM_PER_PAGE_SHOP} offset ${(Number(page)-1)*ITEM_PER_PAGE_SHOP}`);
    count = await db.connection.execute(`${sqlCount} ${(nameFilter||cate_Id || min)?" where ":""} ${nameFilter?" name LIKE '%"+nameFilter+"%' ":""} ${cate_Id? (nameFilter?" and ": "")+" category_Id="+cate_Id:""}  ${min?((nameFilter||cate_Id)?" and ": "")+ "price between "+min+" and " + max: ""}`);    
    data = await db.connection.execute(`${sqlData} ${(nameFilter||cate_Id || min)?" where ":""} ${nameFilter?" name LIKE '%"+nameFilter+"%' ":""} ${cate_Id? (nameFilter?" and ": "")+" category_Id="+cate_Id: ""} ${min?((nameFilter||cate_Id)?" and ": "")+ "price between "+min+" and " + max: ""}  order by rate_star  limit ${ITEM_PER_PAGE_SHOP} offset ${(Number(page)-1)*ITEM_PER_PAGE_SHOP}`);    
    count=count[0][0]['count(*)']
    const result={
        data: data[0],
        page: page,
        total_page: Math.ceil(count/+ITEM_PER_PAGE_SHOP),
        item_per_page: ITEM_PER_PAGE_SHOP
    }


    return result;
}

exports.getSortedProductByRate_Star_DESC = async (page,cate_Id,nameFilter, min, max) => {
    // const result = await db.connection.execute('select * from Product order by rate_star DESC');
    // return result[0];

    let sqlCount= "select count(*) from Product"
    let sqlData = "select * from Product"
    let data;
    let count;
    console.log("name repo: ", nameFilter);
    console.log("cate repo: ", cate_Id);
    console.log("SQL: ", `${sqlData} ${(nameFilter||cate_Id || min)?" where ":""} ${nameFilter?" name LIKE '%"+nameFilter+"%' ":""} ${cate_Id? (nameFilter?" and ": "")+" category_Id="+cate_Id: ""} ${min?((nameFilter||cate_Id)?" and ": "")+ "price between "+min+" and " + max: ""} order by rate_star desc  limit ${ITEM_PER_PAGE_SHOP} offset ${(Number(page)-1)*ITEM_PER_PAGE_SHOP}`);
    count = await db.connection.execute(`${sqlCount} ${(nameFilter||cate_Id || min)?" where ":""} ${nameFilter?" name LIKE '%"+nameFilter+"%' ":""} ${cate_Id? (nameFilter?" and ": "")+" category_Id="+cate_Id:""} ${min?((nameFilter||cate_Id)?" and ": "")+ "price between "+min+" and " + max: ""}`);    
    data = await db.connection.execute(`${sqlData} ${(nameFilter||cate_Id || min)?" where ":""} ${nameFilter?" name LIKE '%"+nameFilter+"%' ":""} ${cate_Id? (nameFilter?" and ": "")+" category_Id="+cate_Id: ""} ${min?((nameFilter||cate_Id)?" and ": "")+ "price between "+min+" and " + max: ""} order by rate_star desc limit ${ITEM_PER_PAGE_SHOP} offset ${(Number(page)-1)*ITEM_PER_PAGE_SHOP}`);    
    count=count[0][0]['count(*)']
    const result={
        data: data[0],
        page: page,
        total_page: Math.ceil(count/+ITEM_PER_PAGE_SHOP),
        item_per_page: ITEM_PER_PAGE_SHOP
    }


    return result;
}

// exports.getProductByCategory = async (cate_Id) => {
//     const result = await db.connection.execute('select * from Product where category_Id = ?', [cate_Id]);
//     return result[0];
// }

exports.filter = async (page=1, cate_Id=0, nameFilter, min, max) => {
    let sqlCount= "select count(*) from Product"
    let sqlData = "select * from Product"
    let data;
    let count;
    console.log("name repo: ", nameFilter);
    console.log("cate repo: ", cate_Id);
    console.log("SQL filter method: ", `${sqlData} ${(nameFilter||cate_Id || min)?" where ":""} ${nameFilter?" name LIKE '%"+nameFilter+"%' ":""} ${cate_Id? (nameFilter?"and":"")+" category_Id="+cate_Id: ""} ${min?((nameFilter||cate_Id)?" and ": "")+ "price between "+min+" and " + max: ""}  limit ${ITEM_PER_PAGE_SHOP} offset ${(Number(page)-1)*ITEM_PER_PAGE_SHOP}`);
    count = await db.connection.execute(`${sqlCount} ${(nameFilter||cate_Id || min)?" where ":""} ${nameFilter?" name LIKE '%"+nameFilter+"%' ":""} ${cate_Id? (nameFilter?"and":"")+" category_Id="+cate_Id:""} ${min?((nameFilter||cate_Id)?" and ": "")+ "price between "+min+" and " + max: ""} `);    
    data = await db.connection.execute(`${sqlData} ${(nameFilter||cate_Id || min)?" where ":""} ${nameFilter?" name LIKE '%"+nameFilter+"%' ":""} ${cate_Id? (nameFilter?"and":"")+" category_Id="+cate_Id: "" } ${min?((nameFilter||cate_Id)?" and ": "")+ "price between "+min+" and " + max: ""} limit ${ITEM_PER_PAGE_SHOP} offset ${(Number(page)-1)*ITEM_PER_PAGE_SHOP}`);    
    count=count[0][0]['count(*)']
    const result={
        data: data[0],
        page: page,
        total_page: Math.ceil(count/+ITEM_PER_PAGE_SHOP) ,
        item_per_page: ITEM_PER_PAGE_SHOP
    }
    console.log({
        page: page,
        total_page: Math.ceil(count/+ITEM_PER_PAGE_SHOP),
        item_per_page: ITEM_PER_PAGE_SHOP
    });

    return result;
    
}

exports.getSortedProductByRelease_Date_Latest = async () => {
    const result = await db.connection.execute('select * from Product order by release_date');
    return result[0];
}