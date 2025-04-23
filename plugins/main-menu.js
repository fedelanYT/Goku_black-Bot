import { promises } from 'fs'
import { join } from 'path'
import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'

// ==================== CONSTANTES ====================
const ownerNumber = ["51999999999@s.whatsapp.net"] // Reemplaza con tu número
const vcard = `BEGIN:VCARD\nVERSION:3.0\nFN:𝖿ᥱძᥱᥣᥲᥒ\nORG: Goku_Black-Bot;\nTEL;type=CELL;type=VOICE;waid=51999999999:+51 999 999 999\nEND:VCARD` // Actualiza tus datos

// URLs de medios
const thumbnailUrl = 'https://telegra.ph/file/327f6ad853cb4f405aa80.jpg'
const menuGifUrl = 'https://telegra.ph/file/327f6ad853cb4f405aa80.mp4'

// ==================== ETIQUETAS DEL MENÚ ====================
const tags = {
  'main': '𝙄𝙉𝙁𝙊-𝘽𝙊𝙏',
  'buscador': '𝘽𝙐𝙎𝘾𝘼𝘿𝙊𝙍𝙀𝙎',
  'fun': '𝙅𝙐𝙀𝙂𝙊𝙎',
  'jadibot': '𝙎𝙀𝙍𝘽𝙊𝙏',
  'rpg': '𝙍𝙋𝙂',
  'rg': '𝙍𝙀𝙂𝙄𝙎𝙏𝙍𝙊',
  'xp': '𝙀𝙓𝙋',
  'sticker': '𝙎𝙏𝙄𝘾𝙆𝙀𝙍𝙎',
  'anime': '𝘼𝙉𝙄𝙈𝙀𝙎',
  'database': '𝘿𝘼𝙏𝘼𝘽𝘼𝙎𝙀',
  'fix': '𝙁𝙄𝙓𝙈𝙀𝙉𝙎𝘼𝙅𝙀𝙎',
  'grupo': '𝙂𝙍𝙐𝙋𝙊𝙎',
  'nable': '𝙊𝙉 / 𝙊𝙁𝙁', 
  'descargas': '𝘿𝙚𝙨𝙘𝙖𝙧𝙜𝙖𝙨',
  'youtube': '𝙔𝙊𝙐𝙏𝙐𝘽𝙀',
  'tools': '𝙃𝙀𝙍𝙍𝘼𝙈𝙄𝙀𝙉𝙏𝘼𝙎',
  'info': '𝙄𝙉𝙁𝙊𝙍𝙈𝘼𝘾𝙄𝙊́𝙉',
  'nsfw': '𝙉𝙎𝙁𝙒', 
  'owner': '𝘾𝙍𝙀𝘼𝘿𝙊𝙍', 
  'mods': '𝙎𝙏𝘼𝙁𝙁',
  'audio': '𝘼𝙐𝘿𝙄𝙊𝙎', 
  'ai': '𝘼𝙄',
  'transformador': '𝘾𝙊𝙉𝙑𝙀𝙍𝙏𝙄𝘿𝙊𝙍𝙀𝙎',
}

// ==================== PLANTILLA DEL MENÚ ====================
const defaultMenu = {
  before: `╭══════════════ ⪩
“ HOLA¡ Hᴜᴍᴀɴᴏ ᴍɪ ɴᴏᴍʙʀᴇ ᴇs, *𝗚𝗼𝗸𝘂_𝗯𝗹𝗮𝗰𝗸-𝗕𝗼𝘁*, %greeting ”

╔══✦「 Info del Bot 」✦══╗
║ ✦ 👨🏻‍💻 Creador: 𝖿ᥱძᥱᥣᥲᥒ 🫆 
║ ✦ 🌀 Tipo Bot: 𝗚𝗼𝗸𝘂_𝗯𝗹𝗮𝗰𝗸-𝗕𝗼𝘁 🫆
║ ✦ 🚩 Modo: Público
║ ✦ 📚 Baileys: Multi Device
║ ✦ ⏱️ Tiempo Activo: %uptime
║ ✦ 👤 Usuarios registrados: %totalreg
╚═════════════════════✦
%readmore
╔══✦「 Info del Usuario 」✦══╗
║ ✧ 💌 Cliente: %name
║ ✧ ⚡ Experiencia: %exp
║ ✧ 🍪 cookies: %estrellas
║ ✧ 🫧 Nivel: %level
║ ✧ 🛡️ Rango: %role
╚═════════════════════✦

%readmore
*☆─ׅ─ׄ★─ׅ─ׄ✮─ׅ─ׄ★─ׅ─ׄ☆─ׅ─ׄ☆─ׅ─ׄ★─ׅ─ׄ✮─ׅ─ׄ★─ׅ─ׄ☆*

\t*𝗟𝗜𝗦𝗧𝗔 𝗗𝗘 𝗖𝗢𝗠𝗔𝗡𝗗𝗢𝗦* 
`.trimStart(),
  header: '.    ╭─◉⧫┈⎯🫧⦿𖠙✦⧫◉─╮\n╭╼⬪࣪ꥈ𑁍⃪࣭۪ٜ݊݊݊݊݊໑ٜ࣪ %category ໑⃪࣭۪ٜ݊݊݊݊𑁍ꥈ࣪⬪\n┃֪࣪   ╰─◉⧫┈⎯🫧❈⧫⎯◉─╯',
  body: '├ׁ̟̇❍✎ %cmd\n',
  footer: '╚═⎯⧫❈⠄⭎⧫❈⠄⭎⧫❈⠄⭎⧫❈⎯═╝\n',
  after: `> © 𝖿ᥱძᥱᥣᥲᥒ - 2024`
}

// ==================== FUNCIÓN PRINCIPAL ====================
let handler = async (m, { conn, usedPrefix: _p, __dirname }) => {
  try {
    // Obtener datos del usuario
    let { exp, estrellas, level, role } = global.db.data.users[m.sender]
    let { min, xp, max } = xpRange(level, global.multiplier)
    let name = await conn.getName(m.sender)
    
    // Información de fecha y hora
    let d = new Date()
    let locale = 'es'
    let time = d.toLocaleTimeString(locale, { hour: 'numeric', minute: 'numeric', second: 'numeric' })
    
    // Estadísticas del bot
    let _uptime = process.uptime() * 1000
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    
    // Generar el menú
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        estrellas: plugin.estrellas,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    
    // Construir texto del menú
    let text = [
      defaultMenu.before,
      ...Object.keys(tags).map(tag => {
        return defaultMenu.header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return defaultMenu.body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                .replace(/%isdiamond/g, menu.diamond ? '(ⓓ)' : '')
                .replace(/%isPremium/g, menu.premium ? '(Ⓟ)' : '')
                .trim()
            }).join('\n')
          }),
          defaultMenu.footer
        ].join('\n')
      }),
      defaultMenu.after
    ].join('\n')
    
    // Reemplazar variables
    let replace = {
      '%': '%',
      p: _p, 
      uptime,
      me: conn.getName(conn.user.jid),
      taguser: '@' + m.sender.split("@s.whatsapp.net")[0],
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp,
      level, 
      estrellas, 
      name, 
      time, 
      totalreg,
      role,
      greeting: getGreeting(),
      readmore: readMore
    }
    
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])

    // Enviar menú con GIF
    await conn.sendMessage(
      m.chat,
      { 
        video: { url: menuGifUrl }, 
        caption: text.trim(),
        gifPlayback: true,
        contextInfo: {
          mentionedJid: [m.sender],
          forwardingScore: 999,
          isForwarded: true,
          externalAdReply: {
            title: '𝗚𝗼𝗸𝘂_𝗯𝗹𝗮𝗰𝗸-𝗕𝗼𝘁',
            body: `Hola ${name}`,
            thumbnailUrl: thumbnailUrl,
            sourceUrl: 'https://wa.me/' + ownerNumber[0].split('@')[0],
            mediaType: 1
          }
        }
      },
      { quoted: m }
    )
    
    await m.react('🫧')

  } catch (e) {
    console.error(e)
    await conn.reply(m.chat, '❌ Ocurrió un error al mostrar el menú', m)
  }
}

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

function getGreeting() {
  const hour = new Date().getHours()
  if (hour >= 0 && hour < 6) return 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 🌙'
  if (hour >= 6 && hour < 12) return 'Bᴜᴇɴᴏs Dɪᴀs 🌅'
  if (hour >= 12 && hour < 18) return 'Bᴜᴇɴᴀs Tᴀʀᴅᴇs 🌇'
  return 'Bᴜᴇɴᴀs Nᴏᴄʜᴇs 🌃'
}

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu', 'menú', 'menuall', 'allmenú', 'allmenu', 'menucompleto'] 
handler.register = true

export default handler
