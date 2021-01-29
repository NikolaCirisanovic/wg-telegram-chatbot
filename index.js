const { Telegraf, Markup } = require('telegraf')
require('dotenv').config()
const fs = require('fs');

module.exports = ({ reply }) => reply('42')


const token = process.env.BOT_TOKEN
if (token === undefined) {
  throw new Error('BOT_TOKEN must be provided!')
}

const keyboard = Markup.keyboard([
  Markup.button.pollRequest('Create poll', 'regular'),
  Markup.button.pollRequest('Create quiz', 'quiz')
])

const bot = new Telegraf(token)

bot.on('poll', (ctx) => console.log('Poll update', ctx.poll))
bot.on('poll_answer', (ctx) => console.log('Poll answer', ctx.pollAnswer))

bot.start((ctx) => ctx.reply('supported commands: /poll /quiz', keyboard))

bot.command('!poll', (ctx) =>
  ctx.replyWithPoll(
    'Who is your favorite roommate?',
    ["Nikola", "Nicknack", "Nikola the Great", "Nikola yeaaaah"],
    { is_anonymous: false }
  )
)
bot.command('!quiz', (ctx) =>
  ctx.replyWithQuiz(
    'Why is Freyja so cute?',
    ['Her paws', 'Her ears', 'All of above'],
    { correct_option_id: 2 }
  )
)

// Keyword Listener

bot.hears('/arno', (ctx) => ctx.reply("Arno: Look at me I'm Arno im gaaaaaaay Look at me I'm Arno im gaaaaaaay Look at me I'm Arno im gaaaaaaay Look at me I'm Arno im gaaaaaaay Look at me I'm Arno im gaaaaaaay"))
bot.hears('/natercia', (ctx) => ctx.reply("Natercia: Look at me im so woke af. I love my long masturba..meditation sessions."))
bot.hears('/bitch1', (ctx) => ctx.reply("Garonne: I'm just Arno's sex slave, nothing to see here."))
bot.hears('/bitch2', (ctx) => ctx.reply("Jacqueline: I eat my own pizza and blame on Chinese people"))
bot.hears('/nikola', (ctx) => ctx.reply("Nikola: Hello its me Nikola i have a prepuce on my Head, when you Touch it i will cum directly"))
bot.hears('/chingchong', (ctx) => ctx.replyWithPhoto('https://i.imgflip.com/twkma.jpg?a447408'))
bot.hears('/happyfamiry', (ctx) => ctx.replyWithPhoto({
    source: fs.createReadStream('pictures/happyfamiry.jpg')
  })
)
bot.hears('/rollthedice', (ctx) => ctx.replyWithDice())
bot.hears('/fart', (ctx) => ctx.replyWithAudio({
    source: fs.createReadStream('pictures/moan-bark-fart.mp3')
  })
)
bot.hears('/deutschland', (ctx) => ctx.replyWithAudio({
  source: fs.createReadStream('pictures/deutschland.mp3')
})
)

bot.hears('/daddy', (ctx) => ctx.replyWithAudio({
    source: fs.createReadStream('pictures/ohyesdaddy.mp3')
  })
)

bot.hears('/fuckmedaddy', (ctx) => ctx.replyWithAudio({
    source: fs.createReadStream('pictures/fuckmedaddy.mp3')
  })
)

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))