const handler = async (m, {conn}) => {
  m.reply(global.verreg);
};
handler.command = ['verreg']
export default handler;

global.verreg = `*Mira aquí tu reg 👇*
https://whatsapp.com/channel/0029Vb5oaHFCBtxIGWefdp0n
No olvides de seguir el canal 💞`;
