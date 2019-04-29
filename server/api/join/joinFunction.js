const Category = require('../category/categoryModel');

exports.joinCategory = async (id, next) => {
    try {
        let category = await Category.findById(id);
        return category;
    } catch (error) {
       next(error);
    }   
}