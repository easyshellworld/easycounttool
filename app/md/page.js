"use client"
import { useState } from "react"

import {getdata,getodaydate,supa,toweek,decrypt,getweather} from './com/getdata'




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
  const [isloading,setloading]=useState(false)
  const [newdata,setnewdata]=useState()

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
    setloading(true)
    } catch (error) {
      console.log(error)
    }
    
  }
 
if(isloading==false){
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
}else{
    return (
      <div>
      <button className="btn btn-success" onClick={copyCode} >copy</button>
      <div>
        <pre>
          {newdata}
        </pre>
      </div>
      </div>
    )
}
}
  