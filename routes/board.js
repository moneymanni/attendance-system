const express = require('express');
const Board = require('../models/board');
const Comment = require('../models/comment');

const router = express.Router();

//게시글 등록
router.post('/register', async (req, res, next) => {
        const { title, content, nickname } = req.body;
        try {
            const posting = await Board.create({
                title,
                content,
                nickname,
            });

            res.json(posting);
        }
        catch (err) {
            console.error(err);
            next(err);
        }
});

//댓글 등록
router.post('/:id/comment', async (req, res, next) => {
    const number = await Board.findOne({ where: { boardId: req.params.id } })
    const { nickname, comment } = req.body;
    try {
        const posting = await Comment.create({
            boardId: number.boardId,
            nickname,
            comment,
        });

        res.json(posting);
    }
    catch (err) {
        console.error(err);
        next(err);
    }
});

// 게시글 삭제
router.get('/delete/:id', async (req, res, next) => {
    try {
        const result = await Board.destroy({
            where: { boardId: req.params.id },
            include: {
                model: Comment
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

// 게시글 조회
router.get('/all', async (req, res, next) => {
    try {
        const posting = await Board.findAll({
            include: {
                model: Comment
            }
        });
        res.json(posting);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;