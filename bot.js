const fetch = require("node-fetch");
const TelegramBot = require('node-telegram-bot-api');
const Agent = require('socks5-https-client/lib/Agent');
const request = require('request');

// var sendmessage=function(text){
//     var chat_id=566203875;
//     url=`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&text=${text}`;
//     fetch(url).then(res=>{
//         console.log('res :', res);
//     }
        
//     )

// }

const token = '938542335:AAEb-FRGtD2YLqSewRLWUIPHE7OTHHCtsOY';
const bot = new TelegramBot(token, {
    polling: {
        interval: true
     },
    request: { // 设置代理
      agentClass: Agent,
      agentOptions: {
        socksPassword: 'wang.see'
      }
    }
  });

    // bot.on('message',function(message)
    // {
    //     var chat_id = message.chat.id;
    
    //     // It'd be good to check received message type here
    //     // And react accordingly
    //     // We consider that only text messages can be received here
    
    //     api.sendMessage({
    //         chat_id: message.chat.id,
    //         text: message.text ? message.text : 'This message doesn\'t contain text :('
    //     })
    //     .then(function(message)
    //     {
    //         console.log(message);
    //     })
    //     .catch(function(err)
    //     {
    //         console.log(err);
    //     });
    // });
// 匹配/hentai
bot.onText(/\/prpr/, function onLoveText(msg) {
    const chatId = msg.chat.id;
    request('https://konachan.com/post.json?tags=ass&limit=10', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        const result = JSON.parse(body) || [];
        const index = parseInt(Math.random() * result.length);
        bot.sendPhoto(chatId, result[index].file_url, { caption: '手冲一时爽，一直手冲一直爽' }).catch((err) => {
          bot.sendMessage(chatId, '手冲失败');
        })
      } else {
        bot.sendMessage(chatId, '手冲失败');
      }
    });
  });
  
bot.onText(/\/hentai/, function onLoveText(msg) {
    bot.sendMessage(msg.chat.id, 'Are you a hetai?');
  });
  
  
  // 匹配/echo
  bot.onText(/\/echo (.+)/, (msg, match) => {
  
    const chatId = msg.chat.id;
    const resp = match[1];
    bot.sendMessage(chatId, resp);
  });

//   bot.on('message', (msg) => {
//     const chatId = msg.chat.id;
  
//     // send a message to the chat acknowledging receipt of their message
//     bot.sendMessage(chatId, 'Received your message');
//   });

  bot.on('polling_error', (err) => console.log(err))

module.exports=bot;