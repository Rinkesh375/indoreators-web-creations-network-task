const mongoose=require("mongoose")

const taskSchema=mongoose.Schema({
    task:{
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const TaskModel=mongoose.model("Task",taskSchema)

module.exports={
    TaskModel
}