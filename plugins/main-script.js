import { promises } from 'fs'
import { join } from 'path'

let handler = async function (m, { conn, __dirname }) {
let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
  
m.reply(`
*≡ SCRIPT🌟*

▢ Git : 
https://github.com/fedelanYT/Goku_black-Bot
> la nueva versión es privada.`.trim())
    
}

handler.help = ['script']
handler.tags = ['tools']
handler.command = ['sc', 'git', 'script'] 

export default handler
