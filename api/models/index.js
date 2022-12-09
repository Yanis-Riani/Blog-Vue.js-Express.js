const dbConfig = require('../config/dbConfig.js');

const {Sequelize, DataTypes} = require('sequelize');
const { dialect } = require('../config/dbConfig.js');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host : dbConfig.HOST,
        dialect : dbConfig.dialect,
        operatosAliases : false,

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
    }
)

sequelize.authenticate()
.then(() => {
    console.log('connected..')
})
.catch(err => {
    console.log('Error' + err)
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.user = require('./userModel.js')(sequelize, DataTypes)
db.article = require('./articleModel.js')(sequelize, DataTypes)
db.role = require('./role.js')(sequelize, DataTypes)
db.category = require('./categoryModel.js')(sequelize, DataTypes)
db.comment = require('./commentModel.js')(sequelize, DataTypes)
db.favLike = require('./favLikeModel.js')(sequelize, DataTypes)

// Creation table user_roles
db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
})
db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
})

// Creation table article_category

db.article.belongsToMany(db.category, {
    through: "article_categories",
    foreignKey: "articleId",
    otherKey: "categoryId",
})
db.category.belongsToMany(db.article, {
    through: "article_categories",
    foreignKey: "categoryId",
    otherKey: "articleId",
})

// Foreign key of user on article

db.article.belongsTo(db.user, {
    foreignKey: "creator",
    targetKey: "id",
});

// Foreign key of comment with article and user

db.article.hasMany(db.comment, {foreignKey: "articleid"});
db.comment.belongsTo(db.user, {
    foreignKey: "creator",
    targetKey: "id",
});

// Foreign key of favlike with article and user

db.article.hasMany(db.favLike, {foreignKey : "articleid"})
db.user.hasMany(db.favLike, {foreignKey : "userid"})

db.ROLES = ["user", "admin"];
console.log(db.ROLES)
module.exports = db