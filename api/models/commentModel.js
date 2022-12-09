const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {

    const Comment = sequelize.define("comments", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        articleid: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          references: {
            model: 'articles',
            key: 'id'
          }
        },
        content: {
            type: DataTypes.TEXT
        }
    })

    return Comment
    
}