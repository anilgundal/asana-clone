const Mongoose = require('mongoose');
const logger = require('../scripts/logger/Tasks');

const TaskSchema = new Mongoose.Schema({
    title: String,
    description: String,
    assigned_to: {
        type: Mongoose.Types.ObjectId,
        ref: "user"// baş harfi büyük yazınca düzeldi!
    },
    due_date: Date,
    statuses: [String],
    section_id: {
        type: Mongoose.Types.ObjectId,
        ref: "section"// baş harfi büyük yazınca düzeldi!
    },
    project_id:{
        type: Mongoose.Types.ObjectId,
        ref: "project"
    },
    user_id: {
        type: Mongoose.Types.ObjectId,
        ref: "user"// baş harfi büyük yazınca düzeldi!
    },
    order: Number,
    isCompleted: Boolean,
    comments: [
        {
            comment: String,
            commented_at: Date,
            user_id:{
                type: Mongoose.Types.ObjectId,
                ref: "user"
            }
        }
    ],
    media: [String],
    sub_tasks: [{
        type: Mongoose.Types.ObjectId,
        ref: "task"
    }]

}, {timestamps: true, versionKey:false});



TaskSchema.post("save", (doc)=>{
    // Kayıt işeminden önce log yazdırır.
    logger.log({
        level: "info",
        message:doc,
    });
});

module.exports = Mongoose.model("task", TaskSchema);