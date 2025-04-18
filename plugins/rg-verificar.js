import axios from 'axios'
import { createHash } from 'crypto'
import PhoneNumber from 'awesome-phonenumber'
import moment from 'moment-timezone'

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let handler = async function (m, { conn, text, args, usedPrefix, command }) {
    let user = global.db.data.users[m.sender]
    let name2 = conn.getName(m.sender)
    let whe = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender
    let perfil = await conn.profilePictureUrl(whe, 'image').catch(_ => 'https://telegra.ph/file/0bb7e9e7c8cb4e820f1fe.jpg')

    if (user.registered === true) {
        return m.reply(`*『✦』Ya estás registrado, para volver a registrarte, usa el comando: #unreg*`)
    }

    if (!Reg.test(text)) return m.reply(`*『✦』El comando ingresado es incorrecto, uselo de la siguiente manera:*\n\n#reg *Nombre.edad*\n\n\`\`\`Ejemplo:\`\`\`\n#reg *${name2}.18*`)

    let [_, name, splitter, age] = text.match(Reg)
    if (!name) return m.reply('*『✦』No puedes registrarte sin nombre, el nombre es obligatorio. Inténtelo de nuevo.*')
    if (!age) return m.reply('*『✦』No puedes registrarte sin la edad, la edad es opcional. Inténtelo de nuevo.*')
    if (name.length >= 100) return m.reply('*『✦』El nombre no debe tener más de 30 caracteres.*')

    age = parseInt(age)
    if (age > 1000) return m.reply('⏤͟͟͞͞𝑳𝒂 𝑬𝒅𝒂𝒅 𝒊𝒏𝒈𝒓𝒆𝒔𝒂𝒅𝒂 𝑬𝒔 𝒊𝒏𝒄𝒐𝒓𝒓𝒆𝒄𝒕𝒂⏤͟͟͞͞')
    if (age < 5) return m.reply('⏤͟͟͞͞𝑳𝒂 𝑬𝒅𝒂𝒅 𝒊𝒏𝒈𝒓𝒆𝒔𝒂𝒅𝒂 𝑬𝒔 𝒊𝒏𝒄𝒐𝒓𝒓𝒆𝒄𝒕𝒂⏤͟͟͞͞')

    user.name = name.trim()
    user.age = age
    user.regTime = +new Date
    user.registered = true
    global.db.data.users[m.sender].money += 600
    global.db.data.users[m.sender].estrellas += 10
    global.db.data.users[m.sender].exp += 245
    global.db.data.users[m.sender].joincount += 5    

    let who;
    if (m.quoted && m.quoted.sender) {
        who = m.quoted.sender;
    } else {
        who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
    }

let sn = createHash('md5').update(m.sender).digest('hex');
let regbot = `
╔═̴̸᪳᷍═̷✩⃢̴═⃨⃜═̶⃕╡̴˚̸᪵✧̷⃘⃛᪻᪻᪻᷼᷍✧̵⃨˚̷᪵╞̶⃔══⃢̸⃨⃜✩̷══̸͜͞═̸̸̸᪳͟╗
𝐑𝐄𝐆𝐈𝐒𝐓𝐑𝐎 𝐂𝐎𝐌𝐏𝐋𝐄𝐓𝐎 𝐄𝐗𝐈𝐓𝐎𝐒𝐎
╚̷͓═̴̸᪳᷍═̷✩⃢̴═⃨⃜═̶⃕╡̴˚̸᪵✧̷⃘⃛᪻᪻᪻᷼᷍✧̵⃨˚̷᪵╞̶⃔══⃢̸⃨⃜✩̷══̸͜͞═̸̸̸᪳͟╝

﹏͜͡﹏͜͡﹏͜͡﹏͜͡﹏͜͡﹏͜͡﹏͜͡﹏͜͡﹏͜͡﹏͜͡﹏͜͡﹏͜͡﹏͜͡﹏͜͡﹏͜͡﹏͜͡﹏͜͡﹏͜͡
*‧˚꒰🫧꒱༘‧: 𝐍𝐨𝐦𝐛𝐫𝐞:* ${name}
*‧˚꒰🔍꒱༘‧: 𝐄𝐝𝐚𝐝:* ${age}
꒰꛱ ͜ ꛱|꛱ ꛱͜ |꛱ ꛱͜ |꛱ ͜ ꛱|꛱ ͜ |୨🌔🏮୧꛱|꛱ ꛱͜ |꛱ ͜ ꛱ |꛱ ͜ ꛱|꛱ ꛱͜ |꛱ ͜ ꒱
*「💥」𝐑𝐞𝐜𝐨𝐦𝐩𝐞𝐧𝐬𝐚𝐬:*
ᦷᩘᦷ     ݂   🍅 ፡ Estrellas 🌟
ᦷᩘᦷ     ݂   🎴  ፡ 5 Blackcoins 🪙
ᦷᩘᦷ     ݂   🍅 ፡ 245 Experiencia 💸
ᦷᩘᦷ     ݂   🎴  ፡ 12 Tokens 💰
﹏͜͡﹏͜͡﹏͜͡﹏͜͡﹏͜͡﹏͜͡﹏͜͡﹏͜͡﹏͜͡﹏͜͡﹏͜͡﹏͜͡﹏͜͡﹏͜͡﹏͜͡﹏͜͡

 🍫 Usᥲ *#perfil* ⍴ᥲrᥲ ᥎ᥱr 𝗍ᥙ ⍴ᥱr𝖿іᥣ.
*usa el comando .menu para ver el menú y .verreg para ver tu verificación*

> (˶ᵔ ᵕ ᵔ˶) Recuerda seguír el canal de Goku black bot para estar al tanto de avisos y novedades del Bot 🔥
`

await conn.sendMessage(m.chat, {
    text: regbot,
    contextInfo: {
        externalAdReply: {
            title: '⊱『✅𝆺𝅥 𝗥𝗘𝗚𝗜𝗦𝗧𝗥𝗔𝗗𝗢(𝗔) 𝆹𝅥✅』⊰',
            thumbnailUrl: 'https://telegra.ph/file/0bb7e9e7c8cb4e820f1fe.jpg',
            mediaType: 1,
            body: 'El Bot Más Good ☄'
        }
    }
}, { quoted: m });



/*    await m.react('📪')
  await conn.sendMessage(m.chat, {
           text: regbot, 
        contextInfo: {
            externalAdReply: {
                showAdAttribution: true,                      
                containsAutoReply: true,
                title: '⊱『✅𝆺𝅥 𝗥𝗘𝗚𝗜𝗦𝗧𝗥𝗔𝗗𝗢(𝗔) 𝆹𝅥✅』⊰',  
                body: dev,  
                containsAutoReply: true,
                showAdAttribution: true,
                mediaType: 1, 
                thumbnailUrl: 'https://telegra.ph/file/0bb7e9e7c8cb4e820f1fe.jpg' }}}, {quoted: m})
*/

let chtxt = `ੈ₊˚༅༴│↷◌⁺˖ 🌸 *𝐆𝐎𝐊𝐔 - 𝐁𝐋𝐀𝐂𝐊* 🌸
🔥ੈ₊˚༅༴│.👥 *𝚄𝚜𝚎𝚛* » ${m.pushName || 'Anónimo'}  
🔥ੈ₊˚༅༴│.📇 *𝚅𝚎𝚛𝚒𝚏𝚒𝚌𝚊𝚌𝚒𝚘́𝚗* » ${user.name}  
🔥ੈ₊˚༅༴│.🍰 *𝙴𝚍𝚊𝚍* » ${user.age} años  
🔥ੈ₊˚༅༴│.⌨️ *𝙳𝚎𝚜𝚌𝚛𝚒𝚙𝚌𝚒𝚘𝚗* » ${user.descripcion}  
🔥ੈ₊˚༅༴│.🍬 *𝙽𝚞𝚖𝚎𝚛𝚘 𝚍𝚎 𝚛𝚎𝚐𝚒𝚜𝚝𝚛𝚘* »
⤷ ${sn}`;

    let channelID = '120363400708262483@newsletter';
        await conn.sendMessage(channelID, {
        text: chtxt,
        contextInfo: {
            externalAdReply: {
                title: "୧⍤⃝💐 𝐑͜͡𝐄͜͡𝐆͜͡𝐈͜͡𝐒͜͡𝐓͜͡𝐑͜͡𝐎͜͡  𝘾𝙊⃟𝙈𝙋𝙇𝙀᪵᪺𝙏⃨𝙊 ❛░⃟ ⃟°˟̫̫",
                body: '☠️ 𝑱𝒂𝒋𝒂, 𝒖𝒏 𝒏𝒖𝒆𝒗𝒐 𝒉𝒖𝒎𝒂𝒏𝒐 𝒆𝒏 𝒎𝒊 𝒃𝒂𝒔𝒆 𝒅𝒆 𝒅𝒂𝒕𝒐𝒔!',
                thumbnailUrl: perfil,
                sourceUrl: redes,
                mediaType: 1,
                showAdAttribution: false,
                renderLargerThumbnail: false
            }
        }
    }, { quoted: null });
};

handler.help = ['reg']
handler.tags = ['rg']
handler.command = ['verify', 'verificar', 'reg', 'register', 'registrar']

export default handler
