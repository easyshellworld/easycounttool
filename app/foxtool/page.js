"use client"
import React, { useState } from 'react';

const getnewdata=(val,qian,zhong,hou)=>{
  return  {
    getval:val*qian/hou,
    count:val *(zhong - qian),
    countu:val-val*qian/zhong,
    countt:val *(zhong - qian)*0.5,
    counttu:(val-val*qian/zhong)*0.5,
    soul:val *(hou-zhong),
    soulu:val*qian/zhong-val*qian/hou
  } 
}


export default function Home() {
/*   const [value, onChangeText] = useState({
    val:'',
    qian:'',
    zhong:'',
    hou:''
    
  }); */
  const [val,getval]=useState('');
  const [qian,getqian]=useState('');
  const [zhong,getzhong]=useState('');
  const [hou,gethou]=useState('');
  const [sum, setSum] = useState({
    getval:'',
    count:'',
    countt:'',
    soul:''
  });
  
  return (
    <div className="grid grid-cols-0 gap-8 place-content-center">
      <div><label>value:</label>{sum.getval}</div>
      <div><label>count:</label>{sum.count}<label> countu:</label>{sum.countu}</div>
      <div><label>50%count:</label>{sum.countt}<label> counttu:</label>{sum.counttu} </div>
      <div><label>soul:</label>{sum.soul} <label> soulu:</label>{sum.soulu} </div>
      <div><input type="text" name="qian"   placeholder="Type here" className="input input-bordered w-full max-w-xs" onChange={e => getval(e.target.value)}
        value={val} /></div>
      <div><input type="text" name="hou"  placeholder="Type here" className="input input-bordered w-full max-w-xs" onChange={e => getqian(e.target.value)}
        value={qian} /></div>
      <div><input type="text" name="hou"  placeholder="Type here" className="input input-bordered w-full max-w-xs" onChange={e => getzhong(e.target.value)}
        value={zhong} /></div>
      <div><input type="text" name="hou"  placeholder="Type here" className="input input-bordered w-full max-w-xs" onChange={e => gethou(e.target.value)}
        value={hou} /></div>
      <div>
        <button className="btn btn-success"
          onClick={() => {
            const newdata=getnewdata(val,qian,zhong,hou)
            setSum(newdata)
          }}
        >Getdata</button>
      </div>
    </div>
  )
}
