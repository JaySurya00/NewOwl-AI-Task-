const mongoose= require('mongoose');

const studentSchema= new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    studentId:{
        type: String,
        require: true
    },
    courses:{
        type: [String],
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone:{
        type: String,
        require: true
    },
})

const Student= mongoose.model('Students', studentSchema);

module.exports= Student;