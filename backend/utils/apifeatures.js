class ApiFeatures {
    //here query = model.find() and queryStr = any keyword
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }
    //for search 
    search() {
        const keyword = this.queryStr.keyword
            ? {
                name: {
                    $regex: this.queryStr.keyword,
                    $options: "i",
                }
            } : {};
        // this.query which is equal to products.find() is equal to = find method of javascript with spread operator to use object of keyword
        this.query = this.query.find({ ...keyword });
        //this will return this whole class again.
        return this;
    }
    // for filtration 
    filterByCategory() {
        //filter according to the category and removed the extra keywords except cateogry in our req.query like keword, pagination, price etc
        const queryCopy = { ...this.queryStr }; //converted into object in order to filter.
        const removeFields = ["keyword", "page", "limit"];
        removeFields.forEach(key => delete queryCopy[key]);
        this.query = this.query.find(queryCopy);
        return this;
    }
    filterByPrice() {
        const queryCopy = { ...this.queryStr };   //convert this into object
        const removeFields = ["keyword", "page", "limit", "category"];
        removeFields.forEach(key => delete queryCopy[key]);
        //for pricing we need to add lt, lte, gt, gte and add before $ with the help of regex 
        // const queryStr = await JSON.stringify(queryCopy); // to stringify the object in order to replace every key with $;
        // const queryStrnew = await queryStr.replace(/gt|gte|lt|lte/gi, key => `$${key}`);
        // const queryStrf =  await JSON.parse(queryStrnew);
        this.query = this.query.find(queryCopy);
        return this;
    }
    //for pagination
    pagination(documentsPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = documentsPerPage * (currentPage - 1);
        this.query = this.query.limit(documentsPerPage).skip(skip);
        return this;
    }
}

module.exports = ApiFeatures;