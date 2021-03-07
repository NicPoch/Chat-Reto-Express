const { Router } = require("express");
const {Sequelize}=require("sequelize");

const sequelize= new Sequelize("database","","",{
    dialect:"sqlite",
    storage:"./database/database.sqlite"
});

sequelize.authenticate().then(()=>{
    console.log("In");
});

module.exports = sequelize