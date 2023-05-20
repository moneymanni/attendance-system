const Sequelize = require('sequelize');

module.exports = class Comment extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            commentId: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            nickname: {
                type: Sequelize.STRING(100),
                allowNull:false
            },
            comment: {
                type: Sequelize.STRING(100),
                allowNull: false
            },

        }, {
            sequelize,
            timestamps: false,
            modelName: 'Comment',
            tableName: 'comment',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }
    static associate(db) {
        db.Comment.belongsTo(db.Board, {foreignKey: 'boardId', targetKey: 'boardId' })
    }
};
