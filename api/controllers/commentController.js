const db = require('../models')

// create main Model

const Comment = db.comment

// main work


// 1. get all comment of an article

const getArticleComment = async (req, res) => {
    let id = req.params.id
    let comment = await Comment.findAll({
        where: {articleId : id},
        attributes: [
            'id',
            'content',
            'createdAt',
            'creator'
        ]
    })
    res.status(200).send(comment)
}

// 2. add comment

const addComment = async (req, res) => {
    let comment = await Comment.create({
        content: req.body.content,
        articleid: req.params.articleid,
        creator: req.body.creator
    })
    res.status(200).send(comment)
}

// 3. delete comment

const deleteComment = async (req, res) => {
        let id = req.params.id
    
        await Comment.destroy({where : {id : id}})
    
        res.status(200).send(`Comment ${id} is deleted`) 
}

//4. update comment

const updateComment = async (req, res) => {
    let id = req.params.id
    const comment = await Comment.update(req.body, {where: {id :id}})
    res.status(200).send(comment)
}

// 5. get every comment of a user

const getUserComment = async (req, res) => {
    let id = req.params.id
    let comment = await Comment.findAll({
        where: {creator : id},
        attributes: [
            'id',
            'content',
            'createdAt'
        ]
    })
    res.status(200).send(comment)
}

module.exports = {
    getArticleComment,
    addComment,
    deleteComment,
    updateComment,
    getUserComment
}