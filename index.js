const mineflayer = require("mineflayer");

let bot = mineflayer.createBot({
  host: "MundoReliquia2.aternos.me",
  port: 54518,
  username: "Technoblade",
  version: false,
});

function getCurrentTime() {
  const now = new Date();
  return now.toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
}

// Mensagens de inicialização
bot.on("login", () => {
  console.log(`[${getCurrentTime()}] Bot logado como ${bot.username}`);
});

// Movimento contínuo
bot.on("spawn", () => {
  setInterval(() => {
    const yaw = Math.random() * Math.PI * 2; // Gira aleatoriamente
    const pitch = (Math.random() - 0.5) * Math.PI; // Move a câmera
    bot.look(yaw, pitch, true);

    // Andar em direções aleatórias
    const directions = ["forward", "back", "left", "right"];
    const direction = directions[Math.floor(Math.random() * directions.length)];
    bot.setControlState(direction, true);
    setTimeout(() => bot.setControlState(direction, false), 2000); // Para após 2s
  }, 3000); // Movimento a cada 3 segundos
});

// Mensagens de erro ou desconexão
bot.on("kicked", (reason) => {
  console.log(`[${getCurrentTime()}] Bot foi expulso: ${reason}`);
});
bot.on("error", (err) => console.log(`[${getCurrentTime()}] Erro: ${err}`));
bot.on("end", () => {
  console.log(`[${getCurrentTime()}] O servidor caiu ou foi desligado.`);
  console.log("Tentando reconectar em 5 segundos...");
  setTimeout(() => {
    bot = mineflayer.createBot({
      host: "MundoReliquia2.aternos.me",
      port: 54518,
      username: "Technoblade",
      version: false,
    });
  }, 5000);
});

bot.on("playerJoined", (player) => {
  console.log(`[${getCurrentTime()}] Jogador entrou: ${player.username}`);
});

// Detectar a saída de um jogador
bot.on("playerLeft", (player) => {
  console.log(`[${getCurrentTime()}] Jogador saiu: ${player.username}`);
});
