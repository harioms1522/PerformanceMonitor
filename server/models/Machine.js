const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Machine = new Schema({
    macA: String,
    osType: String,
    uptime: Number, 
    freeMem: Number, 
    totalMem: Number, 
    memUsage: Number, 
    cpuModel: String, 
    cpuSpeed: Number, 
    numCores: Number, 
    cpuLoad: Number
})

module.exports = mongoose.model("Machine", Machine)