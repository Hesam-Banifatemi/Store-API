const Goods = require('../model/Goods');

//a controller for searching goods based on title catagory and description and 
//also i have to mention that this function will get things after query string in 
// the url. also there is a sort option that will sort base on some goods data like price 
//for example in increasing manner or decreasing one, select for selecting 
//seme parts of goods data and numeric_Filter for filtering based on parts 
//of goods data that are number data type like price and it just fiter them 
//only based on price amount like price>50;
const getAllGoods = async( req, res ) => {

    const{
        title, 
        category, 
        description, 
        sort, 
        select,
        numericFilter,
        page,
        limit
    } = req.query; //the right key words
    //getting what ever after the query string symbol "?"

    const queryObj = {}; //a simple empty object for storing 
        //keywords in querystring for searching and finally we pass it in mogoose
        ///Query methods like find and....


    //just for searching without any query string if nothing provided then we have res of line number 41
    if(!title && 
       !category &&
       !description &&
       !sort &&
       !select &&
       !numericFilter &&
       !page &&
       !limit) {
        let result = Goods.find(queryObj);
        const RES_GOODS = await result;
        res.status(200).json({data: RES_GOODS, goods_num: RES_GOODS.length});
        return;
    }

    if(title || 
       category ||
       description ||
       sort ||
       select ||
       numericFilter ||
       page ||
       limit
    ) {
        
        if(title) {
            queryObj.title = {$regex: title, $options: "i"};
        }
        if(category) {
            queryObj.category = {$regex: category, $options: "i"}; 
        }
        if(description) {
            queryObj.description = {$regex: description, $options: "i"};
        }
        
        if(numericFilter) {
            const operatorMap = {
                ">": '$gt',
                "<": '$lt',
                ">=": '$gte',
                "<=": '$lte',
                "=": '$eq',
            }; //a map for converting symbols into understandable mongodb operators
            console.log(numericFilter);
            const regEx = /\b(<|>|>=|=|<=)\b/g;
            let filter = numericFilter.replace(
                regEx,
                (match) => `/${operatorMap[match]}/`);
            //this find matches using both regEx and operatorMap
            console.log(filter);
            const numParts = ["rate", "count", "price", "rating"]; 
            //for checking if the provided names after numricFilter is valid
    
            //this make data ready to deplyed  into queryObj and finally 
            //pass into find mongoose query ok?
            filter = filter.split(',').forEach( item => {
                const [field, operator, value] = item.split("/");
                if(numParts.includes(field)) {
                    queryObj[field] = {[operator]: Number(value)};
                }
            });
            console.log(filter);
            console.log(queryObj);
        }
    
        let result = Goods.find(queryObj); //every query with find operation will chain to this.
    
        if(select) {
            const selectList = select.split(',').join(' ');
            result = result.select(selectList); ///selects for special part of store goods data
            console.log(selectList);
        }
        
        if(sort) {
            const sortList = sort.split(',').join(' ');
            result = result.sort(sortList);
            console.log(sortList);
        }
        //setting needed data for calculating how many items show and skip in a page
        const limit_ = Number(limit) || 5;
        const page_ =  Number(page) || 1;
        const skip_ = (page_ -1) * limit_;
        result = result.skip(skip_).limit(limit_);
    
        const RES_GOODS = await result;//getting the raw data from mogoose Query objects chaining
        res.status(200).json({data: RES_GOODS, goods_num: RES_GOODS.length});
    } else {
        res.status(404).send("please provide a valid searchable item");
    }
};




//exporting the controllers

module.exports = getAllGoods;