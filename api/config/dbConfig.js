module.exports = {
    HOST: 'mysql-yanis.alwaysdata.net',
    USER     : 'yanis',
    PASSWORD : 'Projetweb',
    DB : 'yanis_bd_projet_web',
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}
