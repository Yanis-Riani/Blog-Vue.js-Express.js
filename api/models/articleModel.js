const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {

    const Article = sequelize.define("articles", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING
        },
        content: {
            type: DataTypes.TEXT
        },
    })

    return Article
    
}