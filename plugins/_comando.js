const validCommand = (cmd, plugins) => {
    return Object.values(plugins).some(plugin => 
      plugin.command && (Array.isArray(plugin.command) ? plugin.command : [plugin.command]).includes(cmd)
    );
  };

  if (validCommand(command, global.plugins)) {
    let user = global.db.data.users[m.sender] || {};
    user.commands = (user.commands || 0) + 1;
    global.db.data.users[m.sender] = user; 
  } else {
    await m.reply(`《✧》El comando *${usedPrefix}${command}* no existe.\nPara ver la lista de comandos usa:\n» *${usedPrefix}help*`);
  }
}