const Sequelize = require('sequelize');
const Student = require('./student');
const Classes = require('./classes');
const Board = require('./board');
const Comment = require('./comment');
const Attendance = require('./attendance');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(
    config.database, config.username, config.password, config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Student = Student;
db.Classes = Classes;
db.Board = Board;
db.Comment = Comment;
db.Attendance = Attendance;

Student.init(sequelize);
Classes.init(sequelize);
Board.init(sequelize);
Comment.init(sequelize);
Attendance.init(sequelize);

Student.associate(db);
Classes.associate(db);
Board.associate(db);
Comment.associate(db);
Attendance.associate(db);

module.exports = db;


