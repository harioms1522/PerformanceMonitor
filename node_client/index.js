const os = require("os")
const cpus = os.cpus()
const io = require("socket.io-client")

let socket = io("http://localhost:8181")

let mac;
socket.on("connect",()=>{
    console.log("CONNECTED!")
    // We have to identify the machine connected so we will use mac addr
    const nI = os.networkInterfaces()
    for (let key in nI){
        if(!nI[key][0].internal==false){
            mac = nI[key][0].mac
            break;
        }
    }

    // to auth as a client
    socket.emit("clientAuth", "fskjsfadjkdsf")

    // initial
    performanceData().then((data)=>{
        data.macA = mac
        socket.emit("initPerfData", data)
    })


    let perDataInterval = setInterval(()=>{
        performanceData().then((data)=>{
            // console.log(data)
            socket.emit("perfData", data)
        })
    }, 1000)


    socket.on("disconnect", _ => clearInterval(perDataInterval))

})

 function performanceData(){
    return new Promise(async (resolve, reject)=>{
        // type
        const osType = os.type()
        // uptime
        const uptime = os.uptime()
        // free mem
        const freeMem = os.freemem()
        const totalMem = os.totalmem()
        const memUsage = Math.floor((totalMem - freeMem)/totalMem*100)/100
    
        const cpuModel = cpus[0].model
        const cpuSpeed = cpus[0].speed
        const numCores = cpus.length
    
        const cpuLoad = await getCpuLoad()

        resolve({
            osType,
            uptime, 
            freeMem, 
            totalMem, 
            memUsage, 
            cpuModel, 
            cpuSpeed, 
            numCores, 
            cpuLoad
        })

    })
}



function cpuAverage(){
    const cpus = os.cpus()
    let idleMs = 0
    let totalMs = 0

    cpus.forEach(core =>{
        for (let type in core.times){
           totalMs += core.times[type]
        }
        idleMs += core.times["idle"]
    })

    return {
        idle: idleMs/cpus.length,
        total: totalMs/cpus.length
    }
}

function getCpuLoad(){
    return new Promise((resolve)=>{
        const start = cpuAverage()
        setTimeout(()=>{
            const end = cpuAverage()
            const idleDiff = end.idle - start.idle
            const totalDiff = end.total - start.total
            const cpuLoad = 100 - Math.floor(100 * idleDiff / totalDiff)
            resolve(cpuLoad)
        },100)
    })
}

