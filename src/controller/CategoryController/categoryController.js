import {Services, Category} from '../../database/models/index.js'

const getCategories = async(req,res)=>{
    try {
        const categories = await Category.findAll({
            include: Services
        });
        res.status(200).json({status:200, message:"Categories retrieved", data:categories});
    } catch (error) {
        res.status(error.status).json({status:error.status,message:error.message,data:[]});
    }
}

const addCategory = async(req, res) => {
    try {
        const {categoryName} = req.body;
        const category = await Category.create({CategoryName: categoryName});
        res.status(200).json({status:200, message:"Category created", data:category});
    } catch (error) {
        res.status(error.status).json({status:error.status,message:error.message,data:[]});
    }
}

export default {getCategories, addCategory}