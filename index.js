import TelegramBot from "node-telegram-bot-api";
import { config } from "dotenv";
config();
const TOKEN =  process.env.BOT_TOKEN;
const bot = new TelegramBot(TOKEN, { polling: true });


let usersData = [
 { chatId: 2107803986, firstName: "𝓈𝒽ℴ𝓍𝓇𝓊𝓍", admin: true },
 { chatId: 5710316881, firstName: '.' , admin: true}


]



bot.on("message", (msg) => {
  // console.log(msg);
  const chatId = msg.chat.id;
  const text = msg.text;
  const firstName = msg.chat.first_name;

  //   bot.sendMessage(chatId, text);
  // start uchun handler
  if (text == "/start") {
    const userExists = usersData.find((user) => user.chatId === chatId);

    console.log(!!userExists);

    if (!userExists) {
      usersData = [...usersData, { chatId: chatId, firstName: firstName }];
    }

    console.log(usersData);
    bot.sendMessage(
      chatId, 
      `
        👋 Assalomu alaykum, ${firstName}!

📚 100x Academy o‘quv markazining rasmiy botiga xush kelibsiz!

Bu bot orqali siz:
• Kurslarimiz haqida batafsil ma’lumot olasiz  
• Kurslarga onlayn ro‘yxatdan o‘tishingiz mumkin  
• Jadval va to‘lovlar haqida ma’lumot olasiz  

Quyidagi menyudan kerakli bo‘limni tanlang 👇

        `,
      {
        reply_markup: {
          keyboard: [
            [{ text: "📚 Kurslar" }, { text: "✍️ Ro‘yxatdan o‘tish" }],
            [{ text: "ℹ️ Markaz haqida" }, { text: "💬 Fikr bildirish" }],
            [{ text: "❓ Yordam" }],
          ],
          resize_keyboard: true,
        },
      }
    );
  } else if (text == "📚 Kurslar") {
    bot.sendMessage(
      chatId,
      `🎓 Bizning o‘quv markazimizda quyidagi kurslar mavjud:

    1️⃣ Ingliz tili  
    2️⃣ Rus tili  
    3️⃣ Matematika  
    4️⃣ Dasturlash (Python, Web)  
    5️⃣ Grafik dizayn  
    
    👇 Quyidagi kurslardan birini tanlang va batafsil ma’lumot oling:
    `,
      {
        reply_markup: {
          inline_keyboard: [
            [{ text: "🇬🇧 Ingliz tili", callback_data: "english" }],
            [{ text: "🇷🇺 Rus tili", callback_data: "russian" }],
            [{ text: "🧮 Matematika", callback_data: "math" }],
            [{ text: "💻 Dasturlash", callback_data: "it" }],
            [{ text: "🎨 Grafik dizayn", callback_data: "design" }],
          ],
        },
      }
    );
  } else if (text == "✍️ Ro‘yxatdan o‘tish") {
    for (let tgUser of usersData) {
      if (tgUser.admin === true) {
        bot.sendMessage(
          tgUser.chatId,
          `Yangi xabar ✅\nUser: ${firstName}\nchatId: ${chatId}`
        );
      }
    }

    bot.sendMessage(
      chatId,
      `Ma'lumotlaringiz saqlandi va operatorlarimizga yuborildi ✅`
    );
  } else {
    bot.sendMessage(
      chatId,
      `
    ⚠️ Kechirasiz, men sizning xabaringizni tushunmadim.

Iltimos, quyidagi tugmani bosing 👇
/start

    `
    );
  }
});


bot.on("callback_query", (query) => {
  const chatId = query.message.chat.id;
  const data = query.data;

  if (data === "english") {
    bot.sendMessage(
      chatId,
      `
🇬🇧 <b>Ingliz tili kursi</b>

📅 Dars vaqti: 10:00 – 18:30  
📆 Davomiyligi: 1 yil 
💵 Oylik to‘lov: 350 000 so‘m  
👩‍🏫 O‘qituvchi: Malakali mutaxassis  
📶 Trafik: Cheksiz (online + offline)

📍 Manzil: Toshkent, Chilonzor tumani  
☎️ Aloqa: +998 90 123 45 67
      `,
      { parse_mode: "HTML" }
    );
  }

  if (data === "russian") {
    bot.sendMessage(
      chatId,
      `
🇷🇺 <b>Rus tili kursi</b>

📅 Dars vaqti: 19:30 – 21:00  
📆 Davomiyligi: 3 oy  
💵 Oylik to‘lov: 300 000 so‘m  
👩‍🏫 O‘qituvchi: Tajribali mutaxassis  
📶 Trafik: Cheksiz (online + offline)

📍 Manzil: Toshkent, Chilonzor tumani  
☎️ Aloqa: +998 90 123 45 67
      `,
      { parse_mode: "HTML" }
    );
  }

  // 🔄 Callback tugmachasini bosgandan keyin yuklanish belgisi yo‘qolsin
  bot.answerCallbackQuery(query.id);
});

console.log("🤖 Bot ishga tushdi...");
