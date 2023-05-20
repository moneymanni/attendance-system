const express = require('express');
const Classes = require('../models/classes');
const Student = require('../models/student');

const router = express.Router();
const path = require('path');
const {Sequelize} = require("sequelize");

//과목 등록
router.post('/register', async (req, res, next) => {
    const { class_name, professor_name } = req.body;
    try {
        const cls = await Classes.create({
            class_name,
            professor_name,
        });
        res.json(cls);
    }
    catch (err) {
        console.error(err);
        next(err);
    }
});

//수강신청
router.post('/addStudent', async (req, res, next) => {
    const { class_id, user_id } = req.body;
    try {
        const cls = await Classes.findOne( { where: { class_id } });
        const student = await Student.findOne( { where: { id: user_id } });

        await cls.addUser([student])
        res.send(student);
    }
    catch (err) {
        console.error(err);
        next(err);
    }
});

// 특정 과목 학생 수 조회
router.get('/:class_id/students', async (req, res, next) => {
    try {
        const cls = await Classes.findOne( { where: { class_id: req.params.class_id } });
        const students = await cls.getUsers({
            attributes: ['id', 'name']
        });

        res.send({
            students,
            len: students.length
        });
    }
    catch (err) {
        console.error(err);
        next(err);
    }
});

// 과목 조회
router.get('/classes', async (req, res, next) => {
    try {
        let cls = await Classes.findAll({
            attributes: ["class_id","class_name", "professor_name"],
        });

        res.send({
            cls
        });
    }
    catch (err) {
        console.error(err);
        next(err);
    }
});

// 과목 삭제
router.get('/delete/:id', async (req, res, next) => {
    try {
        const result = await Classes.destroy({
            where: { class_id: req.params.id },
            include: {
                model: Student
            }
        });

        if (result) res.send("Success deleted.");
        else next('Not deleted!')
    }
    catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;