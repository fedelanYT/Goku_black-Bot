/*codigo creado por Jose Mods 
dejen creditos no sean ratas y traído por Rayo-ofc*/
import axios from 'axios';

const ddownr = {
  download: async (query) => {
    const apiUrl = `https://carisys.online/api/downloads/youtube/play?query=${encodeURIComponent(query)}`;

    try {
      const response = await axios.get(apiUrl);

      if (response.data.status) {
        const { resultado } = response.data;
        return {
          title: resultado.titulo,
          duration: resultado.tempo,
          views: resultado.views,
          audio: resultado.audio,
          thumbnail: resultado.imagem,
        };
      } else {
        throw new Error('La API devolvió un estado no exitoso.');
      }
    } catch (error) {
      console.error('Error al descargar:', error);
      throw error;
    }
  }
};

const handler = async (m, { conn, text }) => {
  try {
    if (!text.trim()) {
      return conn.reply(m.chat, `🌹 Ingresa el nombre de la música a descargar.`, m);
    }

    const videoInfo = await ddownr.download(text);

    const infoMessage = '`乂  Y O U T U B E  -  D O W N L O A D`\n\n' +
                        `    ✩   *Título* : ${videoInfo.title}\n` +
                        `    ✩   *Duración* : ${videoInfo.duration}\n` +
                        `    ✩   *Vistas* : ${formatViews(videoInfo.views)}\n` +
                        '> *- ↻ Enviando su audio como documento. Espere un momento...*';

    const thumb = (await conn.getFile(videoInfo.thumbnail))?.data;

    await conn.sendFile(m.chat, thumb, 'thumbnail.jpg', infoMessage, m);

    await conn.sendMessage(m.chat, { 
      document: { url: videoInfo.audio }, 
      mimetype: "audio/mpeg", 
      fileName: `${videoInfo.title}.mp3`
    }, { quoted: m });

  } catch (error) {
    return m.reply(`⚠️ *Error:* ${error.message}`);
  }
};

handler.command = handler.help = ['ytmp3doc', '2ytmp3'];
handler.tags = ['downloader'];

export default handler;

function formatViews(views) {
  return views.toLocaleString(); 
}