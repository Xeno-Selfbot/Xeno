const Discord = require("discord.js");
const moment = require("moment");
const colors = require("colors");
const axios = require("axios").default;
const title = require("console-title");
const fetch = require("node-fetch");
const figlet = require("figlet");
const config = require("./config.json");
const superagent = require("superagent");
const bot = new Discord.Client();
const { color, image, footer, enabled } = config.embedOptions;
const { post } = require("node-superfetch");
const { stripIndents } = require("common-tags");

const selfbot = {
    version: "1.0.0",
    name: "Cryptic"
}

// Process
process.on("unhandledRejection", error => console.log(`${colors.red("[ERROR]:")} ${colors.yellow(error.message)}`))
process.on("uncaughtExceptionMonitor", error => console.log(`${colors.red("[ERROR]:")} ${colors.yellow(error.message)}`))
process.on("uncaughtException", error => console.log(`${colors.red("[ERROR]:")} ${colors.yellow(error.message)}`))
// Process

bot.snipes = new Map()

console.clear()
title(`[${selfbot.name} v${selfbot.version}] Loading...`)
console.log("Logging in, please wait...")
bot.on("ready", () => {
    console.clear()
    title(`[${selfbot.name} v${selfbot.version}] Logged in as ${bot.user.username}`)
    let nitroSniper = "";
    if(config.nitro_sniper === false) {
        nitroSniper = colors.red("Disabled")
    } else if(config.nitro_sniper === true) {
        nitroSniper = colors.green("Enabled")
    }
    console.log(`
    ${colors.cyan(`
                    ____                  _   _      
                   / ___|_ __ _   _ _ __ | |_(_) ___ 
                  | |   | '__| | | | '_ \\| __| |/ __|
                  | |___| |  | |_| | |_) | |_| | (__ 
                   \\____|_|   \\__, | .__/ \\__|_|\\___|
                              |___/|_|  
    `)}             

                    ${colors.cyan(selfbot.name)} ${colors.yellow(`v${selfbot.version}`)} ${colors.magenta("|")} ${colors.cyan("Logged in as")} ${colors.yellow(bot.user.tag)} ${colors.magenta("|")} ${colors.cyan("ID:")} ${colors.yellow(bot.user.id)}
                    ${colors.cyan("Nitro Sniper?")} ${nitroSniper}
                    ${colors.cyan("Prefix:")} ${colors.yellow(`${config.prefix}`)}
    `)
})

bot.on("message", async message => {
    if(message.author.bot) return;
    let prefix = config.prefix;
    let messageArray = message.content.split(" ")
    let cmd = messageArray[0].replace(prefix, "");
    let args = messageArray.slice(1);
    if(!message.content.startsWith(prefix)) return;

    if(config.whitelisted.includes(message.author.id) || message.author.id === bot.user.id) {
    
    // Selfbot commands
    if(cmd === "rainbowrole") {
        if(message.deletable) {
            message.delete()
        }
        const role = message.guild.roles.get(args[0])
        if(!role) return message.channel.send("Please specify a role id.")
        setInterval(() => {
            role.edit({
                color: "RANDOM"
            })
        })
    }

    if(cmd === "cls") {
        if(message.deletable) {
            message.delete()
        }
        console.clear()
    }

    if(cmd === "snipe") {
        if(message.deletable) {
            message.delete()
        }
        const snipes = bot.snipes.get(message.channel.id) || [];
        const msg = snipes[args[0]-1||0]
        if(!msg) return message.channel.send("❌ There's nothing to snipe!")
        if(enabled === true) {
            let embed = new Discord.RichEmbed()
            .setAuthor(msg.author.tag, msg.author.displayAvatarURL)
            .setDescription(`${msg.content}
        
            **Date:** ${msg.date}
            **Page:** ${args[0]||1}/${snipes.length}
            `)
            .setThumbnail(image ? image : null)
            .setColor(color ? color : null)
            .setFooter(footer ? footer : null)
            if(msg.attachment) {
                embed.setImage(msg.attachment)
            }
            message.channel.send(embed)
        } else {
            message.channel.send(`\`\`
            ${msg.author.tag}

            ${msg.content}

            Date: ${msg.date}
            Page: ${args[0]||1}/${snipes.length}${footer ? `\n\n${footer}` : null}
            \`\``)
        }
    }

    if(cmd === "eval") {
        if(message.deletable) {
            message.delete()
        }
        const msg = message;

        try {
            let code = args.join(" ");
            code = code.replace(/[“”]/g, '"').replace(/[‘’]/g, "'");
            if (!code) return msg.channel.send("Please input the code.");
            let evaled;

            evaled = eval(code);

            if(typeof evaled !== "string") evaled = require("util").inspect(evaled, {depth: 0});

            let output = clean(evaled)
            if (output.length > 1024) {
                const {body} = await post("https://hastebin.com/documents").send(output);
                msg.channel.send("```js\n" + `https://hastebin.com/${body.key}.js` + "```")
            } else {
                msg.channel.send("```js\n" + output + "```")
            }

        } catch (error) {
            let err = clean(error);
            if (err.length > 1024) {
            const {body} = await post("https://hastebin.com/documents").send(err);
            msg.channel.send("```js\n" + `https://hastebin.com/${body.key}.js` + "```")
        } else {
            msg.channel.send("```js\n" + err + "```")
        }
    }

    function clean(string) {
        if(typeof string === "string") {
          return string.replace(/`/g, "`" + String.fromCharCode(8203))
          .replace(/@/g, "@" + String.fromCharCode(8203))
          .replace(new RegExp(config.token, "gi"), "*".repeat(config.token.length))
        } else {
          return string;
        }
      }
    }

    if(cmd === "clean") {
        let count = parseInt(args[0] || 1);
        message.channel.fetchMessages({limit: 100}).then(async(messages) => {
            let msgArray = messages.array();
            msgArray = msgArray.filter(m => m.author.id === bot.user.id);
            msgArray.length = count + 1;
            msgArray.map(m => m.delete().catch((err) => {
                message.channel.send("`ERROR`\n```js\n" + err + "\n```")
            }))
        })
    }

    if(cmd === "emojify") {
        if(message.deletable) {
            message.delete()
        }
        const mapping = {
            " ": " ",
            "0": ":zero:",
            "1": ":one:",
            "2": ":two:",
            "3": ":three:",
            "4": ":four:",
            "5": ":five:",
            "6": ":six:",
            "7": ":seven:",
            "8": ":eight:",
            "9": ":nine:",
            "!": ":grey_exclamation:",
            "?": ":grey_question:",
            "#": ":hash:",
            "*": ":asterisk:",
        };

        "abcdefghijklmnopqrstuvwxyz".split("").forEach(c => {
            mapping[c] = mapping[c.toUpperCase()] = `:regional_indicator_${c}:`;
        });

        if(args.length < 1){
            message.channel.send("Please specify a message to emojify")
        }
        message.channel.send(args.join(" ").split("").map(c => mapping[c] || c).join(""))
    }

    if(cmd === "cb") {
        if(message.deletable) {
            message.delete()
        }
        message.channel.startTyping();
        try {
            const response = await fetch(`https://some-random-api.ml/chatbot?message=${encodeURIComponent(args.join(" "))}`)
            const json = await response.json()
            message.channel.send(`> ${args.join(" ")}\n${message.author} ${json.response}`)
            message.channel.stopTyping(true);
        } catch (err) {
            message.channel.stopTyping(true);
            return message.channel.send("`ERROR`\n```js\n" + err.stack + "\n```")
        }
    }

    if(cmd === "say") {
        if(message.deletable) {
            message.delete()
        }
        message.channel.send(args.join(" "))
    }

    if(cmd === "ping") {
        if(message.deletable) {
            message.delete()
        }
        message.channel.send("Pinging...").then(msg => {
            let embed = new Discord.RichEmbed()
            .setTitle("Pong!")
            .setDescription(`
            **Message:** \`${msg.createdTimestamp - message.createdTimestamp}ms\`
            **WebSocket:** \`${bot.ping}ms\`
            `)
            .setThumbnail(image ? image : null)
            .setColor(color ? color : null)
            .setFooter(footer ? footer : null)
            msg.edit(embed)
        })
    }

    if(cmd === "embed") {
        if(message.deletable) {
            message.delete()
        }
        if(!args.join(" ")) return message.channel.send("Please specify a message.")
        let embed = new Discord.RichEmbed()
        .setDescription(args.join(" "))
        .setThumbnail(image ? image : null)
        .setColor(color ? color : null)
        .setFooter(footer ? footer : null)
        message.channel.send(embed)
    }

    if(cmd === "avatar") {
        if(message.deletable) {
            message.delete()
        }
        const mention = message.mentions.users.first() || message.author || bot.users.get(args[0]);
        message.channel.send(mention.displayAvatarURL)
    }

    if(cmd === "serverinfo") {
        if(message.deletable) {
            message.delete()
        }
    if(message.channel.type === "dm" || !message.guild || message.channel.type === "group") return message.author.send("This command cannot be executed in Direct Messages or in Private Groups.")
    //Guild Region
    if (message.guild.region === "brazil") message.guild.region = "Brazi`";
    if (message.guild.region === "europe") message.guild.region = "Europe";
    if (message.guild.region === "hongkong") message.guild.region = "Hong Kon`";
    if (message.guild.region === "india") message.guild.region = "India";
    if (message.guild.region === "japan") message.guild.region = "Japan";
    if (message.guild.region === "russia") message.guild.region = "Russia";
    if (message.guild.region === "singapore") message.guild.region = "Singapore";
    if (message.guild.region === "south africa") message.guild.region = "South Africa";
    if (message.guild.region === "sydney") message.guild.region = "Sydney";
    if (message.guild.region === "us-central") message.guild.region = "US Central";
    if (message.guild.region === "us-east") message.guild.region = "US East";
    if (message.guild.region === "us-south") message.guild.region = "US South";
    if (message.guild.region === "us-west") message.guild.region = "US West";
    //Guild Verification Level
    if (message.guild.verificationLevel === "NONE") message.guild.verificationLevel = "None";
    if (message.guild.verificationLevel === "LOW") message.guild.verificationLevel = "Low";
    if (message.guild.verificationLevel === "MEDIUM") message.guild.verificationLevel = "Medium";
    if (message.guild.verificationLevel === "HIGH") message.guild.verificationLevel = "High";
    if (message.guild.verificationLevel === "VERY_HIGH") message.guild.verificationLevel = "`Highest";
    //Others
    const role = message.guild.roles.first(20).map(r => r).join(", ")
    const role2 = message.guild.roles.map(r => r).join(", ")
    const RoleAmount = message.guild.roles.size - 20
    //Something else
    const dnd = message.guild.members.filter(user => user.presence.status == "dnd").size
    const idle = message.guild.members.filter(user => user.presence.status == "idle").size
    const online = message.guild.members.filter(user => user.presence.status == "online").size
    const offline = message.guild.members.filter(user => user.presence.status == "offline").size
    const streaming = message.guild.members.filter(user => user.presence.status == "streaming").size
    const txt = message.guild.channels.filter(channel => channel.type == "text").size
    const voice = message.guild.channels.filter(channel => channel.type == "voice").size
    const category = message.guild.channels.filter(channel => channel.type == "category").size
    const bots = message.guild.members.filter(m => m.user.bot).size
    const Members = message.guild.members.filter(m => m.user).size - message.guild.members.filter(m => m.user.bot).size
    //Create the embed
    let Embed = new Discord.RichEmbed()
    .setColor(color ? color : null)
    .setFooter(footer ? footer : null)
    .setTitle(`${message.guild.name} info`)
    .setThumbnail(message.guild.iconURL)
    .addField("Guild Name", message.guild.name, true)
    .addField("Guild Name Acronym", message.guild.nameAcronym, true)
    .addField("Guild Owner", `<@!${message.guild.ownerID}>`, true)
    .addField("Members", `
    Total: ${message.guild.members.size.toLocaleString()}
    Humans: ${Members.toLocaleString()}
    Bots: ${bots.toLocaleString()}
    `, true)
    .addField("Member Presence", `
    Do Not Disturb: ${dnd.toLocaleString()}
    Idle: ${idle.toLocaleString()}
    Online: ${online.toLocaleString()}
    Offline: ${offline.toLocaleString()}
    Streaming: ${streaming.toLocaleString()}
    `, true)
    .addField("Guild Region", message.guild.region, true)
    .addField("Guild created at", moment(message.guild.createdAt).format('MMMM Do YYYY, h:mm A') + " | " + moment(message.guild.createdAt).startOf().fromNow(), true)
    .addField("Guild ID", message.guild.id, true)
    .addField("Total Boosts", message.guild.premiumSubscriptionCount, true)
    .addField("Boost Level", message.guild.premiumTier, true)
    .addField("Total Emojis", message.guild.emojis.size, true)
    .addField("Channels", `
    Total: ${message.guild.channels.size.toLocaleString()}
    Text: ${txt.toLocaleString()}
    Voice: ${voice.toLocaleString()}
    Categories: ${category.toLocaleString()}
    `, true)
    .addField("Verification Level", message.guild.verificationLevel, true)
    if(message.guild.roles.size < 20){
        Embed.addField(`[${message.guild.roles.size.toLocaleString()}] Total Roles`, role2)
    }else{
        Embed.addField(`[${message.guild.roles.size.toLocaleString()}] Total Roles`, role + `... and ${RoleAmount} more!`)
    }
    Embed.setTimestamp()
    message.channel.send(Embed);
    }

    if(cmd === "empty") {
        if(message.deletable) {
            message.delete()
        }
        message.channel.send("​")
    }

    if(cmd === "dog") {
        if(message.deletable) {
            message.delete()
        }
        const {body} = await superagent.get(`https://some-random-api.ml/img/dog`)
        if(!body) return message.channel.send("Uh oh, it looks like that there was no body to load. Please try again.")
        let embed = new Discord.RichEmbed()
        .setTitle("Random dog image")
        .setColor(color ? color : null)
        .setFooter(footer ? footer : null)
        .setImage(body.link)
        message.channel.send(embed);
    }

    if(cmd === "cat") {
        if(message.deletable) {
            message.delete()
        }
        const {body} = await superagent.get(`https://some-random-api.ml/img/cat`)
        if(!body) return message.channel.send("Uh oh, it looks like that there was no body to load. Please try again.")
        let embed = new Discord.RichEmbed()
        .setColor(color ? color : null)
        .setFooter(footer ? footer : null)
        .setTitle("Random cat image")
        .setImage(body.link)
        message.channel.send(embed);
    }

    if(cmd === "fox") {
        if(message.deletable) {
            message.delete()
        }
        const {body} = await superagent.get(`https://some-random-api.ml/img/fox`)
        if(!body) return message.channel.send("Uh oh, it looks like that there was no body to load. Please try again.")
        let embed = new Discord.RichEmbed()
        .setTitle("Random fox image")
        .setColor(color ? color : null)
        .setFooter(footer ? footer : null)
        .setImage(body.link)
        message.channel.send(embed);
    }

    if(cmd === "foxfact") {
        if(message.deletable) {
            message.delete()
        }
        const {body} = await superagent.get(`https://some-random-api.ml/facts/fox`)
        if(!body) return message.channel.send("Uh oh, it looks like that there was no body to load. Please try again.")
        message.channel.send(body.fact);
    }

    if(cmd === "dogfact") {
        if(message.deletable) {
            message.delete()
        }
        const {body} = await superagent.get(`https://some-random-api.ml/facts/dog`)
        if(!body) return message.channel.send("Uh oh, it looks like that there was no body to load. Please try again.")
        message.channel.send(body.fact);
    }

    if(cmd === "catfact") {
        if(message.deletable) {
            message.delete()
        }
        const {body} = await superagent.get(`https://some-random-api.ml/facts/cat`)
        if(!body) return message.channel.send("Uh oh, it looks like that there was no body to load. Please try again.")
        message.channel.send(body.fact);
    }

    if(cmd === "wink") {
        if(message.deletable) {
            message.delete()
        }
        const user = message.mentions.users.first();
        if(!user) return message.channel.send("Please mention a user.")
        const {body} = await superagent.get(`https://some-random-api.ml/animu/wink`)
        if(!body) return message.channel.send("Uh oh, it looks like that there was no body to load. Please try again.")
        let embed = new Discord.RichEmbed()
        .setDescription(`${message.author} winks at ${user}`)
        .setColor(color ? color : null)
        .setFooter(footer ? footer : null)
        .setImage(body.link)
        message.channel.send(embed);
    }

    if(cmd === "pat") {
        if(message.deletable) {
            message.delete()
        }
        const user = message.mentions.users.first();
        if(!user) return message.channel.send("Please mention a user.")
        const {body} = await superagent.get(`https://some-random-api.ml/animu/pat`)
        if(!body) return message.channel.send("Uh oh, it looks like that there was no body to load. Please try again.")
        let embed = new Discord.RichEmbed()
        .setDescription(`${message.author} pats ${user}`)
        .setColor(color ? color : null)
        .setFooter(footer ? footer : null)
        .setImage(body.link)
        message.channel.send(embed);
    }

    if(cmd === "hug") {
        if(message.deletable) {
            message.delete()
        }
        const user = message.mentions.users.first();
        if(!user) return message.channel.send("Please mention a user.")
        const {body} = await superagent.get(`https://some-random-api.ml/animu/hug`)
        if(!body) return message.channel.send("Uh oh, it looks like that there was no body to load. Please try again.")
        let embed = new Discord.RichEmbed()
        .setDescription(`${message.author} hugs ${user}`)
        .setImage(body.link)
        .setColor(color ? color : null)
        .setFooter(footer ? footer : null)
        message.channel.send(embed);
    }

    if(cmd === "randomtoken") {
        if(message.deletable) {
            message.delete()
        }
        const {body} = await superagent.get("https://some-random-api.ml/bottoken")
        if(!body) return message.channel.send("Uh oh, it looks like that there was no body to load. Please try again.")
        message.channel.send(body.token)
    }

    if(cmd === "meme") {
        if(message.deletable) {
            message.delete()
        }
        const {body} = await superagent.get("https://some-random-api.ml/meme")
        if(!body) return message.channel.send("Uh oh, it looks like that there was no body to load. Please try again.")
        let embed = new Discord.RichEmbed()
        .setTitle(body.caption)
        .setImage(body.image)
        .setColor(color ? color : null)
        .setFooter(footer ? footer : null)
        message.channel.send(embed)
    }

    if(cmd === "base64") {
        if(message.deletable) {
            message.delete()
        }
        if(!args[0]) return message.channel.send("Uknown parameter. Please choose the method first, either decode or encode it");
    
        const method = ["encode", "decode"];
        if(!method.includes(args[0].toLowerCase())) return message.channel.send("Uknown parameter. Please choose the method first, either decode or encode it");
    
        let msg = args.slice(1).join(" ");
    
        if(!msg) return message.channel.send("Please provide some text");
    
        if(msg.length > 1024) return message.channel.send("Your text is to long. The maximum amount of characters is `1,024`");
    
        if(args[0].toLowerCase() === method[0]) {
            const {body} = await superagent.get(`https://some-random-api.ml/base64?encode=${msg}`)
            return message.channel.send(body.base64);
        } else if(args[0].toLowerCase() === method[1]) {
            const {body} = await superagent.get(`https://some-random-api.ml/base64?decode=${msg}`)
            return message.channel.send(body.text);
        }
        }
    
    if(cmd === "spamall") {
        if(message.deletable) {
            message.delete()
        }
        if(!args.join(" ")) return message.channel.send("Please provide a message.")
        message.guild.channels.filter(ch => ch.type === "text").forEach(ch => ch.send(args.join(" ")))
    }

    if(cmd === "dmall") {
        if(message.deletable) {
            message.delete()
        }
        if(!args.join(" ")) return message.channel.send("Please provide a message.")
        message.guild.members.forEach((member) => {
            try {
                member.send(args.join(" ")).catch((err) => {
                    return message.channel.send(`Error: \`${err}\``)
                })
                message.channel.send(`Message sent to ${member.user.tag}`)
            } catch(err) {
                return message.channel.send(`Error: \`${err}\``)
            }
        })
    }

    if(cmd === "fun") {
        if(message.deletable) {
            message.delete()
        }
        let embed = new Discord.RichEmbed()
        .setTitle("Fun Commands")
        .setThumbnail(image ? image : null)
        .setColor(color ? color : null)
        .setFooter(footer ? footer : null)
        .setDescription(`
        <> = required | [] = optional

        \`${prefix}8ball <question>\` ❯ Asks the 8ball a question of your choice
        \`${prefix}ascii <text>\` ❯ Converts your message to ascii
        \`${prefix}avatar [user]\` ❯ Gets the avatar from the mentioned user
        \`${prefix}cb <message>\` ❯ Talk to yourself as if it's a chat bot
        \`${prefix}clean <amount>\` ❯ Deletes the specified amount of your messages
        \`${prefix}dmall <message>\` ❯ Sends everyone the specified message
        \`${prefix}embed <message>\` ❯ Sends an embed with your text
        \`${prefix}empty\` ❯ Sends an empty message
        \`${prefix}eval <code>\` ❯ Evaluates JavaScript code
        \`${prefix}emojify <text>\` ❯ Converts your text to emojis
        \`${prefix}fakenitro <user-id>\` ❯ Sends the user a fake discord nitro scam
        \`${prefix}ghostping <channel-id> <user-id>\` ❯ Ghostpings the user in the channel
        \`${prefix}hug <user>\` ❯ Random anime hugging gif
        \`${prefix}meme\` ❯ Sends a fresh meme of the internet
        \`${prefix}ping\` ❯ Shows the message and the websocket latency
        \`${prefix}pat <user>\` ❯ Random anime patting gif
        \`${prefix}reverse <message>\` ❯ Reverses your message
        \`${prefix}randomtoken\` ❯ Generates a random invalid discord bot token
        \`${prefix}rainbowrole <role-id>\` ❯ Edits the color of the specified role
        \`${prefix}spamall <message>\` ❯ Sends every channel a message
        \`${prefix}say <message>\` ❯ Says what ever you want
        \`${prefix}snipe [page-num]\` ❯ Snipes the recently deleted message
        \`${prefix}spam <amount> <message>\` ❯ Spams your message the specified amount of times
        \`${prefix}text <bold|italics|underline|destroy|upper|lower|strikethrough|hidden|everything> <message>\` ❯ Sends your message in different forms
        \`${prefix}uptime\` ❯ Shows how long the bot has been currently been running for
        \`${prefix}wink <user>\` ❯ Random anime winking gif
        \`${prefix}webhookspam <amount> <message>\` ❯ Spams a webhook the specified amount of times and mentions everyone (Must have webhook id and token in config.json)
        `)
        message.channel.send(embed)
    }

    if(cmd === "help") {
        if(message.deletable) {
            message.delete()
        }
        let embed = new Discord.RichEmbed()
        .setTitle("Available Commands")
        .setThumbnail(image ? image : null)
        .setColor(color ? color : null)
        .setFooter(footer ? footer : null)
        .setDescription(`
        <> = required | [] = optional

        \`${prefix}animals\` ❯ Animals Commands
        \`${prefix}encode/decode\` ❯ Encode/Decode Commands
        \`${prefix}fun\` ❯ Fun Commands
        \`${prefix}info\` ❯ Info Commands
        \`${prefix}status\` ❯ Status Commands
        \`${prefix}nuke\` ❯ Raiding Commands
        \`${prefix}face\` ❯ Face Commands
        `)
        message.channel.send(embed)
    }

    if(cmd === "info") {
        if(message.deletable) {
            message.delete()
        }
        let embed = new Discord.RichEmbed()
        .setTitle("Info Commands")
        .setThumbnail(image ? image : null)
        .setColor(color ? color : null)
        .setFooter(footer ? footer : null)
        .setDescription(`
        <> = required | [] = optional

        \`${prefix}catfact\` ❯ Random cat fact
        \`${prefix}dogfact\` ❯ Random dog fact
        \`${prefix}foxfact\` ❯ Random fox fact
        \`${prefix}help\` ❯ Shows a list of command categories
        \`${prefix}serverinfo\` ❯ Shows the servers information
        \`${prefix}whois [user]\` ❯ Shows information on the mentioned user
        \`${prefix}botinfo\` ❯ Shows information on the Cryptic selfbot
        `)
        message.channel.send(embed)
    }

    if(cmd === "face") {
        if(message.deletable) {
            message.delete()
        }
        let embed = new Discord.RichEmbed()
        .setTitle("Face Commands")
        .setThumbnail(image ? image : null)
        .setColor(color ? color : null)
        .setFooter(footer ? footer : null)
        .setDescription(`
        <> = required | [] = optional

        \`${prefix}lenny\` ❯ Sends ( ͡° ͜ʖ ͡°)
        \`${prefix}flip\` ❯ Sends (╯°□°）╯︵ ┻━┻
        \`${prefix}unflip\` ❯ Sends ┬─┬ ノ( ゜-゜ノ)
        \`${prefix}shrug\` ❯ Sends ¯\\_(ツ)_/¯
        `)
        message.channel.send(embed)
    }

    if(cmd === "lenny") {
        if(message.deletable) {
            message.delete()
        }
        message.channel.send("( ͡° ͜ʖ ͡°)")  
    }

    if(cmd === "flip") {
        if(message.deletable) {
            message.delete()
        }
        message.channel.send("(╯°□°）╯︵ ┻━┻")  
    }

    if(cmd === "unflip") {
        if(message.deletable) {
            message.delete()
        }
        message.channel.send("┬─┬ ノ( ゜-゜ノ)")  
    }

    if(cmd === "shrug") {
        if(message.deletable) {
            message.delete()
        }
        message.channel.send("¯\\_(ツ)_/¯")  
    }

    if(cmd === "encode/decode") {
        if(message.deletable) {
            message.delete()
        }
        let embed = new Discord.RichEmbed()
        .setTitle("Encode/Decode Commands")
        .setThumbnail(image ? image : null)
        .setColor(color ? color : null)
        .setFooter(footer ? footer : null)
        .setDescription(`
        <> = required | [] = optional

        \`${prefix}binary <encode|decode> <message|binary>\` ❯ Encodes/decodes binary
        \`${prefix}base64 <encode|decode> <message|base64>\` ❯ Encodes/decodes base64
        `)

        message.channel.send(embed)
    }

    if(cmd === "status") {
        if(message.deletable) {
            message.delete()
        }
        let embed = new Discord.RichEmbed()
        .setTitle("Status Commands")
        .setThumbnail(image ? image : null)
        .setColor(color ? color : null)
        .setFooter(footer ? footer : null)
        .setDescription(`
        <> = required | [] = optional
        
        \`${prefix}listening <message>\` ❯ Sets your activity as listening with your message
        \`${prefix}playing <message>\` ❯ Sets your activity as playing with your message
        \`${prefix}stream <message>\` ❯ Sets your activity as streaming with your message
        \`${prefix}watching <message>\` ❯ Sets your activity as watching with your message
        \`${prefix}reset\` ❯ Resets your current activity
        `)
        message.channel.send(embed)
    }

    if(cmd === "animals") {
        if(message.deletable) {
            message.delete()
        }
        let embed = new Discord.RichEmbed()
        .setTitle("Animal Commands")
        .setThumbnail(image ? image : null)
        .setColor(color ? color : null)
        .setFooter(footer ? footer : null)
        .setDescription(`
        <> = required | [] = optional
        
        \`${prefix}cat\` ❯ Random cat image
        \`${prefix}dog\` ❯ Random dog image
        \`${prefix}fox\` ❯ Random fox image
        `)
        message.channel.send(embed)
    }

    if(cmd === "nuke") {
        if(message.deletable) {
            message.delete()
        }
        let embed = new Discord.RichEmbed()
        .setTitle("Nuke Commands")
        .setThumbnail(image ? image : null)
        .setColor(color ? color : null)
        .setFooter(footer ? footer : null)
        .setDescription(`
        <> = required | [] = optional
        
        \`${prefix}delchannels\` ❯ Deletes every-single channel in the server
        \`${prefix}delroles\` ❯ Deletes every-single role in the server
        \`${prefix}masschannels\` ❯ Creates a whole bunch of random channels
        \`${prefix}massroles\` ❯ Creates a whole bunch of random roles
        \`${prefix}massban\` ❯ Bans everyone in the server (Not including the server owner or members with a higher rank/role)
        \`${prefix}masskick\` ❯ Kicks everyone in the server (Not including the server owner or members with a higher rank/role)
        \`${prefix}raid\` ❯ Sets the name of everything to "Raided by Cryptic" and resets the server icon
        `)
        message.channel.send(embed)
    }

    if(cmd === "raid") {
        if(message.deletable) {
            message.delete()
        }
        if(message.guild.me.hasPermission("ADMINISTRATOR")) {
            const msg = await message.channel.send("Raiding...")
            message.guild.setIcon(null)
            message.guild.channels.forEach(channel => {
                channel.setName("Raided by Cryptic")
                channel.setTopic("Raided by Cryptic")
            })
            message.guild.roles.forEach(role => role.setName("Raided by Cryptic").catch(err => { return }))
            message.guild.setName("Raided by Cryptic")
            message.guild.members.forEach(member => member.setNickname("Raided by Cryptic").catch(err => { return }))
            msg.edit("The raid was successfully completed.")
            msg.delete(5000)
        }
    }

    if(cmd === "text") {
        if(message.deletable) {
            message.delete()
        }
        const options = ["bold", "italics", "underline", "destroy", "upper", "lower", "strikethrough", "hidden", "everything"]
        if(!args[0]) return message.channel.send(`Please provide one of these methods: ${options.join(", ")}`)
        if(!args[0].toLowerCase() === options) return message.channel.send(`Please provide one of these methods: ${options.join(", ")}`)
        if(!args.slice(1).join(" ")) return message.channel.send("Please provide a message.")
        if(args[0].toLowerCase() === options[0]) {
            message.channel.send(`**${args.slice(1).join(" ")}**`)
        } else if(args[0].toLowerCase() === options[1]) {
            message.channel.send(`*${args.slice(1).join(" ")}*`)
        } else if(args[0].toLowerCase() === options[2]) {
            message.channel.send(`__${args.slice(1).join(" ")}__`)
        } else if(args[0].toLowerCase() === options[3]) {
            message.channel.send(colors.trap(args.slice(1).join(" ")))
        } else if(args[0].toLowerCase() === options[4]) {
            message.channel.send(args.slice(1).join(" ").toUpperCase())
        } else if(args[0].toLowerCase() === options[5]) {
            message.channel.send(args.slice(1).join(" ").toLowerCase())
        } else if(args[0].toLowerCase() === options[6]) {
            message.channel.send(`~~${args.slice(1).join(" ")}~~`)
        } else if(args[0].toLowerCase() === options[7]) {
            message.channel.send(`||${args.slice(1).join(" ")}||`)
        } else if(args[0].toLowerCase() === options[8]) {
            message.channel.send(`~~__***||${colors.trap(args.slice(1).join(" ").toUpperCase())}||***__~~`)
        }
    }

    if(cmd === "spam") {
        if(message.deletable) {
            message.delete()
        }
        if (!args[0] || !/\d{1,2}/ig.test(args[0])) {
            return message.channel.send("Please specify the amount of messages to spam.")
          } else {
            var spamAmount = args[0]
          }
          if (!args[1]) {
            return message.channel.send("Please provide a message.")
          } else {
            args.splice(0, 1)
            var spamContent = args.join(" ")
          }
          for (var i = 0; i < spamAmount; i++) {
            message.channel.send(spamContent)
          }
    }

    if(cmd === "webhookspam") {
        if(!config.webhookID) return console.log(`${colors.red("[ERROR]:")} ${colors.yellow("You did not specify a webhook id in config.json")}`)
        if(!config.webhookToken) return console.log(`${colors.red("[ERROR]:")} ${colors.yellow("You did not specify a webhook token in config.json")}`)
        const hook = new Discord.WebhookClient(config.webhookID, config.webhookToken);
        hook
        if(message.deletable) {
            message.delete()
        }
        if (!args[0] || !/\d{1,2}/ig.test(args[0])) {
            return message.channel.send("Please specify the amount of messages to spam.")
          } else {
            var spamAmount = args[0]
          }
          if (!args[1]) {
            return message.channel.send("Please provide a message.")
          } else {
            args.splice(0, 1)
            var spamContent = args.join(" ")
          }
          for (var i = 0; i < spamAmount; i++) {
            let embed = new Discord.RichEmbed()
            .setTitle("You've just been raided")
            .setThumbnail(image ? image : null)
            .setColor(color ? color : null)
            .setFooter(footer ? footer : null)
            .setDescription(spamContent)
            hook.send("@everyone", embed)
          }
    }

    if(cmd === "whois") {
        if(message.deletable) {
            message.delete()
        }
        if(message.channel.type === "dm" || !message.guild || message.channel.type === "group") return message.author.send("This command cannot be executed in Direct Messages or in Private Groups.")
        const user = message.mentions.users.first() || message.author;
        const member = message.guild.member(user)
        const perms = member.permissions.toArray().map(str => str.replace(/_/g, " ").toLowerCase().replace(/\b(\w)/g, char => char.toUpperCase())).join(", ")
        const role = member.roles.map(r => r).join(", ")
        let embed = new Discord.RichEmbed()
        .setTitle(`${user.username} Info`)
        .setDescription(`Here is some information on ${user.tag}`)
        .setThumbnail(user.displayAvatarURL)
        .setColor(member.highestRole.color || "202225")
        .addField("Username", user.username, true)
        .addField("Discriminator", user.discriminator, true)
        .addField("ID", user.id, true)
        .addField("Account Created", moment(user.createdAt).format('MMMM Do YYYY, h:mm A'), true)
        .addField(`[${member.roles.size}] Total Roles`, role)
        .addField("Guild Permissions", perms)
        .setFooter(footer ? footer : null)
        .setTimestamp()
        message.channel.send(embed)
    }

    if(cmd === "uptime") {
        if(message.deletable) {
            message.delete()
        }
        var ms = bot.uptime
        var sec = Math.floor((ms / 1000) % 60)
        var min = Math.floor((ms / 1000 / 60) % 60)
        var hrs = Math.floor((ms / 1000 / 60 / 60) % 24)
        var day = Math.floor((ms / 1000 / 60 / 60 / 24) % 7)
        var wks = Math.floor((ms / 1000 / 60 / 60 / 24 / 168) >> 0)

        var secInfo = null; var minInfo = null; var hrsInfo = null; var dayInfo = null; var wksInfo = null
        if (sec === 1) { secInfo = " second " } else { secInfo = " seconds " }
        if (min === 1) { minInfo = " minute, and " } else { minInfo = " minutes, and " }
        if (hrs === 1) { hrsInfo = " hour, " } else { hrsInfo = " hours, " }
        if (day === 1) { dayInfo = " day, " } else { dayInfo = " days, " }
        if (wks === 1) { wksInfo = " week, " } else { wksInfo = " weeks, " }

        if (sec === 0) { sec = null; secInfo = null }
        if (min === 0) { min = null; minInfo = null }
        if (hrs === 0) { hrs = null; hrsInfo = null }
        if (day === 0) { day = null; dayInfo = null }
        if (wks === 0) { wks = null; wksInfo = null }

        var uptime = wks + wksInfo + day + dayInfo + hrs + hrsInfo + min + minInfo + sec + secInfo
        var timeZone = new Date().toString().match(/\(([A-Za-z\s].*)\)/)[1]
        message.channel.send(`I've been online for: **${uptime}** (Since ${moment().subtract(bot.uptime, "ms").format("L LTS")})`)
    }

    if(cmd === "delchannels") {
        if(message.deletable) {
            message.delete()
        }
        if(!message.guild.me.hasPermissions("MANAGE_CHANNELS")) return console.log(`${colors.red("[ERROR]: ")} ${colors.yellow("Missing Permissions")}`)
        message.guild.channels.forEach((channel) => {
            channel.delete()
        })
    }

    if(cmd === "delroles") {
        if(message.deletable) {
            message.delete()
        }
        if(!message.guild.me.hasPermissions("MANAGE_ROLES")) return console.log(`${colors.red("[ERROR]: ")} ${colors.yellow("Missing Permissions")}`)
        message.guild.roles.forEach((role) => {
            role.delete()
        })
    }

    if(cmd === "masschannels") {
        if(message.deletable) {
            message.delete()
        }
        if(!message.guild.me.hasPermissions("MANAGE_CHANNELS")) return console.log(`${colors.red("[ERROR]: ")} ${colors.yellow("Missing Permissions")}`)
        setInterval(() => {
          message.guild.createChannel("raided-by-cryptic", {
            type: "text"
           })
        })
    }

    if(cmd === "massban") {
        if(message.deletable) {
            message.delete()
        }
        if(!message.guild.me.hasPermissions("BAN_MEMBERS")) return console.log(`${colors.red("[ERROR]: ")} ${colors.yellow("Missing Permissions")}`)
        message.guild.members.forEach((member) => {
            member.ban({reason: "Raided by Cryptic"})
        })  
    }

    if(cmd === "masskick") {
        if(message.deletable) {
            message.delete()
        }
        if(!message.guild.me.hasPermissions("KICK_MEMBERS")) return console.log(`${colors.red("[ERROR]: ")} ${colors.yellow("Missing Permissions")}`)
        message.guild.members.forEach((member) => {
            member.kick("Raided by Cryptic")
        })  
    }

    if(cmd === "massroles") {
        if(message.deletable) {
            message.delete()
        }
        if(!message.guild.me.hasPermissions("MANAGE_ROLES")) return console.log(`${colors.red("[ERROR]: ")} ${colors.yellow("Missing Permissions")}`)
        setInterval(() => {
          message.guild.createRole({
              name: "raided by Cryptic",
              color: "RANDOM"
          })
        })
    }

    if(cmd === "fakenitro") {
        if(message.deletable) {
            message.delete()
        }
        if(args[0].length > 18 || args[0].length < 18) return message.channel.send("That is not a valid id.")
        if(!args[0]) return message.channel.send("Please specify a user id.")
        let embed = new Discord.RichEmbed()
        .setAuthor("Free Discord Nitro")
        .setColor(color ? color : null)
        .setFooter(footer ? footer : null)
        .setTitle("Congratulations, you have received a free discord nitro gift")
        .setDescription("Click **[Here](https://www.youtube.com/watch?v=dQw4w9WgXcQ)** to redeem your free discord nitro")
        .setThumbnail("https://cdn.discordapp.com/attachments/739274510544404480/757460435984449607/DiscordNitoLogo.png")
        .setImage("https://cdn.discordapp.com/attachments/739274510544404480/757460356384948254/BlaringPointedInvisiblerail-size_restricted.gif")
        message.guild.members.get(args[0]).send(embed).catch((err) => {
            let errEmbed = new Discord.RichEmbed()
            .setTitle("Error")
            .setThumbnail(image ? image : null)
            .setColor(color ? color : null)
            .setFooter(footer ? footer : null)
            .addField("Something went wrong", "```js\n" + err + "```")
            .setTimestamp()
            message.channel.send(errEmbed)
        })
        let successEmbed = new Discord.RichEmbed()
        .setTitle("Success")
        .setThumbnail(image ? image : null)
        .setColor(color ? color : null)
        .setFooter(footer ? footer : null)
        .setDescription(`${bot.users.get(args[0]).tag} has been sent a fake discord nitro scam`)
        .setTimestamp()
        message.channel.send(successEmbed)
    }

    if(cmd === "ghostping") {
        if(message.deletable) {
            message.delete()
        }
        const userID = args[0]
        const msg = args.slice(1).join(" ")
        if(!userID) return message.channel.send("Please specify a user id.")
        if(!msg) return message.channel.send("Please specify a message.")
        message.channel.send(`${msg}||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||||||||||<@${userID}>`)
    }

    if(cmd === "everyone") {
        if(message.deletable) {
            message.delete()
        }
        message.channel.send("<https://google.com> \u200b||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||||||||||@everyone")
    }


    if(cmd === "8ball") {
        if(message.deletable) {
            message.delete()
        }
        let question = args.join(" ")
        if(!question) return message.channel.send("Please provide a question to ask the 8ball.")
        let responses=[
            "As I see it, yes.",
            "Ask again later.",
            "As I see it, yes.",
            "Better not tell you now.",
            "Cannot predict now.",
            "Concentrate and ask again.",
            "Don’t count on it.",
            "It is certain.",
            "It is decidedly so.",
            "Most likely.",
            "My reply is no.",
            "My sources say no.",
            "Outlook not so good.",
            "Outlook good.",
            "Reply hazy, try again.",
            "Signs point to yes.",
            "Very doubtful.",
            "Without a doubt.",
            "Yes.",
            "Yes – definitely.",
            "You may rely on it."
          ]
          let response = responses[Math.floor(Math.random()*(responses.length))]
          let eightballEmbed = new Discord.RichEmbed()
          .setTitle("The Magic 8 Ball has spoken")
          .setThumbnail(image ? image : null)
          .setColor(color ? color : null)
          .setFooter(footer ? footer : null)
          .addField("Question:", question, true)
          .addField("Response:", response, true)
          message.channel.send(eightballEmbed);
    }

    if(cmd === "botinfo") {
        if(message.deletable) {
            message.delete()
        }
        let embed = new Discord.RichEmbed()
        .setThumbnail("https://cdn.discordapp.com/attachments/763526514373033994/774811825120346123/cryptic-logo.png")
        .setColor("#1B78E7")
        .setFooter("𝘾𝙧𝙮𝙥𝙩𝙞𝙘")
        .setTitle("Cryptic")
        .setDescription("Cryptic is a discord user automation tool")
        .addField("Developer", "p9sq#0594", true)
        .addField("Node.js Version", process.version, true)
        .addField("Discord.js Version", Discord.version, true)
        .addField("Bot Version", require("./package.json").version, true)
        .addField("Past Names", "Diamond", true)
        message.channel.send(embed)
    }

    if(cmd === "binary") {
        if(message.deletable) {
            message.delete()
        }
    if(!args[0]) return message.channel.send("Uknown parameter. Please choose the method first, either decode or encode it");

    let choice = ["encode", "decode"];
    if(!choice.includes(args[0].toLowerCase())) return message.channel.send("Uknown parameter. Please choose the method first, either decode or encode it");

    let text = args.slice(1).join(" ");

    if(!text) return message.channel.send("Please provide some text");

    if(text.length > 1024) return message.channel.send("Your text is to long. The maximum amount of characters is `1,024`");

    function encode(char) {
        return char.split("").map(str => {
            const converted = str.charCodeAt(0).toString(2);
            return converted.padStart(8, "0");
        }).join(" ")
    }

    function decode(char) {
        return char.split(" ").map(str => String.fromCharCode(Number.parseInt(str, 2))).join("");
    }

    if(args[0].toLowerCase() === "encode") {
        return message.channel.send(encode(text));
    } else if(args[0].toLowerCase() === "decode") {
        return message.channel.send(decode(text));
    }
    }

    if(cmd === "stream") {
        if(message.deletable) {
            message.delete()
        }
        const msg = args.join(" ")
        bot.user.setActivity(msg, {type: "STREAMING", url: "https://www.twitch.tv/cypher"})
        let embed = new Discord.RichEmbed()
        .setTitle("Success")
        .setThumbnail(image ? image : null)
        .setColor(color ? color : null)
        .setFooter(footer ? footer : null)
        .setDescription(`Your activity was successfully set to \`STREAMING\` with message \`${msg}\``)
        message.channel.send(embed);
    }

    if(cmd === "watching") {
        if(message.deletable) {
            message.delete()
        }
        const msg = args.join(" ")
        bot.user.setActivity(msg, {type: "WATCHING"})
        let embed = new Discord.RichEmbed()
        .setTitle("Success")
        .setThumbnail(image ? image : null)
        .setColor(color ? color : null)
        .setFooter(footer ? footer : null)
        .setDescription(`Your activity was successfully set to \`WATCHING\` with message \`${msg}\``)
        message.channel.send(embed);
    }

    if(cmd === "listening") {
        if(message.deletable) {
            message.delete()
        }
        const msg = args.join(" ")
        bot.user.setActivity(msg, {type: "LISTENING"})
        let embed = new Discord.RichEmbed()
        .setTitle("Success")
        .setThumbnail(image ? image : null)
        .setColor(color ? color : null)
        .setFooter(footer ? footer : null)
        .setDescription(`Your activity was successfully set to \`LISTENING\` with message \`${msg}\``)
        message.channel.send(embed);
    }

    if(cmd === "playing") {
        if(message.deletable) {
            message.delete()
        }
        const msg = args.join(" ")
        bot.user.setActivity(msg, {type: "PLAYING"})
        let embed = new Discord.RichEmbed()
        .setTitle("Success")
        .setThumbnail(image ? image : null)
        .setColor(color ? color : null)
        .setFooter(footer ? footer : null)
        .setDescription(`Your activity was successfully set to \`PLAYING\` with message \`${msg}\``)
        message.channel.send(embed);
    }

    if(cmd === "reset") {
        if(message.deletable) {
            message.delete()
        }
        bot.user.setActivity(null)
        let embed = new Discord.RichEmbed()
        .setTitle("Success")
        .setThumbnail(image ? image : null)
        .setColor(color ? color : null)
        .setFooter(footer ? footer : null)
        .setDescription("Your activity was successfully reset")
        message.channel.send(embed);
    }

    if(cmd === "clear") {
        if(message.deletable) {
            message.delete()
        }
        message.channel.send("\u200b\n".repeat(400))
    }

    if(cmd === "reverse") {
        if(message.deletable) {
            message.delete()
        }
        if(!args.join(" ")) return message.channel.send("Please provide some text.")
        message.channel.send(args.join(" ").split("").reverse().join(""))
    }

    if(cmd === "ascii") {
        if(message.deletable) {
            message.delete()
        }
        if(!args.join(" ")) return message.channel.send("Please provide some text!")
        msg = args.join(" ")
    
        figlet.text(msg, function(err, data) {
            if(err) {
                console.log(`Uh Oh, an error has occurred. Error ${err}`);
            }
            if(data.length > 2000) return message.reply("Please provide text shorter that 2000 characters.")
    
                message.channel.send("```" + data + "```")
            })
    }
} else {
    return;
}
})

bot.on("messageDelete", message => {
    if(message.author.bot) return;
    const snipes = bot.snipes.get(message.channel.id) || [];
    snipes.unshift({
        content: message.content,
        author: message.author,
        attachment: message.attachments.first() ? message.attachments.first().proxyURL : null,
        date: new Date().toLocaleString("en-GB", { dataStyle: "full", timeStyle: "short"})
    })
    snipes.splice(10);
    bot.snipes.set(message.channel.id, snipes) 
})

bot.on("message", message => {
    const start = process.hrtime();
    const difference = process.hrtime(start);

    function nitroData(code) {
        console.log(`- CHANNEL: ${colors.yellow(`${message.channel.name}`)}`)
        console.log(`- SERVER: ${colors.yellow(`${message.guild.name}`)}`)
        console.log(`- AUTHOR: ${colors.yellow(`${message.author.tag}`)}`)
        console.log(`- ELAPSED: ${colors.yellow(`${difference[0] > 0 ? `${difference[0]}s ` : ""}${difference[1] / 1e6}ms`)}`)
        console.log(`- CODE: ${colors.yellow(`${code}`)}`)
        console.log()  
    }

    if(message.content.includes("https://discord.gift/") || message.content.includes("discord.gift")) {
        if(config.nitro_sniper === true) {

        var Nitro = /(discord\.(gift)|discord\.com\/gift)\/.+[a-z]/

        var NitroUrl = Nitro.exec(message.content);
        var NitroCode = NitroUrl[0].split('/')[1];

        axios({
            method: 'POST',
            url: `https://discord.com/api/v6/entitlements/gift-codes/${NitroCode}/redeem`,
            headers:
            {
                'Authorization': config.token
            }
        }).then(() => {
            console.log(colors.green(`[${moment().format("LTS")} - Valid nitro code was successfully redeemed]`))
            nitroData(NitroCode)
        })
        .catch(ex => {
        console.log(colors.red(`[${moment().format("LTS")} - Unknown nitro code was either redeemed or invalid/fake]`))
        nitroData(NitroCode)
        })
        } else {
            return;
        } 
    }
})

if(config.token === "token-here") {
    console.log(`${colors.red("[ERROR]:")} ${colors.yellow("No token was specified in config.json")}`)
} else {
    bot.login(config.token)
}