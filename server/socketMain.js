const mongoose = require("mongoose")
mongoose.set("strictQuery", true)
try{
    const connection = mongoose.connect("mongodb+srv://harioms1522:456269456@cluster0.r8n4yzy.mongodb.net/test")
}catch(err){
    console.log(err)
}
const Machine = require("./models/Machine")

function socketMain(io,socket){
    let macA
    socket.on("conection",()=>{
        console.log("listening")
    })

    socket.on("clientAuth", (key)=>{
        if(key === "fskjsfadjkdsf"){
            // a node client joined
            console.log("NODE CLIENT JOINED")
            socket.join("clients")
        }else if (key === "sfsfhs"){
            // ui joined
            socket.join("ui")
            console.log("React app joined")
        }else{
            socket.disconnect(true)
        }
    })

    // if the machine is known then update otherwise add it
    socket.on("initPerfData",async (data)=>{
        // console.log(data)
        macA = data.macA
        // check mongo
        const mongooseResp = await checkAndAdd(data)
        console.log("mongooseResp", mongooseResp)
    })

    socket.on("perfData",(data)=>{
        // console.log("DATA RECEIVED", data)
        io.to("ui").emit("data", data)
    })
}

function checkAndAdd(data){
    return new Promise((resolve, reject)=>{
        Machine.findOne({macA: data.macA}, function(err, result){
            if(err){
                console.log("ERROR",err)
                reject(err)
            }else if(result===null){
                let newMachine = new Machine(data)
                newMachine.save()
                resolve("added")
            }else{
                resolve("found")
            }
        })
    })
}

module.exports = socketMain