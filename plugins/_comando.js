import d from 'didyoumean';
import s from 'similarity';

export async function b(m, { c, m: match, p: usedPrefix, cmd: command }) {
    if (usedPrefix === (match[0] || '')[0]) {
        let np = m.text.replace(usedPrefix, '');
        let a = np.trim().split(' ').slice(1);
        let h = Object.values(plugins).filter(v => v.help && !v.disabled).map(v => v.help).flat(1);

        if (h.includes(np)) return;

        let m = d(np, h);
        let si = s(np, m);
        let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? c.user.jid : m.sender;
        let n = await c.getName(who);
        let cap = `《✧》El comando *${usedPrefix}${command}* no existe.\nPara ver la lista de comandos usa:\n» *${usedPrefix}help*`;

        if (m) c.reply(m.chat, cap, m, { mentions: [who] });
    }

    const vC = (cmd, p) => {
        return Object.values(p).some(plugin => 
            plugin.command && (Array.isArray(plugin.command) ? plugin.command : [plugin.command]).includes(cmd)
        );
    };

    if (vC(command, global.plugins)) {
        let u = global.db.data.users[m.sender] || {};
        u.commands = (u.commands || 0) + 1;
        global.db.data.users[m.sender] = u; 
    } else {
        await m.reply(`《✧》El comando *${usedPrefix}${command}* no existe.\nPara ver la lista de comandos usa:\n» *${usedPrefix}help*`);
    }
}