const os = require("os")
const cpus = os.cpus()

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

performanceData().then(console.log)

