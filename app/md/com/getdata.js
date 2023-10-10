const axios=require('axios');
const { createClient } =require('@supabase/supabase-js')



exports.supa=async function(key){
  const supabase = createClient('https://yqbvqhohbxvvqfbfjpvf.supabase.co', key)
  
  
  let { data: markdown, error } = await supabase
    .from('markdown')
    .select('test')

  const  n=markdown.length-1
  return markdown[n].test
}

exports.getodaydate=()=>{
  let today=new Date().getTime()
  return timestampToTime(today)
}

exports.getdata=async function(){
   const coinprice=await getcoin()
   const stockdata =await getstock();
   const foxdata=await getfox();
   return stockdata+coinprice+foxdata;
   
}


function timestampToTime(timestamp) {
  var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear();
  var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
  var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate());
  //var D = date.getDate() + ' ';
 /*  var h = date.getHours() + ':';
  var m = date.getMinutes() + ':';
  var s = date.getSeconds(); */
//  Log(Y+M+D)
  return String(Y)+String(M)+String(D);;
}


async function getcoin(){
  const coinnames=['btc', 'eth', 'matic665', 'apt530', 'tron', 'solana', 'arb248','ape613']
  let coinpricetext=''
  for(let i=0;i<coinnames.length;i++){
    const res=await axios({
        method: 'get',
        url: gettoday(coinnames[i]),
        
        headers: {
          'Content-Type': 'application/json',
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0",
        }
      
    })
   
    const price=coinnames[i].match(/.*[a-zA-Z]/)+':'+ res.data.data.kline[0].close + ','
    coinpricetext=coinpricetext+price 
    
  }

  return coinpricetext
}



function gettoday(coinname){

  let today=new Date().getTime()
 
  let last=Math.floor(today/1000)
  

 // let test= "https://api.mytokenapi.com/currency/kline?com_id="+coinname+"_usdt&symbol="+coinname+"&anchor=USDT&time="+last+"&market_id=338&period=1d&timestamp=1674739035146&code=ebc161c4c01e448626c3cc30518009d6&platform=web_pc&v=1.0.0&language=en_US&legal_currency=USD"
 let test= "/currency/"+"kline?com_id="+coinname+"_usdt&symbol="+coinname+"&anchor=USDT&time="+last+"&market_id=338&period=1d&timestamp=1674739035146&code=ebc161c4c01e448626c3cc30518009d6&platform=web_pc&v=1.0.0&language=en_US&legal_currency=USD"
 // console.log(test)
  return test
}


async function getstock(){
  const stock="sh000001,sz399001,usDJI,usIXIC"
  const res=await axios.get('https://qt.gtimg.cn/q='+stock)
  const stockname=['上证指数','深证指数','道琼斯指数','纳斯达克']
  const stockdata=res.data
  //console.log(stockdata)
  let stockarr=stockdata.match(/(.*?);/g)
  let stocktext='';
  for(let i=0;i<stockarr.length;i++){
     const text=stockarr[i].match(/"(.*?)"/)
     // console.log(text)
      let arr=text[1].split("~");
      stocktext=stocktext+stockname[i]+ ":" + arr[3] + ','
     
  } 
  //console.log(stocktext)
  return stocktext
}

async function getfox(){
  const foxurl='https://api.exchangerate-api.com/v4/latest/'
  const foxarr=[
    {
      url:'usd',
      arr:[
        {
          name:'USDCNY',
          val:'CNY'
        },
        {
          name:'USDJPY',
          val:'JPY'
        }
      ]
    },
    {
      url:'eur',
      arr:[
        {
          name:'EURUSD',
          val:'USD'
        }
      ]
    },
    {
      url:'gbp',
      arr:[
        {
          name:'GBPJPY',
          val:'JPY'
        }
      ]
    } 
  ]
  let foxtext=''
  for(let i=0;i<foxarr.length;i++){
     const res=await axios({
        method: 'get',
        url: foxurl+foxarr[i].url,
        
        headers: {
          'Content-Type': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0",
        } 
      
    })
    const resjosn=res.data.rates
   // console.log(resjosn)
    for(let j=0;j<foxarr[i]['arr'].length;j++){
       const str=foxarr[i]['arr'][j].name+':'+resjosn[foxarr[i]['arr'][j].val]+','
       foxtext=foxtext+str
    }
  }
 // console.log(foxtext)
  return foxtext
}

  