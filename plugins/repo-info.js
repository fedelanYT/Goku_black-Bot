import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, command }) => {
    const githubRepoURL = 'https://github.com/fedelanYT/Goku_black-Bot';

    try {
        const [, username, repoName] = githubRepoURL.match(/github\.com\/([^/]+)\/([^/]+)/);
        const response = await fetch(`https://api.github.com/repos/${username}/${repoName}`);

        if (!response.ok) {
            throw new Error(`La solicitud a la API de GitHub falló con el estado ${response.status}`);
        }

        const repoData = await response.json();
        let Codes = '`📂  I N F O R M A C I Ó N  D E  R E P O S I T O R I O`\n\n';
        Codes += `    ✩  *NOMBRE DEL BOT* : ${repoData.name}\n`;
        Codes += `    ✩  *NOMBRE DEL PROPIETARIO* : ${repoData.owner.login}\n`;
        Codes += `    ✩  *ESTRELLAS* : ${repoData.stargazers_count}\n`;
        Codes += `    ✩  *FORKS* : ${repoData.forks_count}\n`;
        Codes += `    ✩  *ENLACE DE GITHUB* : ${repoData.html_url}\n`;
        Codes += `    ✩  *DESCRIPCIÓN* : ${repoData.description || 'Sin descripción disponible'}\n\n`;
        Codes += `*¡No olvides darle una estrella y hacer fork al repositorio!*\n\n`;
        Codes += `> *Código creado por fedelan y terminado por José Elver*`;

        await conn.sendMessage(m.chat, {
            image: { url: 'https://files.catbox.moe/zhxljj.jpg' },
            caption: Codes,
            contextInfo: { 
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363400708262483@newsletter',
                    newsletterName: 'Power by fedelan',
                    serverMessageId: 143
                }
            }
        }, { quoted: m });

        await conn.sendMessage(m.chat, {
            audio: { url: 'https://github.com/JawadYTX/KHAN-DATA/raw/refs/heads/main/autovoice/repo.m4a' },
            mimetype: 'audio/mp4',
            ptt: true,
            contextInfo: { 
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363400708262483@newsletter',
                    newsletterName: 'Power by fedelan',
                    serverMessageId: 143
                }
            }
        }, { quoted: m });

    } catch (error) {
        await conn.reply(m.chat, "Lo siento, ocurrió un error al obtener la información del repositorio. Por favor, intenta de nuevo más tarde.", m);
    }
}

handler.tags = ['info'];
handler.help = ['repo', 'sc', 'script', 'info'];
handler.command = ['repo', 'sc', 'script', 'info'];
handler.register = true;

export default handler;
