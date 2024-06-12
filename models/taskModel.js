const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    text: { type: String, required: [true, 'Text is empty'], trim: true },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "Users",
    },
}, { timestamps: true })

module.exports = mongoose.model('Tasks', TaskSchema)