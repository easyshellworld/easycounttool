"use client"
import React, { useState } from 'react';

const getnewdata=(val,qian,zhong,hou)=>{
  return  {
    getval:val*qian/hou,
    count:val *(zhong - qian),
    countt:val *(zhong - qian)*0.5,
    soul:val *(hou-zhong),
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
    <div>
      <div><label>value:</label><h1>{sum.getval}</h1></div>
      <div><label>count:</label><h1>{sum.count}</h1></div>
      <div><label>50%count:</label><h1>{sum.countt}</h1></div>
      <div><label>soul:</label><h1>{sum.soul}</h1></div>
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
        >sum</button>
      </div>
    </div>
  )
}
