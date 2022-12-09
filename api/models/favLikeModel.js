const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {

    const FavLike = sequelize.define("favLike", {
        userid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
              model: 'users',
              key: 'id'
            }
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
        like: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        fav: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    })

    return FavLike
    
}