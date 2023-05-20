const Sequelize = require('sequelize');

module.exports = class Classes extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      class_id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      class_name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      professor_name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },

    }, {
      sequelize,
      timestamps: false,
      modelName: 'Classes',
      tableName: 'classes',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }

  static associate(db) {
    db.Classes.belongsToMany(db.Student, { through: 'ClassStudent' });
    db.Classes.hasMany(db.Attendance, { foreignKey: 'class_id', sourceKey: 'class_id' });
  }
};
