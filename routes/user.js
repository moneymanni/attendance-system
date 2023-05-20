const express = require('express');
const bcrypt = require('bcrypt')
const User = require('../models/student');
const Classes = require("../models/classes");
const Student = require("../models/student");

const router = express.Router();

router.route('/all')
    .get(async (req, res, next) => {
        try {
            const users = await User.findAll({
                attributes: ['id', 'name']
            });

            res.send(users)
        } catch (err) {
            console.error(err);
            next(err);
        }
    });

router.route('/signUp')
    .post(async (req, res, next) => {
        const { id, password, name } = req.body;

        if (!password) return next('비밀번호를 입력하세요.');

        const user = await User.findOne({ where: { id } });
        if (user) {
            next('이미 등록된 사용자 아이디입니다.');
            return;
        }

        try {
            const hash = await bcrypt.hash(password, 12);

            res.send(await User.create({
                id,
                password: hash,
                name,
            }));
        } catch (err) {
            console.error(err);
            next(err);
        }
    });

router.get('/delete/:id', async (req, res, next) => {
    try {
        const result = await User.destroy({
            where: { id: req.params.id }
        });

        if (result) res.send("Success delete!");
        else next('Not deleted!');
    } catch (err) {
        console.error(err);
        next(err);
    }
});

//회원 정보 조회
router.get('/:id', async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: { id: req.params.id },
            attributes: ['id', 'name']
        });
        res.json(user);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;
