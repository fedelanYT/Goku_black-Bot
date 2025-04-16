let handler = async (m, { conn, command, usedPrefix }) => {
let staff = `🚩 *EQUIPO DE AYUDANTES*
🍟 *Bot:* ${global.botname}
✨️ *Versión:* ${global.vs}

👑 *Propietario:*

• Fedelan 
🍟 *Rol:* Propietario
🚩 *Número:* Wa.me/5491156178758'
✨️ *GitHub:* https://github.com/fedelanYT 

🌸  *Colaboradores:*

• love956
🍟 *Rol:* Developer
🚩 *Número:* Wa.me/13124976342'

• Fedelan
🍟 *Rol:* Developer
🚩 *Número:* Wa.me/5491126852241`

await conn.sendFile(m.chat, icons, 'yaemori.jpg', staff.trim(), fkontak, true, {
contextInfo: {
'forwardingScore': 200,
'isForwarded': false,
externalAdReply: {
showAdAttribution: true,
renderLargerThumbnail: false,
title: `🥷 Developers 👑`,
body: `🚩 Staff Oficial`,
mediaType: 1,
sourceUrl: redes,
thumbnailUrl: icono
}}
}, { mentions: m.sender })
m.react(emoji)

}
handler.help = ['staff']
handler.command = ['colaboradores', 'staff']
handler.register = true
handler.tags = ['main']

export default handler
