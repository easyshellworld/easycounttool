"use client"
import { useState } from "react"

import {getdata,getodaydate,supa,toweek,decrypt,getweather,newsupa} from './com/getdata'




export default function Newmarkdown() {


    function copyCode() {
        // 获取代码块的文本
        const codeBlockText = newdata; // 使用变量newdata中的代码块

        // 创建一个文本区域元素
        const textArea = document.createElement('textarea');
        textArea.value = codeBlockText;

        // 将文本区域元素添加到页面，选中文本
        document.body.appendChild(textArea);
        textArea.select();

        // 复制文本到剪贴板
        document.execCommand('copy');

        // 删除临时元素
        document.body.removeChild(textArea);

    }

    

  const [word,setword]=useState()
  const [isloading,setloading]=useState("start")
  const [newdata,setnewdata]=useState()

  const changewrite=async ()=>{
    const mysupadata=await supa(word)
    const template=decrypt(mysupadata,word)
    setnewdata(template)
    
     setloading('write')
    
  }

  const savefile=async ()=>{
    const teststart=await newsupa(newdata,word)
   
    setloading(teststart)

  }

  const changepage=async ()=>{
    try {
    const mysupadata=await supa(word)
    const myweather=await getweather(word)
    const price=await getdata()
    const date=getodaydate()
    const weekday=toweek()
    const template=decrypt(mysupadata,word)
    const formattedTemplate = template
        .replace('$(price)', price)
        .replace('$(date)', date)
        .replace('$(day)',weekday)
        .replace('$(weather)',myweather)
    setnewdata(formattedTemplate)
   
    } catch (error) {
      console.log(error)
    }
    
    setloading('get')
  }
 
if(isloading=='start'){
  return (
     <div className='grid grid-cols-0 gap-3 place-content-center'>
    <div>
    <input value={word} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" onChange={e => setword(e.target.value)}></input>
    </div>
    <div>
      <button className="btn btn-success" onClick={changepage} >sum</button>
    </div>
    </div>
  )
}if(isloading=='get'){
    return (
      <div>
      <button className="btn btn-success" onClick={copyCode} >copy</button>
      <button className="btn btn-success bg-red-600" onClick={changewrite} >change</button>
      <div>
        <pre>
          {newdata}
        </pre>
      </div>
      </div>
    )
} if(isloading=='write'){
  return (
  <div>
    <button className="btn btn-success bg-red-600" onClick={savefile} >save</button>
    <div>
    <textarea className="textarea w-full h-full min-h-50 max-w-screen" value={newdata} onChange={e=>setnewdata(e.target.value)}></textarea>
    </div>
  </div>
  )

}
}
  
