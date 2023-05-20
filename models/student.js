const Sequelize = require('sequelize');

module.exports = class Student extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: Sequelize.STRING(100),
                allowNull: false,
                primaryKey: true
            },
            password: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            name: {
                type: Sequelize.STRING(20),
                allowNull: false
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Student',
            tableName: 'student',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        db.Student.belongsToMany(db.Classes, { through: 'ClassStudent' });
    }
};
