const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define("users", {
        username: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
            isEmail: true
        }
    })

    return User

}