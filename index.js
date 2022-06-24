const TelegramBot = require("node-telegram-bot-api");
var translate = require("translation-google");
const emoji = require("node-emoji").emoji;
require("dotenv").config();

const bot = new TelegramBot(process.env.TOKEN, { polling: true });
bot.on("message", async (msg) => {
  let chatId = msg.chat.id;
  let msgId = msg.message_id;
  let text = msg.text;
  try {
    if (text == "/start") {
      await bot.sendMessage(
        chatId,
        `Assalamu alaykum ${msg.from.first_name}. Google Tarjimon dan foydalaning va istagan so'zingizni boshqa tillarga tarjima qiling!`
      );
    } else if (text && text !== "/start") {
      await bot.sendMessage(chatId, "Tarjima turini tanlang: ", {
        reply_to_message_id: msgId,
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: `${emoji["flag-uz"]} UZB`,
                callback_data: "uz",
              },
            ],
            [
              {
                text: ` ${emoji["flag-ru"]} RUSSIAN`,
                callback_data: "ru",
              },
              {
                text: `${emoji["flag-us"]} ENGLISH`,
                callback_data: "en",
              },
              {
                text: `${emoji["flag-it"]} ITALIYA`,
                callback_data: "it",
              },
            ],
            [
              {
                text: `${emoji["flag-kr"]} KOREAN`,
                callback_data: "ko",
              },
              {
                text: `${emoji["flag-tj"]} TAJIK`,
                callback_data: "tg",
              },
              {
                text: `${emoji["flag-ae"]} ARABIC`,
                callback_data: "ar",
              },
            ],
          ],
        },
      });
    }
  } catch (err) {
    await bot.sendMessage(chatId, err.message);
  }
});

bot.on("callback_query", async (query) => {
  let data = query.data;
  let chatId = query.from.id;
  try {
    if (data == "ru") {
      let text = query.message.reply_to_message.text;
      const translation = await translate(text, { from: "auto", to: "ru" });
      bot.sendMessage(chatId, translation.text);
    }
    if (data == "it") {
      let text = query.message.reply_to_message.text;
      const translation = await translate(text, { from: "auto", to: "it" });
      bot.sendMessage(chatId, translation.text);
    }
    if (data == "ko") {
      let text = query.message.reply_to_message.text;
      const translation = await translate(text, { from: "auto", to: "ko" });
      bot.sendMessage(chatId, translation.text);
    }
    if (data == "tg") {
      let text = query.message.reply_to_message.text;
      const translation = await translate(text, { from: "auto", to: "tg" });
      bot.sendMessage(chatId, translation.text);
    }
    if (data == "ar") {
      let text = query.message.reply_to_message.text;
      const translation = await translate(text, { from: "auto", to: "ar" });
      bot.sendMessage(chatId, translation.text);
    }
    if (data == "uz") {
      let text = query.message.reply_to_message.text;
      const translation = await translate(text, { from: "auto", to: "uz" });
      bot.sendMessage(chatId, translation.text);
    } else if (data == "en") {
      let text = query.message.reply_to_message.text;
      const translation = await translate(text, { from: "auto", to: "en" });
      bot.sendMessage(chatId, translation.text);
    }
  } catch (err) {
    await bot.sendMessage(chatId, err.message);
  }
});
