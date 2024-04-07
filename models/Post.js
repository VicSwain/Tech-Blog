const { Model, DataTypes } = require('sequelize');
const sequelize = require("../config/connection");

class Post extends Model {};

Post.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "user",
            key: "id",
        }
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    created_on: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    }
}, {
    sequelize, // Pass the sequelize instance here
    timestamps: false,
    freezeTableName: true,
    modelName: "post",
});

module.exports = Post;
