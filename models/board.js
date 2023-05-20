const Sequelize = require('sequelize');

module.exports = class Board extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            boardId: {
                type: Sequelize.BIGINT,
                primaryKey: true,
                autoIncrement: true
            },
            title: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            content: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            nickname: {
                type: Sequelize.STRING(100),
                allowNull:false
            },

        }, {
            sequelize,
            timestamps: false,
            modelName: 'Board',
            tableName: 'board',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }
    static associate(db) {
        db.Board.hasMany(db.Comment,{ foreignKey: 'boardId', sourceKey: 'boardId' })
    }
};
