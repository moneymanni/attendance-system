const express = require('express');
const bcrypt = require('bcrypt');
const Attendance = require('../models/attendance');
const Board = require("../models/board");
const Classes = require("../models/classes");

const router = express.Router();

// 키 할당
router.post('/call/:id', async (req, res, next) => {
    const { id, authKey } = req.body;
    const cid = await Classes.findOne({ where: { class_id: req.params.id } });
    try {
        const hash = await bcrypt.hash(authKey, 12);
        const attendance = await Attendance.create({
            class_id : req.params.id,
            id,
            authKey: hash
        });
        res.json(attendance);
    }
    catch (err) {
        console.error(err);
        next(err);
    }
});

// 키 조회
router.post('/authKey/:id', async (req, res, next) => {
    try {
        const { key } = req.body;

        const attendance = await Attendance.findOne({ where: { id: req.params.id } });
        const hashed = await bcrypt.hash(key, 12);
        if (attendance) {
            const result = await bcrypt.compare(attendance.authKey, hashed);
            if (result) {
                res.json(attendance);
            }
            else next('인증키가 안 맞음.');
        }
        else next('출석 안 부름.');
    } catch (err) {
        console.error(err);
        next(err);
    }

});

module.exports = router;