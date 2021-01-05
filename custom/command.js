const Discord = require("discord.js");
const config = require("../config.json");

module.exports = async (bot) => {
    bot.on("message", async (message) => {
        if(message.author.bot) return;
        let prefix = config.prefix;
        let messageArray = message.content.split(" ")
        let cmd = messageArray[0].replace(prefix, "");
        let args = messageArray.slice(1);
        if(!message.content.startsWith(prefix)) return;

        if(cmd === "") { // Add the name of your custom command here
            bot.logCommand(cmd)
            if(message.deletable) {
                message.delete();
            }
            // Add command code here
        }
    })
}