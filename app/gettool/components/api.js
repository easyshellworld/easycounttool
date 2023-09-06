exports.getATR=(klinedata)=>{
    let atrdata=[]
    let sumatr=0
    for(let i=0;i<klinedata.length-1;i++){
        let atr=Math.max(klinedata[i].high,klinedata[i+1].close)-Math.min(klinedata[i].low,klinedata[i].close)
        if(i===0){
            atrdata.push(atr)
        }else if(i===1){
            atrdata.push(atr)
            sumatr+=parseFloat(atr)
        }else{
       // console.log(atr)
        sumatr+=parseFloat(atr)
        }
    }
    sumatr=sumatr/7
    atrdata.push(sumatr)
    const maxatr=Math.max(atrdata[0],atrdata[1],atrdata[2])
    return maxatr
}

exports.getlittledata=(klinedata)=>{
    let arr=[]
    for(let i=0;i<9;i++){
      //  klinedata[i].time=timestampToTime(klinedata[i].time)
        arr.push(klinedata[i])
    }
    return arr
}

