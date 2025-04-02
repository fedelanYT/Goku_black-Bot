import fetch from 'node-fetch';

let handler = async (m, { conn, args, command }) => {

if (!args[0]) return m.reply(`「✦」 Ingresa Un Link De YouTube.`);

let black = await(await fetch(`https://delirius-apiofc.vercel.app/download/ytmp4?url=${args[0]}`)).json();

let texto = `GOKU-BLACK-BOT-MD 
${black.data.title}\n\n✰ *Autor:* ${black.data.author}\n✰ *Duración:* ${black.data.duration}\n✰ *Comentarios:* ${black.data.comments}\n✰ *Vistas:* ${black.data.views}\n> ${dev}`

m.react('🍆')
conn.sendMessage(m.chat, { image: { url: black.data.image }, caption: texto }, { quoted: m });
m.react('✅');

if (command == 'ytmp3doc' || command == 'mp3doc' || command == 'ytadoc') {
let api = await(await fetch(`https://dark-core-api.vercel.app/api/download/YTMP3?key=dk-vip&url=${args[0]}`)).json();

if (!api?.download) return m.reply('No Se  Encontraron Resultados');

await conn.sendMessage(m.chat, { document: { url: api.download }, mimetype: 'audio/mpeg', fileName: `${api.title}.mp3` }, { quoted: m });
 }

if (command == 'ytmp4doc' || command == 'mp4doc' || command == 'ytvdoc') {
let video = await (await fetch(`https://api.fgmods.xyz/api/downloader/ytmp4?url=${args[0]}&quality=480p&apikey=elrebelde21`)).json();

let link = video?.result.dl_url;

if (!link) return m.reply('No Hubo Resultados');

await conn.sendMessage(m.chat, { document: { url: link }, fileName: `${video.result.title}.mp4`, caption: `> ${wm}`, mimetype: 'video/mp4' }, { quoted: m })    
   }
}

handler.help = ['ytmp4doc'];
handler.tag = ['descargas'];
handler.command = ['ytmp3doc', 'ytmp4doc'];

export default handler;