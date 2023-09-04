"use client"
import React, { useState } from 'react';


const getdata = (urlword) => {

}

export default function Home() {
  const [value, onChangeText] = useState({
    qian:'',
    hou:'',
  });
  const [sum, setSum] = useState('');
  
  return (
    <div>
      <div><h1>{sum}</h1></div>
      <div><input type="text" name="qian"   placeholder="Type here" className="input input-bordered w-full max-w-xs" 
        value={value.qian} /></div>
      <div><input type="text" name="hou"  placeholder="Type here" className="input input-bordered w-full max-w-xs"
        value={value.hou} /></div>
      <div>
        <button className="btn btn-success"
          onClick={() => {
          console.log(value)
         //  let test=parseInt(value.qian)+parseInt(value.hou);
            setSum(value.qian)
          }}
        >sum</button>
      </div>
    </div>
  )
}
