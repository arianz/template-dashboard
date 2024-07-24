import {Sequelize} from "sequelize";

const db = new Sequelize('dashboard-am','root','',{
    host: 'localhost',
    dialect: 'mysql'
});

export default db;