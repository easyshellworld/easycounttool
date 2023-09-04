"use client"
import React, { useState} from 'react';


const getdata=(urlword)=>{
  const today=new Date().getTime()
		
  const last=Math.floor(today/1000)
fetch('/currency/kline?com_id='+geturldata.coin+'_usdt&symbol='+geturldata.coin+'&anchor=USDT&time='+last+'&market_id=338&period='+geturldata.day+'&timestamp=1674739035146&code=ebc161c4c01e448626c3cc30518009d6&platform=web_pc&v=1.0.0&language=en_US&legal_currency=USD')
.then( res=>res.json() ) 
.then( data=>{
        // console.log(data.data.kline)
   const data_json=data.data.kline.reverse()
    let klinedata={
    kline:data_json,
    value:getklinevelue(data_json)
  }

  //console.log(JSON.stringify(klinedata))
    setnewdata(klinedata.kline)
  setnewdata2(klinedata.value)
  // console.log(newdata)
         // 逻辑处理
      } )
.catch( err=>console.log(err) )
}

export default function Home() {
  const [value, onChangeText] = useState('');
  const [sum, setSum] = useState('');
    return (
      <div>
      <div><h1>{sum}</h1></div>
      <div><input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs"   onChange={e => onChangeText(e.target.value)}
          value={value} /></div>
          <div>
      <button className="btn btn-success"  
        onClick={()=>{
             setSum(eval(value))
             }}
             >sum</button>
      </div>
      </div>
    )
}
  