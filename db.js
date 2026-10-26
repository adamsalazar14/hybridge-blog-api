const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

const Author = sequelize.define('Author', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

const Post = sequelize.define('Post', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

Author.hasMany(Post, { foreignKey: 'authorId' });
Post.belongsTo(Author, { foreignKey: 'authorId' });

module.exports = { sequelize, Author, Post };