"use client"
import React, { useState} from 'react';

export default function Home() {
  const [value, onChangeText] = useState('');
  const [sum, setSum] = useState('');
  return (
    <div className='grid grid-cols-0 gap-3 place-content-center'>
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
