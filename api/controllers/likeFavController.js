const db = require("../models");

// create main Model

const LikeFav = db.favLike;
const Article = db.article;
const User = db.user;

//main work

// 1. get number of like global

const getLikeGlobal = async (req, res) => {
    let like = await LikeFav.findAll({
        attributes: [[sequelize.fn('sum', sequelize.col('like')), 'total']],
    });
    res.status(200).send(like);
};

// 2. Add like and fav 

const addLikeFav = async (req, res) => {
    const like = await LikeFav.create({
        userid: req.body.userid,
        articleid: req.body.articleid, 
        like: req.body.like, 
        fav: req.body.fav
    })
    res.status(200).send(like);
};

// 3. get number of like an article

const getArticleLike = async (req, res) => {
    const id = req.params.id;
    let like = await LikeFav.count({
        where: {articleId: id, like: 1}
    });
    console.log(like);
    res.status(200).send({like : like});
};

// 4. get user fav article

const getUserFav = async (req, res) => {
    const id = req.params.id;
    let like = await LikeFav.findAll({
        where: {userId: id, fav: 1},
        attributes: ['articleId'],
    });
    res.status(200).send(like);
};

// 5. update like and fav

const CreateupdateLikeFav = async (req, res) => {
    console.log(req);
    const userid = req.params.userid;
    const articleid = req.params.articleid;
    const exit = await LikeFav.findOne({where: {userId: userid, articleId: articleid} });
    if(exit){
        const like = await LikeFav.update(req.body, {where: {userId: userid, articleId: articleid} });
        res.status(200).send(like);
    } else {
        const like = await LikeFav.create({
            userid: userid,
            articleid: articleid, 
            like: req.body.like, 
            fav: req.body.fav
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
          });
        res.status(200).send(like);
    }

};

module.exports = {
    getLikeGlobal,
    addLikeFav,
    getArticleLike,
    getUserFav,
    CreateupdateLikeFav
};

