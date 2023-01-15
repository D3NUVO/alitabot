const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '5551059330:AAEb5BHscliz7rQAAH4ihZaEAPpzfMzQ0Cg';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

let ToUserId = null; //for setting user reply id
const myid = 622411236

// Matches "/echo [whatever]"
bot.onText(/\/json (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  // const chatId = msg.chat.id;
  // const resp = match[1]; // the captured "whatever"


  let obj = msg;
  console.log(obj);
  bot.sendMessage(msg.chat.id, JSON.stringify(obj));
});


bot.onText(/\/sent (.+)/, (msg, match) => {

  let obj = msg;
  console.log(obj);
  if (bot.forwardMessage(myid, msg.chat.id, obj.message_id)) {
    bot.sendMessage(myid, "From " + msg.chat.id);
    bot.sendMessage(msg.chat.id, "Your message has been sent successfully");
  }
});



// Listen for any kind of message. There are different kinds of
// messages.
// bot.on('message', (msg) => {
//   const chatId = msg.chat.id;

//   // send a message to the chat acknowledging receipt of their message
//   bot.sendMessage(chatId, 'Received your message');
// });




bot.onText(/\/set (.+)/, (msg, match) => {

  let obj = msg;
  //console.log(obj);
  if (msg.chat.id == myid) {
    const ToUserS = match.input.slice(4)
    ToUserId = parseInt(ToUserS)
    console.log(ToUserId);
    bot.sendMessage(myid, "To ID changed successfully!");
  } else {
    bot.sendMessage(msg.chat.id, "Your don't have permission to use this command!");
  }
}
);




bot.onText(/\/reply (.+)/, (msg, match) => {

  let obj = msg;
  console.log(obj);

  const textmessage = obj.text.slice(6)

  if (msg.chat.id == myid) {
    if (ToUserId == null) {
      bot.sendMessage(myid, "To ID not configured...");
    } else {
      try {
        bot.sendMessage(ToUserId, textmessage).catch((error) => {
          let errorr = error.code;  // => 'ETELEGRAM'
           // => { ok: false, error_code: 400, description: 'Bad Request: chat not found' }
          if(errorr == 'ETELEGRAM'){
            bot.sendMessage(myid, 'The person blocked the bot');
          }
        })

          bot.sendMessage(myid, "message sent successfully");
 
      } catch (error) {
        console.log(message.error);
      }
    }
  } else {
    bot.sendMessage(msg.chat.id, "You have no permission to use this command !");
  }
});







bot.onText(/\/sendpic/, (msg) => {

  bot.sendPhoto(msg.chat.id, "https://i.pinimg.com/736x/7c/63/4a/7c634a6ad5195fe865c79cd0210d06f7.jpg", { caption: "Here we go ! \nHow do I look? ☺ " });

});


bot.onText(/\/start/, (msg) => {

  bot.sendMessage(msg.chat.id, "Hello " + msg.from.first_name + ',' + ' I am the assistant @DrakeAustin. \n\nJust send me the message using /sent \n (eg: /sent hello) \nI will sent it!\n\n sent /help for more...');

});

bot.onText(/\/help/, (msg) => {

  bot.sendMessage(msg.chat.id, 'My commands \n/start\n/sent\n/json\n/id\n/sendpic\n/reply\n/set ');

});



bot.onText(/\/id/, (msg) => {
  const id = msg.chat.id
  bot.sendMessage(msg.chat.id, "Your telegram ID is: " + id);

});




bot.on('message', (msg) => {
  var Hi = "hi";
  if (msg.text.toString().toLowerCase().indexOf(Hi) === 0) {
    bot.sendMessage(msg.from.id, "Hello  " + msg.from.first_name);
  }
  var bye = "bye";
  if (msg.text.toString().toLowerCase().includes(bye)) {
    bot.sendMessage(msg.chat.id, "Hope to see you around again , Bye");
  }
  var robot = "who are you";
  if (msg.text.toLowerCase().indexOf(robot) === 0) {
    bot.sendMessage(msg.chat.id, "I'm robot but not in that way!");
  }

  var sendd = "/sent";
  if (msg.text === '/sent') {
    bot.sendMessage(msg.chat.id, "Just send me the message using /sent \n (eg: /sent hello) \nI will sent it to my master");
  }

  var rply = "/reply";
  if (msg.text === '/reply') {
    bot.sendMessage(msg.chat.id, "Only my Creator can use this command !");
  }

  var sett = "/set";
  if (msg.text === '/set') {
    bot.sendMessage(msg.chat.id, "Only my Creator can use this command !");
  }

});