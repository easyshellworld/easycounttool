"use client"
import React, { useState } from 'react';
import { getATR, getlittledata } from './components/api';


async function getdata(urlword) {
  const today = new Date().getTime()
  const last = Math.floor(today / 1000)
  const olddata = await fetch('/currency/kline?com_id=' + urlword + '_usdt&symbol=' + urlword + '&anchor=USDT&time=' + last + '&market_id=338&period=1d&timestamp=1674739035146&code=ebc161c4c01e448626c3cc30518009d6&platform=web_pc&v=1.0.0&language=en_US&legal_currency=USD')
  const newdata = await olddata.json();
  const coindata = getlittledata(newdata.data.kline);
  const maxatr = getATR(coindata);

  return [coindata[0].close, maxatr]

}

function getcountdata(val, maxatr, zhisun, gangang) {
  let changewei = zhisun/(maxatr*gangang)
  let changweiu = zhisun/(maxatr*gangang)*val/20
  let shangwei = parseFloat(val)+(gangang*maxatr);
  let xiawei = parseFloat(val)-(gangang*maxatr);

  return [changewei, changweiu,shangwei, xiawei]
}

export default function Home() {
  const [coinname, onChangecoinname] = useState('btc');
  const [gangang, onChangegangang] = useState(1.5);
  const [zhisun, onChangezhisun] = useState(10);
  const [sum, setSum] = useState(
    {
      price: '',
      maxatr: '',
      changwei: '',
      changweiu: '',
      shangwei: '',
      xiawei: '',

    }

  );
  return (
    <div className="grid grid-cols-0 gap-3 place-content-center">
      <div><label>Price:</label>{sum.price}<label> MaxAtr:</label>{sum.maxatr}</div>
      <div><label>position:</label>{sum.changwei}<label> positionu:</label>{sum.changweiu}</div>
      <div><label>top:</label>{sum.shangwei}<label> low:</label>{sum.xiawei}</div>
      <div><input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" onChange={e => onChangecoinname(e.target.value)}
        value={coinname} /></div>

      <div><input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" onChange={e => onChangegangang(e.target.value)}
        value={gangang} /></div>


      <div><input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" onChange={e => onChangezhisun(e.target.value)}
        value={zhisun} /></div>



      <div>
        <button className="btn btn-success"
          onClick={async function () {
            const coinvalue = await getdata(coinname);
            const position=getcountdata(coinvalue[0], coinvalue[1], zhisun, gangang);
            setSum({
              price: coinvalue[0],
              maxatr: coinvalue[1],
              changwei: position[0],
              changweiu: position[1],
              shangwei: position[2],
              xiawei: position[3],

            })
          }}
        >getname</button>
      </div>
    </div>
  )
}
