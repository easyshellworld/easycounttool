"use client"
import { useState } from "react"
import crypto from 'crypto'
import {getdata,getodaydate,supa} from './com/getdata'

function decrypt(encryptedString, key) {
  const decipher = crypto.createDecipher('aes-256-cbc', key);
  let decryptedString = decipher.update(encryptedString, 'hex', 'utf-8');
  decryptedString += decipher.final('utf-8');
  return decryptedString;
}


export default function Newmarkdown() {

    const [isCopied, setIsCopied] = useState(false);

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

        // 设置复制状态为true，显示成功消息
        setIsCopied(true);

        // 恢复复制状态并隐藏成功消息
        setTimeout(() => {
            setIsCopied(false);
        }, 1500);
    }

const mysupa='c213804939268a089646e8c89e8146fd25643e03119abda6ee28d938d3db42c61e432e162f839a73c89d9f174269cdf0fb362e6900b64f7c1eafd57fc4a9d291bf168cbb84216bdf9f1f274bc317798651f088bf18a42b4de340b7e75e1b14241e4ccd17c6fa47049ba3df6cb7c93953a59f5f9aaad1107a02a65a27e86d8b2f43948160d784837ded9e71e5f1e379426ebf56ef63fd5c5198429475ee1547cd18c0b78f7d4fac77e8863c4d2f9e6f0eb6fd12b2ed64855b815e9fb882d235666e62d71defaf5c647e387a4971cad4d205edf9069df2a00d2e133afdd6d1b633'
  const [word,setword]=useState()
  const [isloading,setloading]=useState(false)
  const [newdata,setnewdata]=useState()

  const changepage=async ()=>{
    const newkey=decrypt(mysupa,word)
    const mysupadata=await supa(newkey)
    const price=await getdata()
    const date=getodaydate()
    const template=decrypt(mysupadata,word)
    const formattedTemplate = template
        .replace('$(price)', price)
        .replace('$(date)', date);
    setnewdata(formattedTemplate)
    setloading(true)
  }
 
if(isloading==false){
  return (
     <div className='grid grid-cols-0 gap-3 place-content-center'>
    <div>
    <input value={word} type="text" placeholder="Type here" onChange={e => setword(e.target.value)}></input>
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
  