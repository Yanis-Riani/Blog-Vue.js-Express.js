const db = require('../models')

// create main Model

const Article = db.article
const Category = db.category

const Op = db.Sequelize.Op;

// main work


// 1. get all Article

const getAllArticle = async (req, res) => {
    console.log(Article);
    Article.findAll()
    .then(article => {
        if(!article){
            return res.status(404).send({message: "No article in the database"});
        }

        
        let listarticles = [];
        article.forEach(element => {
            element.getCategories().then(categories => {
                var listcategories = [];
                for (var i = 0; i < categories.length; i++) {
                    listcategories.push(categories[i].name);
                    }
                
                const end = {
                    id: element.id,
                    title: element.title,
                    content: element.content,
                    categories: listcategories,
                    createdAt: element.createdAt,
                    creator: element.creator
                    }
                
                listarticles.push(end);
                if (listarticles.length == article.length) {
                    res.status(200).send(listarticles);
                }})
        });
        
        })
    .catch(err => {
        res.status(500).send({message: err.message});
    });
}

// 2. get one Article

const getArticle = async (req, res) => {
    let id = req.params.id
    Article.findOne({where: {id: id}})    
    .then(article => {
        if(!article){
            return res.status(404).send({message: "No article in the database"});
        }

        var listcategories = [];
        article.getCategories().then(categories => {
            for (var i = 0; i < categories.length; i++) {
                listcategories.push(categories[i].name);
                }
            res.status(200).send({
                id: article.id,
                title: article.title,
                content: article.content,
                categories: listcategories,
                createdAt: article.createdAt,
                creator: article.creator
                });
            })
        })
    .catch(err => {
        res.status(500).send({message: err.message});
    });
}

// 3. Update Article

const updateArticle = async (req, res) => {

    let id = req.params.id

    const article = await Article.update(req.body, {where: {id :id}})

    res.status(200).send(article)
}

// 4. delete Article

const deleteArticle = async (req, res) => {

    let id = req.params.id

    await Article.destroy({where : {id : id}})

    res.status(200).send(`Article ${id} is deleted`)
}

// 5. get Article with category

const getArticleWithCategory = async (req, res) => {

    const article = await Article.findAll({ where: { role: role>0 } })

    res.status(200).send(article)
}// not working

//6. add Article

const addArticle = async (req, res) => {
    Article.create({
        title: req.body.title,
        content: req.body.content,
        creator: req.body.creator
    })
        .then(article => {
            if (req.body.categories) {
                Category.findAll({
                    where: {
                        name: {
                            [Op.or]: req.body.categories
                        }
                    }
                }).then(categories => {
                    article.setCategories(categories).then(() => {
                        res.status(200).send({message: "Article was added successfully !"})
                    })
                })
            }  else {
                article.setCategories(null).then(() => {
                    res.status(200).send({message: "Article was added successfully with no category !"})
                })
            }
        })
        .catch(err => {
            res.status(500).send({message: err.message})
        })
}   

module.exports = {
    getAllArticle,
    getArticle,
    updateArticle,
    deleteArticle,
    getArticleWithCategory,
    addArticle
}