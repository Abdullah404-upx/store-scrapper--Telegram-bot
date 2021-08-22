const axios = require("axios");
const TELEGRAM_API = `https://api.telegram.org/bot${process.env.TOKEN}`;
//console.log(TELEGRAM_API)
const formatMessage =  (obj)=>{
    return  `<strong>${obj.title}</strong><a href="${obj.img}">.</a>
  Price: <i>${obj.price}</i> LE
  Rating: ${obj.rating} 
  
  <a href="${obj.link}">Link</a>`  
  }
  

const sendMessage = (chat_id, messageText, options={})=>{
  
    const messageObj = Object.assign({chat_id: chat_id,text: messageText}, options)
     return axios.post(`${TELEGRAM_API}/sendMessage`, messageObj)
}

const messageHandler = (message)=>{

}
module.exports={
    sendMessage,
    formatMessage,
    messageHandler
}