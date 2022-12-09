const db = require('../models')

// create main Model

const User = db.user
const Role = db.role
const Ruser = db.user_roles

// main work


// 1. get all user

const getAllUser = async (req, res) => {
    let user = await User.findAll({
        attributes: [
            'id',
            'username',
            'email'
        ]
    })
    res.status(200).send(user)
}

// 2. get one user

const getUser = async (req, res) => {
    let id = req.params.id
    let user = await User.findOne({
        where: {id : id},
        attributes: [
            'id',
            'username',
            'email'
        ]
    })
    res.status(200).send(user)
}

// 3. Update user

const updateUser = async (req, res) => {

    let id = req.params.id

    const user = await User.update(req.body, {where: {id :id}})

    res.status(200).send(user)
}

// 4. delete user

const deleteUser = async (req, res) => {

    let id = req.params.id

    await User.destroy({where : {id : id}})

    res.status(200).send(`User ${id} is deleted`)
}

// 5. get user with role // WIP

const getUserWithRole = async (req, res) => {

    const user = await User.findAll({ instance: [{
        model: Ruser,
        required: true,
        attributes: [],
        instance: [{
                model: Role,
                required: true,
                attributes: [],
                where: { name:"ni" }}]
        }]
    })

    res.status(200).send(user)
}// Not work

// 6. make user admin

const makeAdmin = async (req, res) => {
    User.findOne(
        {where: {id: req.params.id}}
        ).then(user => {
            user.setRoles([2]).then(() => {
                res.send("User is now an admin");
            });
        });
}


module.exports = {
    getAllUser,
    getUser,
    updateUser,
    deleteUser,
    getUserWithRole,
    makeAdmin
}