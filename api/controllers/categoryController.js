const db = require('../models')

// create main Model

const Category = db.category

// 1. get all category

const getAllCategory = async (req, res) => {
    let category = await Category.findAll({
        attributes: [
            'id',
            'name'
        ]
    })
    res.status(200).send(category)
}
//2. add category

const addCategory = async (req, res) => {
    let category = await Category.create({
        name: req.body.name
    })
    res.status(200).send(category)
}

// 3. delete category

const deleteCategory = async (req, res) => {
        let id = req.params.id
    
        await Category.destroy({where : {id : id}})
    
        res.status(200).send(`Category ${id} is deleted`) 
}

//4. update category

const updateCategory = async (req, res) => {
    let id = req.params.id
    const category = await Category.update(req.body, {where: {id :id}})
    res.status(200).send(category)
}

module.exports = {
    getAllCategory,
    addCategory,
    deleteCategory,
    updateCategory
}