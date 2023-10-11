const axios=require('axios');
const { createClient } =require('@supabase/supabase-js')
const crypto =require( 'crypto')


exports.getweather=async (key)=>{
  const arrword = {
    CLEAR_DAY: '晴（白天）',
    CLEAR_NIGHT: '晴（夜间）',
    PARTLY_CLOUDY_DAY: '多云（白天）',
    PARTLY_CLOUDY_NIGHT: '多云（夜间）',
    CLOUDY: '阴', LIGHT_HAZE: '轻度雾霾',
    MODERATE_HAZE: '中度雾霾',
    HEAVY_HAZE: '重度雾霾', LIGHT_RAIN: '小雨', MODERATE_RAIN: '中雨',
    HEAVY_RAIN: '大雨', STORM_RAIN: '暴雨', FOG: '雾', LIGHT_SNOW: '小雪', MODERATE_SNOW: '中雪', HEAVY_SNOW: '大雪', STORM_SNOW: '暴雪', DUST: '浮尘', SAND: '沙尘', WIND: '大风'
  }
  const n='9a5710f6fbf652e1a85e5963b178e67f34091c4a101e0c24ae01e04f3de2b982c8ebd6e975e0b1ed4c071203e7c1ccb665ce81b72aee3f2ef29b9d47f7398e06';
  const weburl=exports.decrypt(n,key)
  const res=await axios({
    method: 'get',
    url: weburl,
  })
  const today=res.data.result.daily
  return  arrword[today.skycon_08h_20h[0].value]+'-'+arrword[today.skycon_20h_32h[0].value]+',气温：'+today.temperature[0].min+'-'+today.temperature[0].max+',雨量：'+today.precipitation[0].min+'-'+today.precipitation[0].max+',湿度：'+today.humidity[0].min+'-'+today.humidity[0].max+',云量：'+today.cloudrate[0].avg
}

exports.decrypt=(encryptedString, key)=> {
  const decipher = crypto.createDecipher('aes-256-cbc', key);
  let decryptedString = decipher.update(encryptedString, 'hex', 'utf-8');
  decryptedString += decipher.final('utf-8');
  return decryptedString;
}



exports.supa=async function(key){
  const mysupa='c213804939268a089646e8c89e8146fd25643e03119abda6ee28d938d3db42c61e432e162f839a73c89d9f174269cdf0fb362e6900b64f7c1eafd57fc4a9d291bf168cbb84216bdf9f1f274bc317798651f088bf18a42b4de340b7e75e1b14241e4ccd17c6fa47049ba3df6cb7c93953a59f5f9aaad1107a02a65a27e86d8b2f43948160d784837ded9e71e5f1e379426ebf56ef63fd5c5198429475ee1547cd18c0b78f7d4fac77e8863c4d2f9e6f0eb6fd12b2ed64855b815e9fb882d235666e62d71defaf5c647e387a4971cad4d205edf9069df2a00d2e133afdd6d1b633'        
  const mykey=exports.decrypt(mysupa,key)
  const supabase = createClient('https://yqbvqhohbxvvqfbfjpvf.supabase.co', mykey)
  
  
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

exports.toweek=()=>{
  datelist = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六']
  return datelist[new Date().getDay()];
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

  