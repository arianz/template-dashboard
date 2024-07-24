import {Sequelize} from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const MasterCbase = db.define('m_cbase',{
    NIPNAS: DataTypes.STRING,
    STANDARD_NAME: DataTypes.STRING,
    WITEL_HO: DataTypes.STRING,
    PERIODE: DataTypes.DATE
},{
    freezeTableName: true
})

export default MasterCbase;

(async()=>{
    await db.sync();
})();