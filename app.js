require("dotenv").config();
const express = require("express");
const axios = require("axios");

const { souq } = require("./souq");
const { formatMessage, sendMessage } = require("./utils/funcs");

const { TOKEN, SERVERUL } = process.env;
console.log(TOKEN, " ", SERVERUL);

const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`;
const URI = `webhook/${TOKEN}`;
const WEBHOOK_URL = SERVERUL + URI;

const app = express();
app.use(express.json());

const setup = async () => {
  try{
  const res = await axios.get(`${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`);
  console.log(res.data);
  }catch(err){
    console.log('wwa', err)
  }
};

// app.use(async (req,res, next)=>{
  
//   // console.log(data.data)
//   if(req.body.message.text.startsWith('/') && req.body.message.text != '/start'){
//     next(new Error('this command does not exit..'))
//   }else//const data = await axios.get(`https://api.telegram.org/bot${TOKEN}/getMyCommands`);
//  next() 



// })

app.post(URI, async (req, res) => {
  
  chat_id = req.body.message.chat.id;
  chatText = req.body.message.text.toLowerCase();
   if(req.body.message.text.startsWith('/') && req.body.message.text != '/start')
    await sendMessage(chat_id, `${chatText}?!`)
  else if(req.body.message.text == '/start')
    await sendMessage(chat_id, 'Hi, what would you like to order?')
   else{
   
  const data = (await souq(chatText)).reverse(); // now the main thread is blocked to give clients a lesson of patience
  // const d = [
  //   {
  //     title: "hi",
  //     img: "s",
  //     price: "a",
  //     rating: "g",
  //     link: "d",
  //   },
  // ];
  const requests = [];
 
    try {
      for (let i = 0; i < data.length; i++) {
        let message = formatMessage(data[i]);
        requests[i] = sendMessage(chat_id, message, { parse_mode: "HTML" });
      }
      //console.log(requests)
      await Promise.all(requests);
      await sendMessage(chat_id, 'done')
    } catch (err) {
      console.log(err, "whats wrong");
    }


}
  
  return res.send();

});

app.use(async(err, req,res,next)=>{
  await sendMessage(req.body.message.chat.id, err.message)
  
})

app.listen(process.env.PORT || 5000, async () => {
  console.log("App running on port ", process.env.PORT);
  await setup();
});

// requests[i]=  axios.post(`${TELEGRAM_API}/sendMessage`, {
//   chat_id: chat_id,
//   text: formatMessage(data[i]),
//   parse_mode: 'HTML'

// }

// )
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}