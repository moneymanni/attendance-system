const Sequelize = require('sequelize');

module.exports = class Attendance extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: Sequelize.STRING(100),
                allowNull: false,
                primaryKey: true
            },
            authKey: {
                type: Sequelize.STRING(100),
                allowNull: false
            }
        }, {
            sequelize,
            timestamps: false,
            modelName: 'Attendance',
            tableName: 'attendances',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        db.Attendance.belongsTo(db.Classes, { foreignKey: 'class_id', targetKey: 'class_id' });
    }
};