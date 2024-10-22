const express = require('express');
const Student = require('../models/student-model.js');
const { body }= require('express-validator')
const validateRequest = require('../middlewares/validate-request.js');

const router = express.Router();

router.get('/api/students', async (req, res) => {
    try {
        const students = await Student.find();
        res.send(students);
    }
    catch (error) {
        res.status(500).send('Something went wrong');
    }
});

router.get('/api/students/search', async (req, res) => {
    try {
        const { firstName, lastName, studentId, email, phone } = req.query;

        const students = await Student.find({$or:[{firstName}, {lastName}, {studentId}, {email}, {phone}]});

        if (students.length === 0) {
            return res.status(404).send({ message: "No students found" });
        }

        res.status(200).send(students);
    } catch (error) {
        console.error("Error searching students:", error);
        res.status(500).send({ message: "Something went wrong" });
    }
});


router.post('/api/students', [
    body('firstName')
        .trim()
        .notEmpty()
        .withMessage('You must supply first name'),
    body('lastName')
        .trim()
        .notEmpty()
        .withMessage('You must supply last name'),
    body('studentId')
        .trim()
        .notEmpty()
        .withMessage('Student ID cannot be empty'),
    body('courses')
        .trim()
        .notEmpty()
        .withMessage('Courses cannot be empty'),
    body('email')
        .trim()
        .isEmail()
        .withMessage('Email must be valid'),
    body('phone')
        .trim()
        .isMobilePhone()
        .isLength({ min: 10, max: 10 })
        .withMessage('Mobile number must be valid'),
], validateRequest, async (req, res) => {
    try {
        const { firstName, lastName, studentId, courses, email, phone } = req.body;
        const student = new Student({ firstName, lastName, studentId, courses, email, phone });
        const result = await student.save();
        res.status(201).send(result);
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Something went wrong');
    }

})

router.put('/api/students/:id',
    [
        body('firstName')
            .trim()
            .notEmpty()
            .withMessage('You must supply first name'),
        body('lastName')
            .trim()
            .notEmpty()
            .withMessage('You must supply last name'),
        body('studentId')
            .trim()
            .notEmpty()
            .withMessage('Student ID cannot be empty'),
        body('courses')
            .trim()
            .notEmpty()
            .withMessage('Courses cannot be empty'),
        body('email')
            .trim()
            .isEmail()
            .withMessage('Email must be valid'),
        body('phone')
            .trim()
            .isMobilePhone()
            .isLength({ min: 10, max: 10 })
            .withMessage('Mobile number must be valid'),
    ], validateRequest,
    async (req, res) => {
        try {
            const {id}= req.params;
            const { firstName, lastName, studentId, courses, email, phone } = req.body;
            const student = await Student.findByIdAndUpdate(id,{ firstName, lastName, studentId, courses, email, phone },{new: true});
            if (!student) {
                return res.status(404).send({ message: "Student not found" });
              }
            res.status(200).send(student);
        }
        catch (error) {
            console.log(error);
            res.status(500).send('Something went wrong');
        }

    })

router.delete('/api/students/:id', async (req, res) => {
    try {
        const {id}= req.params;
        const student = await Student.findByIdAndDelete(id);
        if (!student) {
            return res.status(404).send({ message: "Student not found" });
          }
        res.status(404).send(student);
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Something went wrong');
    }
})


module.exports = router;