const {Model, DataTypes} =require("sequelize");
const sequelize = require("../lib/sequelize");

class Message extends Model{}

Message.init(
    {
        message:{
            type:DataTypes.STRING(1000),
            allowNull: false
        },
        author:{
            type:DataTypes.STRING(30),
            allowNull:false
        },
        ts:{
            type:DataTypes.DATE,
            allowNull:false,
            primaryKey:true
        }
    },
    {
        sequelize,
        name:"Message",
        timestamps:false
    }
);

Message.sync()
module.exports=Message;