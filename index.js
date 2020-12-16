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
const { Type } = require("@extreme_hero/deeptype");
const { inspect } = require("util");
const fs = require("fs");

const selfbot = {
    version: "1.0.0",
    name: "Cryptic",
    linecount: 1667
}

// Process
process.on("unhandledRejection", error => console.log(`${colors.red("[ERROR]:")} ${colors.yellow(error.message)}`))
process.on("uncaughtExceptionMonitor", error => console.log(`${colors.red("[ERROR]:")} ${colors.yellow(error.message)}`))
process.on("uncaughtException", error => console.log(`${colors.red("[ERROR]:")} ${colors.yellow(error.message)}`))
// Process

bot.snipes = new Map()

console.log("Logging in, please wait...")
title(`[${selfbot.name} v${selfbot.version}] Loading...`)
bot.on("ready", () => {
    console.clear()
    title(`[${selfbot.name} v${selfbot.version}] Logged in as ${bot.user.username}`)
    if(config.credit === true) {
        bot.user.setActivity("https://discord.com/invite/FRGKTJsFJg", {type: "PLAYING"})
    }
    console.log(`
 

                             ▄████▄   ██▀███ ▓██   ██▓ ██▓███  ▄▄▄█████▓ ██▓ ▄████▄  
                            ▒██▀ ▀█  ▓██ ▒ ██▒▒██  ██▒▓██░  ██▒▓  ██▒ ▓▒▓██▒▒██▀ ▀█  
                            ▒▓█    ▄ ▓██ ░▄█ ▒ ▒██ ██░▓██░ ██▓▒▒ ▓██░ ▒░▒██▒▒▓█    ▄ 
                            ▒▓▓▄ ▄██▒▒██▀▀█▄   ░ ▐██▓░▒██▄█▓▒ ▒░ ▓██▓ ░ ░██░▒▓▓▄ ▄██▒
                            ▒ ▓███▀ ░░██▓ ▒██▒ ░ ██▒▓░▒██▒ ░  ░  ▒██▒ ░ ░██░▒ ▓███▀ ░
                            ░ ░▒ ▒  ░░ ▒▓ ░▒▓░  ██▒▒▒ ▒▓▒░ ░  ░  ▒ ░░   ░▓  ░ ░▒ ▒  ░
                               ░  ▒     ░▒ ░ ▒░▓██ ░▒░ ░▒ ░         ░     ▒ ░  ░  ▒   
                            ░          ░░   ░ ▒ ▒ ░░  ░░         ░       ▒ ░░        
                            ░ ░         ░     ░ ░                        ░  ░ ░      
                            ░                 ░ ░                           ░        

                            

                            ${colors.cyan(selfbot.name)} ${colors.yellow(`v${selfbot.version}`)} ${colors.magenta("|")} ${colors.cyan("Logged in as")} ${colors.yellow(bot.user.tag)} ${colors.magenta("|")} ${colors.cyan("ID:")} ${colors.yellow(bot.user.id)}
                            ${colors.cyan("Nitro Sniper?")} ${config.nitro_sniper ? colors.green("Enabled") : colors.red("Disabled")}
                            ${colors.cyan("Giveaway Sniper?")} ${config.giveaway_sniper ? colors.green("Enabled") : colors.red("Disabled")}
                            ${colors.cyan("Prefix:")} ${colors.yellow(`${config.prefix}`)}
                            ${colors.cyan("GitHub:")} ${colors.yellow("https://github.com/p9sq/Cryptic")}
                            ${colors.cyan("Developer:")} ${colors.yellow("p9sq69#0594")}
    `)
})

bot.on("message", async(message) => {

    if(config.messageLogs === true) {
        console.log(`${colors.red(message.guild.name)} : ${colors.blue(message.channel.name)} : ${colors.yellow(message.author.tag)} : ${colors.green(message.content)}`)
    }
    
    if(message.author.bot) return;
    let prefix = config.prefix;
    let messageArray = message.content.split(" ")
    let cmd = messageArray[0].replace(prefix, "");
    let args = messageArray.slice(1);
    if(!message.content.startsWith(prefix)) return;

    if(config.whitelisted.includes(message.author.id) || message.author.id === bot.user.id) {
    
    // Selfbot commands
    if(cmd === "rainbow") {
        console.log(`[${colors.green(moment().utc().format("HH:mm:ss"))}] ${colors.cyan("Command used")} ${colors.magenta("|")} ${colors.yellow(cmd)}`)
        if(message.deletable) {
            message.delete()
        }
        const role = message.mentions.roles.first()
        if(!role) return message.channel.send("Please mention a role")
        let embed = new Discord.RichEmbed()
        .setTitle("Success")
        .setDescription(`Successfully made the ${role.name} role rainbow`)
        .setThumbnail(image ? image : "https://media4.giphy.com/media/6cXJU3ZCj0U7gy8ZXo/giphy.gif")
        .setColor(color ? color : "#1B78E7")
        .setFooter(footer ? footer : "𝘾𝙧𝙮𝙥𝙩𝙞𝙘")
        message.channel.send(embed)
        setInterval(() => {
            role.edit({
                color: "RANDOM"
            })
        })
    }

    if(cmd === "codeblock") {
        console.log(`[${colors.green(moment().utc().format("HH:mm:ss"))}] ${colors.cyan("Command used")} ${colors.magenta("|")} ${colors.yellow(cmd)}`)
        if(message.deletable) {
            message.delete()
        }
        const types = ["js", "json", "ts", "lua"]
        if(!types.includes(args[0])) return message.channel.send(`Please specify a valid type. Types: \`${types.join("`, `")}\``)
        message.channel.send(`\`\`\`${args[0]}\n${args.slice(1).join(" ")}\n\`\`\``)
    }

    if(cmd === "hack") {
        console.log(`[${colors.green(moment().utc().format("HH:mm:ss"))}] ${colors.cyan("Command used")} ${colors.magenta("|")} ${colors.yellow(cmd)}`)
        if(message.deletable) {
            message.delete()
        }
        const {body} = await superagent.get("https://some-random-api.ml/bottoken")
        if(!body) return message.channel.send("Uh oh, it looks like that there was no body to load. Please try again.")
        const targetID = bot.users.get(args[0])
        if(!targetID) return message.channel.send("Please specify a user id")
        const msg = await message.channel.send(`Hacking ${targetID.username} now...`)
        const ips = [
            "40.2.54.239",
            "145.58.134.145",
            "90.135.87.199",
            "251.224.76.96",
            "94.199.139.255"
        ];
        const ip = ips[Math.floor(Math.random()*(ips.length))];
        const emails = [
            `${targetID.username}@gmail.com`,
            "support@discord.com",
            `${targetID.username}${targetID.discriminator}@hotmail.com`,
            `${targetID.username}.${targetID.discriminator}@discord.com`
        ];
        const email = emails[Math.floor(Math.random()*(emails.length))];
        const passwords = [
            "DiscordIsCool",
            "selfbotsAreAgainsDiscordTOS",
            "YoMamaIsGay",
            "Password",
            "MyPasswordJustGotLeaked"
        ];
        const password = passwords[Math.floor(Math.random()*(passwords.length))];
        const sentences = [
            "I like ya cut g",
            "Can you send me your token?",
            "Can I have your bots source code?",
            `${password} is my password to my discord account... :flushed:`,
            "Your mum is so ugly, that she made my happy meal cry :sunglasses:"
        ];
        const sentence = sentences[Math.floor(Math.random()*(sentences.length))];
        setTimeout(() => {
            msg.edit(`**Found IP** » ${ip}`)
            setTimeout(() => {
                msg.edit(`**Found Email** » ${email}`)
                setTimeout(() => {
                    msg.edit(`**Found Password** » ${password}`)
                    setTimeout(() => {
                        msg.edit(`**Found Username** » ${targetID.username}`)
                        setTimeout(() => {
                            msg.edit(`**Found Discriminator** » ${targetID.discriminator}`)
                            setTimeout(() => {
                                msg.edit(`**Found ID** » ${targetID.id}`)
                                setTimeout(() => {
                                    msg.edit(`**Injecting virus into discriminator** » ${targetID.discriminator}...`)
                                    setTimeout(() => {
                                        msg.edit(`**Reported to discord for selfbotting...**`)
                                        setTimeout(() => {
                                            msg.edit("**Successfully reported**")
                                            setTimeout(() => {
                                                msg.edit(`**Found Token** » ${body.token}`)
                                                setTimeout(() => {
                                                    msg.edit(`**Fetching DMs...**`)
                                                    setTimeout(() => {
                                                        msg.edit(`**Most common sentence** » ${sentence}`)
                                                        setTimeout(() => {
                                                            setTimeout(() => {
                                                                msg.edit(`**Sold all found data to the government...**`)
                                                                setTimeout(() => {
                                                                    msg.edit(`**Complete!**`)
                                                                    setTimeout(() => {
                                                                        message.channel.send(`**The *totally* real hack has been successfully completed!**`)
                                                                    }, 1000)
                                                                }, 4000)
                                                            }, 4000)
                                                        }, 4000)
                                                    }, 4000)
                                                }, 4000)
                                            }, 4000)
                                        }, 4000)
                                    }, 4000)
                                }, 4000)
                            }, 4000)
                        }, 4000)
                    }, 4000)
                }, 4000)
            }, 4000)
        }, 4000)
    }

    if(cmd === "cls") {
        console.log(`[${colors.green(moment().utc().format("HH:mm:ss"))}] ${colors.cyan("Command used")} ${colors.magenta("|")} ${colors.yellow(cmd)}`)
        if(message.deletable) {
            message.delete()
        }
        console.clear()
    }

    if(cmd === "snipe") {
        console.log(`[${colors.green(moment().utc().format("HH:mm:ss"))}] ${colors.cyan("Command used")} ${colors.magenta("|")} ${colors.yellow(cmd)}`)
        if(message.deletable) {
            message.delete()
        }
        const snipes = bot.snipes.get(message.channel.id) || [];
        const msg = snipes[args[0]-1||0]
        if(!msg) return message.channel.send("There's nothing to snipe.")
        if(enabled === true) {
            let embed = new Discord.RichEmbed()
            .setAuthor(msg.author.tag, msg.author.displayAvatarURL)
            .setDescription(`${msg.content}
        
            **Date** » ${msg.date}
            **Page** » ${args[0]||1}/${snipes.length}
            `)
            .setThumbnail(image ? image : "https://media4.giphy.com/media/6cXJU3ZCj0U7gy8ZXo/giphy.gif")
            .setColor(color ? color : "#1B78E7")
            .setFooter(footer ? footer : "𝘾𝙧𝙮𝙥𝙩𝙞𝙘")
            if(msg.attachment) {
                embed.setImage(msg.attachment)
            }
            message.channel.send(embed)
        } else {
            message.channel.send(stripIndents`\`\`\`
            ${msg.author.tag}

            ${msg.content}

            Date » ${msg.date}
            Page » ${args[0]||1}/${snipes.length}${footer ? `\n\n${footer}` : null}
            \`\`\``)
        }
    }

    if(cmd === "eval") {
        console.log(`[${colors.green(moment().utc().format("HH:mm:ss"))}] ${colors.cyan("Command used")} ${colors.magenta("|")} ${colors.yellow(cmd)}`)
        if(message.deletable) {
            message.delete()
        }
        const msg = message;
        let code = args.join(" ");
        code = code.replace(/[“”]/g, '"').replace(/[‘’]/g, "'");
        let evaled;
        try {
            const start = process.hrtime();
            evaled = eval(code);
            if (evaled instanceof Promise) {
                evaled = await evaled;
            }
            const stop = process.hrtime(start);
            const response = [
                `**Output:** \`\`\`js\n${clean(inspect(evaled, {depth: 0}))}\n\`\`\``,
                `**Type:** \`\`\`ts\n${new Type(evaled).is}\n\`\`\``,
                `**Time Taken:** \`\`\`\n${(((stop[0] * 1e9) + stop[1])) / 1e6}ms\n\`\`\``
            ]
            const res = response.join('\n');
            if (res.length < 2000) {
                await msg.channel.send(res);
            } else {
                const output = new Discord.MessageAttachment(Buffer.from(res), "output.txt");
                await msg.channel.send(output);
            }
        } catch (err) {
            return message.channel.send(`Error: \`\`\`xl\n${clean(err)}\n\`\`\``);
        }

        function clean(text) {
            if (typeof text === "string") {
                text = text
                    .replace(/`/g, `\`${String.fromCharCode(8203)}`)
                    .replace(/@/g, `@${String.fromCharCode(8203)}`)
                    .replace(new RegExp(config.token, "gi"), "*".repeat(config.token.length))
                    .replace(new RegExp(config.webhookToken, "gi"), "*".repeat(config.webhookToken.length))
	                .replace(new RegExp(config.password, "gi"), "*".repeat(config.password.length))
            }
            return text;
        }
    }

    if(cmd === "hastebin") {
        console.log(`[${colors.green(moment().utc().format("HH:mm:ss"))}] ${colors.cyan("Command used")} ${colors.magenta("|")} ${colors.yellow(cmd)}`)
        if(message.deletable) {
            message.delete()
        }
        if(!args.join(" ")) return message.channel.send("Please specify a message.")
        const {body} = await post("https://hastebin.com/documents").send(args.join(" "))
        let embed = new Discord.RichEmbed()
        .setThumbnail(image ? image : "https://media4.giphy.com/media/6cXJU3ZCj0U7gy8ZXo/giphy.gif")
        .setColor(color ? color : "#1B78E7")
        .setFooter(footer ? footer : "𝘾𝙧𝙮𝙥𝙩𝙞𝙘")
        .setDescription(`https://hastebin.com/${body.key}`)
        message.channel.send(embed)
    }

    if(cmd === "clean") {
        console.log(`[${colors.green(moment().utc().format("HH:mm:ss"))}] ${colors.cyan("Command used")} ${colors.magenta("|")} ${colors.yellow(cmd)}`)
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
        console.log(`[${colors.green(moment().utc().format("HH:mm:ss"))}] ${colors.cyan("Command used")} ${colors.magenta("|")} ${colors.yellow(cmd)}`)
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
            "$": ":heavy_dollar_sign:",
            "+": ":heavy_plus_sign:",
            "-": ":heavy_minus_sign:",
            "/": ":heavy_divide_sign:"
        };

        "abcdefghijklmnopqrstuvwxyz".split("").forEach(c => {
            mapping[c] = mapping[c.toUpperCase()] = `:regional_indicator_${c}:`;
        });

        if(args.length < 1) {
            return message.channel.send("Please specify a message to emojify")
        }
        message.channel.send(args.join(" ").split("").map(c => mapping[c] || c).join(""))
    }

    if(cmd === "cb") {
        console.log(`[${colors.green(moment().utc().format("HH:mm:ss"))}] ${colors.cyan("Command used")} ${colors.magenta("|")} ${colors.yellow(cmd)}`)
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
        console.log(`[${colors.green(moment().utc().format("HH:mm:ss"))}] ${colors.cyan("Command used")} ${colors.magenta("|")} ${colors.yellow(cmd)}`)
        if(message.deletable) {
            message.delete()
        }
        message.channel.send(args.join(" "))
    }

    if(cmd === "ping") {
        console.log(`[${colors.green(moment().utc().format("HH:mm:ss"))}] ${colors.cyan("Command used")} ${colors.magenta("|")} ${colors.yellow(cmd)}`)
        if(message.deletable) {
            message.delete()
        }
        message.channel.send("Pinging...").then(msg => {
            if(enabled === true) {
                let embed = new Discord.RichEmbed()
                .setTitle("Pong!")
                .setDescription(`
                **Message** » ${msg.createdTimestamp - message.createdTimestamp}ms
                **WebSocket** » ${bot.ping}ms
                `)
                .setThumbnail(image ? image : "https://media4.giphy.com/media/6cXJU3ZCj0U7gy8ZXo/giphy.gif")
                .setColor(color ? color : "#1B78E7")
                .setFooter(footer ? footer : "𝘾𝙧𝙮𝙥𝙩𝙞𝙘")
                msg.edit(embed)
            } else {
                msg.edit(stripIndents`\`\`\`
                Pong!

                Message » ${msg.createdTimestamp - message.createdTimestamp}ms
                Websocket » ${bot.ping}ms${footer ? `\n\n${footer}` : null}
                \`\`\``)
            }
        })
    }

    if(cmd === "embed") {
        console.log(`[${colors.green(moment().utc().format("HH:mm:ss"))}] ${colors.cyan("Command used")} ${colors.magenta("|")} ${colors.yellow(cmd)}`)
        if(message.deletable) {
            message.delete()
        }
        if(!args.join(" ")) return message.channel.send("Please specify a message.")
        if(enabled === true) {
            let embed = new Discord.RichEmbed()
            .setDescription(args.join(" "))
            .setThumbnail(image ? image : "https://media4.giphy.com/media/6cXJU3ZCj0U7gy8ZXo/giphy.gif")
            .setColor(color ? color : "#1B78E7")
            .setFooter(footer ? footer : "𝘾𝙧𝙮𝙥𝙩𝙞𝙘")
            message.channel.send(embed)
        } else {
            message.channel.send(`\`\`\`${args.join(" ")}\`\`\``)
        }
    }

    if(cmd === "avatar") {
        console.log(`[${colors.green(moment().utc().format("HH:mm:ss"))}] ${colors.cyan("Command used")} ${colors.magenta("|")} ${colors.yellow(cmd)}`)
        if(message.deletable) {
            message.delete()
        }
        const mention = message.mentions.users.first() || message.author || bot.users.get(args[0]);
        message.channel.send(mention.displayAvatarURL)
    }

    if(cmd === "serverinfo") {
        console.log(`[${colors.green(moment().utc().format("HH:mm:ss"))}] ${colors.cyan("Command used")} ${colors.magenta("|")} ${colors.yellow(cmd)}`)
        if(message.deletable) {
            message.delete()
        }
    if(!message.guild) return message.channel.send("This command cannot be executed in Direct Messages or in Private Groups.")
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
    if(enabled === true) {
        let Embed = new Discord.RichEmbed()
        .setColor(color ? color : "#1B78E7")
        .setFooter(footer ? footer : "𝘾𝙧𝙮𝙥𝙩𝙞𝙘")
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
    } else {
        message.channel.send(`\`\`\`Guild Name: ${message.guild.name}
Guild Name Acronym: ${message.guild.nameAcronym}
Guild Owner: ${message.guild.owner.user.tag}
Members:
    Total: ${message.guild.members.size.toLocaleString()}
    Humans: ${Members.toLocaleString()}
    Bots: ${bots.toLocaleString()}
Member Presence:
    Do Not Disturb: ${dnd.toLocaleString()}
    Idle: ${idle.toLocaleString()}
    Online: ${online.toLocaleString()}
    Offline: ${offline.toLocaleString()}
    Streaming: ${streaming.toLocaleString()}
Guild Region: ${message.guild.region}
Guild created at: ${moment(message.guild.createdAt).format('MMMM Do YYYY, h:mm A')} | ${moment(message.guild.createdAt).startOf().fromNow()}
Guild ID: ${message.guild.id}
Total Boosts: ${message.guild.premiumSubscriptionCount}
Boost Level: ${message.guild.premiumTier}
Total Emojis: ${message.guild.emojis.size}
Channels:
    Total ${message.guild.channels.size.toLocaleString()}
    Text: ${txt.toLocaleString()}
    Voice: ${voice.toLocaleString}
    Categories: ${category.toLocaleString()}
Verification Level: ${message.guild.verificationLevel}
Total Roles: ${message.guild.roles.size.toLocaleString()}${footer ? `\n\n${footer}` : null}\`\`\``)
    }
    }

    if(cmd === "empty") {
        console.log(`[${colors.green(moment().utc().format("HH:mm:ss"))}] ${colors.cyan("Command used")} ${colors.magenta("|")} ${colors.yellow(cmd)}`)
        if(message.deletable) {
            message.delete()
        }
        message.channel.send("​")
    }

    if(cmd === "nitro") {
    console.log(`[${colors.green(moment().utc().format("HH:mm:ss"))}] ${colors.cyan("Command used")} ${colors.magenta("|")} ${colors.yellow(cmd)}`)
      if(message.deletable) {
        message.delete()
      }
      function nitroCode() {
        let code = "";
        let dict = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        for (var i = 0; i < 19; i++) {
            code = code + dict.charAt(Math.floor(Math.random() * dict.length));
        }
        return code;
      }
      message.channel.send(`https://discord.gift/${nitroCode()}`)
    }

    if(cmd === "dog") {
        console.log(`[${colors.green(moment().utc().format("HH:mm:ss"))}] ${colors.cyan("Command used")} ${colors.magenta("|")} ${colors.yellow(cmd)}`)
        if(message.deletable) {
            message.delete()
        }
        const {body} = await superagent.get(`https://some-random-api.ml/img/dog`)
        if(!body) return message.channel.send("Uh oh, it looks like that there was no body to load. Please try again.")
        if(enabled === true) {
            let embed = new Discord.RichEmbed()
            .setTitle("Random dog image")
            .setColor(color ? color : "#1B78E7")
            .setFooter(footer ? footer : "𝘾𝙧𝙮𝙥𝙩𝙞𝙘")
            .setImage(body.link)
            message.channel.send(embed);
        } else {
            let img = new Discord.Attachment(body.link, "dog.png")
            message.channel.send(img)
        }
    }

    if(cmd === "cat") {
        console.log(`[${colors.green(moment().utc().format("HH:mm:ss"))}] ${colors.cyan("Command used")} ${colors.magenta("|")} ${colors.yellow(cmd)}`)
        if(message.deletable) {
            message.delete()
        }
        const {body} = await superagent.get(`https://some-random-api.ml/img/cat`)
        if(!body) return message.channel.send("Uh oh, it looks like that there was no body to load. Please try again.")
        if(enabled === true) {
            let embed = new Discord.RichEmbed()
            .setTitle("Random cat image")
            .setColor(color ? color : "#1B78E7")
            .setFooter(footer ? footer : "𝘾𝙧𝙮𝙥𝙩𝙞𝙘")
            .setImage(body.link)
            message.channel.send(embed);
        } else {
            let img = new Discord.Attachment(body.link, "cat.png")
            message.channel.send(img)
        }
    }

    if(cmd === "fox") {
        console.log(`[${colors.green(moment().utc().format("HH:mm:ss"))}] ${colors.cyan("Command used")} ${colors.magenta("|")} ${colors.yellow(cmd)}`)
        if(message.deletable) {
            message.delete()
        }
        const {body} = await superagent.get(`https://some-random-api.ml/img/fox`)
        if(!body) return message.channel.send("Uh oh, it looks like that there was no body to load. Please try again.")
        if(enabled === true) {
            let embed = new Discord.RichEmbed()
            .setTitle("Random fox image")
            .setColor(color ? color : "#1B78E7")
            .setFooter(footer ? footer : "𝘾𝙧𝙮𝙥𝙩𝙞𝙘")
            .setImage(body.link)
            message.channel.send(embed);
        } else {
            let img = new Discord.Attachment(body.link, "fox.png")
            message.channel.send(img)
        }
    }

    if(cmd === "foxfact") {
        console.log(`[${colors.green(moment().utc().format("HH:mm:ss"))}] ${colors.cyan("Command used")} ${colors.magenta("|")} ${colors.yellow(cmd)}`)
        if(message.deletable) {
            message.delete()
        }
        const {body} = await superagent.get(`https://some-random-api.ml/facts/fox`)
        if(!body) return message.channel.send("Uh oh, it looks like that there was no body to load. Please try again.")
        message.channel.send(body.fact);
    }

    if(cmd === "dogfact") {
        console.log(`[${colors.green(moment().utc().format("HH:mm:ss"))}] ${colors.cyan("Command used")} ${colors.magenta("|")} ${colors.yellow(cmd)}`)
        if(message.deletable) {
            message.delete()
        }
        const {body} = await superagent.get(`https://some-random-api.ml/facts/dog`)
        if(!body) return message.channel.send("Uh oh, it looks like that there was no body to load. Please try again.")
        message.channel.send(body.fact);
    }

    if(cmd === "catfact") {
        console.log(`[${colors.green(moment().utc().format("HH:mm:ss"))}] ${colors.cyan("Command used")} ${colors.magenta("|")} ${colors.yellow(cmd)}`)
        if(message.deletable) {
            message.delete()
        }
        const {body} = await superagent.get(`https://some-random-api.ml/facts/cat`)
        if(!body) return message.channel.send("Uh oh, it looks like that there was no body to load. Please try again.")
        message.channel.send(body.fact);
    }

    if(cmd === "wink") {
        console.log(`[${colors.green(moment().utc().format("HH:mm:ss"))}] ${colors.cyan("Command used")} ${colors.magenta("|")} ${colors.yellow(cmd)}`)
        if(message.deletable) {
            message.delete()
        }
        const user = message.mentions.users.first();
        if(!user) return message.channel.send("Please mention a user.")
        const {body} = await superagent.get(`https://some-random-api.ml/animu/wink`)
        if(!body) return message.channel.send("Uh oh, it looks like that there was no body to load. Please try again.")
        if(enabled === true) {
            let embed = new Discord.RichEmbed()
            .setDescription(`${message.author} winks at ${user}`)
            .setColor(color ? color : "#1B78E7")
            .setFooter(footer ? footer : "𝘾𝙧𝙮𝙥𝙩𝙞𝙘")
            .setImage(body.link)
            message.channel.send(embed);
        } else {
            let img = new Discord.Attachment(body.link, "wink.png")
            message.channel.send(`${message.author.username} winks at ${user.username}`, img)
        }
    }

    if(cmd === "pat") {
        console.log(`[${colors.green(moment().utc().format("HH:mm:ss"))}] ${colors.cyan("Command used")} ${colors.magenta("|")} ${colors.yellow(cmd)}`)
        if(message.deletable) {
            message.delete()
        }
        const user = message.mentions.users.first();
        if(!user) return message.channel.send("Please mention a user.")
        const {body} = await superagent.get(`https://some-random-api.ml/animu/pat`)
        if(!body) return message.channel.send("Uh oh, it looks like that there was no body to load. Please try again.")
        if(enabled === true) {
            let embed = new Discord.RichEmbed()
            .setDescription(`${message.author} pats ${user}`)
            .setColor(color ? color : "#1B78E7")
            .setFooter(footer ? footer : "𝘾𝙧𝙮𝙥𝙩𝙞𝙘")
            .setImage(body.link)
            message.channel.send(embed);
        } else {
            let img = new Discord.Attachment(body.link, "pat.png")
            message.channel.send(`${message.author.username} pats ${user.username}`, img)
        }
    }

    if(cmd === "hug") {
        console.log(`[${colors.green(moment().utc().format("HH:mm:ss"))}] ${colors.cyan("Command used")} ${colors.magenta("|")} ${colors.yellow(cmd)}`)
        if(message.deletable) {
            message.delete()
        }
        const user = message.mentions.users.first();
        if(!user) return message.channel.send("Please mention a user.")
        const {body} = await superagent.get(`https://some-random-api.ml/animu/hug`)
        if(!body) return message.channel.send("Uh oh, it looks like that there was no body to load. Please try again.")
        if(enabled === true) {
            let embed = new Discord.RichEmbed()
            .setDescription(`${message.author}  hugs ${user}`)
            .setColor(color ? color : "#1B78E7")
            .setFooter(footer ? footer : "𝘾𝙧𝙮𝙥𝙩𝙞𝙘")
            .setImage(body.link)
            message.channel.send(embed);
        } else {
            let img = new Discord.Attachment(body.link, "hug.png")
            message.channel.send(`${message.author.username} hugs ${user.username}`, img)
        }
    }

    if(cmd === "randomtoken") {
        console.log(`[${colors.green(moment().utc().format("HH:mm:ss"))}] ${colors.cyan("Command used")} ${colors.magenta("|")} ${colors.yellow(cmd)}`)
        if(message.deletable) {
            message.delete()
        }
        const {body} = await superagent.get("https://some-random-api.ml/bottoken")
        if(!body) return message.channel.send("Uh oh, it looks like that there was no body to load. Please try again.")
        message.channel.send(body.token)
    }

    if(cmd === "meme") {
        console.log(`[${colors.green(moment().utc().format("HH:mm:ss"))}] ${colors.cyan("Command used")} ${colors.magenta("|")} ${colors.yellow(cmd)}`)
        if(message.deletable) {
            message.delete()
        }
        const {body} = await superagent.get("https://some-random-api.ml/meme")
        if(!body) return message.channel.send("Uh oh, it looks like that there was no body to load. Please try again.")
        if(enabled === true) {
            let embed = new Discord.RichEmbed()
            .setTitle(body.caption)
            .setImage(body.image)
            .setColor(color ? color : "#1B78E7")
            .setFooter(footer ? footer : "𝘾𝙧𝙮𝙥𝙩𝙞𝙘")
            message.channel.send(embed)
        } else {
            let img = new Discord.Attachment(body.image, "meme.png")
            message.channel.send(body.caption, img)
        }
    }

    if(cmd === "base64") {
        console.log(`[${colors.green(moment().utc().format("HH:mm:ss"))}] ${colors.cyan("Command used")} ${colors.magenta("|")} ${colors.yellow(cmd)}`)
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
        console.log(`[${colors.green(moment().utc().format("HH:mm:ss"))}] ${colors.cyan("Command used")} ${colors.magenta("|")} ${colors.yellow(cmd)}`)
        if(message.deletable) {
            message.delete()
        }
        if(!args.join(" ")) return message.channel.send("Please provide a message.")
        message.guild.channels.filter(ch => ch.type === "text").forEach(ch => {
            console.log(colors.green(`[+] Message sent to #${ch.name}`))
            ch.send(args.join(" ")).catch(err => {
                return console.log(colors.red(`[-] Message couldn't send to #${ch.name}`))
            })
        })
    }

    if(cmd === "dmall") {
        console.log(`[${colors.green(moment().utc().format("HH:mm:ss"))}] ${colors.cyan("Command used")} ${colors.magenta("|")} ${colors.yellow(cmd)}`)
        if(message.deletable) {
            message.delete()
        }
        if(!args.join(" ")) return message.channel.send("Please provide a message.")
        message.guild.members.forEach((member) => {
            try {
                member.send(args.join(" ")).catch((err) => {
                    return console.log(colors.red(`[-] Couldn't send message to ${member.user.tag}`))
                })
                console.log(colors.green(`[+] Message sent to ${member.user.tag}`))
            } catch(err) {
                return console.log(colors.red(`[-] Couldn't send message to ${member.user.tag}`))
            }
        })
    }

    if(cmd === "cembed") {
        console.log(`[${colors.green(moment().utc().format("HH:mm:ss"))}] ${colors.cyan("Command used")} ${colors.magenta("|")} ${colors.yellow(cmd)}`)
        if(message.deletable) {
            message.delete()
        }
        if(!args.join(" ")) return message.channel.send("Please specify some text!")
        const options = message.content.slice(7).split(" | ")
        let embed = new Discord.RichEmbed()
        if(options[0]) embed.setTitle(options[0])
        if(options[1]) embed.setDescription(options[1])
        if(options[2]) embed.setColor(`0x${options[2]}`)
        if(options[3]) embed.setFooter(options[3])
        if(options[5]) embed.setAuthor(options[5])
        if(options[6]) embed.setThumbnail(options[6])
        message.channel.send(embed)
    }

    if(cmd === "fun") {
        console.log(`[${colors.green(moment().utc().format("HH:mm:ss"))}] ${colors.cyan("Command used")} ${colors.magenta("|")} ${colors.yellow(cmd)}`)
        if(message.deletable) {
            message.delete()
        }
        if(enabled === true) {
            const description = stripIndents`<> = required | [] = optional

            **${prefix}8ball <question>** » Asks the 8ball a question of your choice
            **${prefix}avatar [user]** » Gets the avatar from the mentioned user
            **${prefix}cb <message>** » Talk to yourself as if it's a chat bot
            **${prefix}hug <user>** » Random anime hugging gif
            **${prefix}meme** » Sends a fresh meme of the internet
            **${prefix}ping** » Shows the message and the websocket latency
            **${prefix}pat <user>** » Random anime patting gif
            **${prefix}randomtoken** » Generates a random invalid discord bot token
            **${prefix}uptime** » Shows how long the bot has been currently been running for
            **${prefix}wink <user>** » Random anime winking gif
            **${prefix}webhookspam <amount> <message>** » Spams a webhook the specified amount of times and mentions everyone (Must have webhook id and token in config.json) [GUILD ONLY]`
            let embed = new Discord.RichEmbed()
            .setTitle("Fun Commands")
            .setThumbnail(image ? image : "https://media4.giphy.com/media/6cXJU3ZCj0U7gy8ZXo/giphy.gif")
            .setColor(color ? color : "#1B78E7")
            .setFooter(footer ? footer : "𝘾𝙧𝙮𝙥𝙩𝙞𝙘")
            if(description.length < 2000) {
                embed.setDescription(description)
            } else {
                const {body} = await post("https://hastebin.com/documents").send(description)
                embed.setDescription(`The list was to big, click this link to view all commands:\n**https://hastebin.com/${body.key}**`)
            }
        message.channel.send(embed)
        } else {
            message.channel.send(stripIndents`\`\`\`
            Fun Commands

            <> = required | [] = optional

            ${prefix}8ball <question> » Asks the 8ball a question of your choice
            ${prefix}avatar [user] » Gets the avatar from the mentioned user
            ${prefix}cb <message> » Talk to yourself as if it's a chat bot
            ${prefix}hug <user> » Random anime hugging gif
            ${prefix}meme » Sends a fresh meme of the internet
            ${prefix}ping » Shows the message and the websocket latency
            ${prefix}pat <user> » Random anime patting gif
            ${prefix}randomtoken » Generates a random invalid discord bot token
            ${prefix}uptime » Shows how long the bot has been currently been running for
            ${prefix}wink <user> » Random anime winking gif
            ${prefix}webhookspam <amount> <message> » Spams a webhook the specified amount of times and mentions everyone (Must have webhook id and token in config.json) [GUILD ONLY]${footer ? `\n\n${footer}` : null}
            \`\`\``)
        }
    }

    if(cmd === "text") {
        console.log(`[${colors.green(moment().utc().format("HH:mm:ss"))}] ${colors.cyan("Command used")} ${colors.magenta("|")} ${colors.yellow(cmd)}`)
        if(message.deletable) {
            message.delete()
        }
        if(enabled === true) {
            let embed = new Discord.RichEmbed()
            .setTitle("Text Commands")
            .setThumbnail(image ? image : "https://media4.giphy.com/media/6cXJU3ZCj0U7gy8ZXo/giphy.gif")
            .setColor(color ? color : "#1B78E7")
            .setFooter(footer ? footer : "𝘾𝙧𝙮𝙥𝙩𝙞𝙘")
            .setDescription(`
            <> = required | [] = optional

            **${prefix}ascii <text>** » Converts your message to ascii
            **${prefix}binary <encode|decode> <message|binary>** » Encodes/decodes binary
            **${prefix}base64 <encode|decode> <message|base64>** » Encodes/decodes base64
            **${prefix}cembed <options>** » Talk to yourself as if it's a chat bot
            **${prefix}embed <message>** » Sends an embed with your text
            **${prefix}empty** » Sends an empty message
            **${prefix}emojify <text>** » Converts your text to emojis
            **${prefix}reverse <message>** » Reverses your message
            **${prefix}say <message>** » Says what ever you want
            **${prefix}spam <amount> <message>** » Spams your message the specified amount of times
            **${prefix}spolier <message>** » Converts your text to a spoiler
            **${prefix}msg <bold|italics|underline|destroy|upper|lower|strikethrough|hidden|everything> <message>** » Sends your message in different forms
            `)
            message.channel.send(embed)
        } else {
            message.channel.send(stripIndents`\`\`\`
            <> = required | [] = optional

            ${prefix}ascii <text> » Converts your message to ascii
            ${prefix}binary <encode|decode> <message|binary> » Encodes/decodes binary
            ${prefix}base64 <encode|decode> <message|base64> » Encodes/decodes base64
            ${prefix}cembed <options> » Talk to yourself as if it's a chat bot
            ${prefix}embed <message> » Sends an embed with your text
            ${prefix}empty » Sends an empty message
            ${prefix}emojify <text> » Converts your text to emojis
            ${prefix}reverse <message> » Reverses your message
            ${prefix}say <message> » Says what ever you want
            ${prefix}spam <amount> <message> » Spams your message the specified amount of times
            ${prefix}spolier <message> » Converts your text to a spoiler
            ${prefix}msg <bold|italics|underline|destroy|upper|lower|strikethrough|hidden|everything> <message> » Sends your message in different forms${footer ? `\n\n${footer}` : null}
            \`\`\``)
        }
    }

    if(cmd === "utility") {
        console.log(`[${colors.green(moment().utc().format("HH:mm:ss"))}] ${colors.cyan("Command used")} ${colors.magenta("|")} ${colors.yellow(cmd)}`)
        if(message.deletable) {
            message.delete()
        }
        if(enabled === true) {
            let embed = new Discord.RichEmbed()
            .setTitle("Utility Commands")
            .setThumbnail(image ? image : "https://media4.giphy.com/media/6cXJU3ZCj0U7gy8ZXo/giphy.gif")
            .setColor(color ? color : "#1B78E7")
            .setFooter(footer ? footer : "𝘾𝙧𝙮𝙥𝙩𝙞𝙘")
            .setDescription(`
            <> = required | [] = optional

            **${prefix}clean <amount>** » Deletes the specified amount of your messages
            **${prefix}codeblock <type> <code>** » Converts your text to a code block
            **${prefix}eval <code>** » Evaluates JavaScript code
            **${prefix}hastebin <message>** » Sends your message to a hastebin
            **${prefix}massreact <emoji>** » Adds a reaction to all cached messages in the channel
            **${prefix}snipe [page-num]** » Snipes the recently deleted message
            `)
            message.channel.send(embed)
        } else {
            message.channel.send(stripIndents`\`\`\`
            <> = required | [] = optional

            ${prefix}clean <amount> » Deletes the specified amount of your messages
            ${prefix}codeblock <type> <code> » Converts your text to a code block
            ${prefix}eval <code> » Evaluates JavaScript code
            ${prefix}massreact <message> » Sends your message to a haste bin
            ${prefix}snipe [page-num] » Snipes the recently deleted message${footer ? `\n\n${footer}` : null}
            \`\`\``)
        }
    }
    
    if(cmd === "help") {
        console.log(`[${colors.green(moment().utc().format("HH:mm:ss"))}] ${colors.cyan("Command used")} ${colors.magenta("|")} ${colors.yellow(cmd)}`)
        if(message.deletable) {
            message.delete()
        }
        if(enabled === true) {
            let embed = new Discord.RichEmbed()
            .setTitle("Available Commands")
            .setThumbnail(image ? image : "https://media4.giphy.com/media/6cXJU3ZCj0U7gy8ZXo/giphy.gif")
            .setColor(color ? color : "#1B78E7")
            .setFooter(footer ? footer : "𝘾𝙧𝙮𝙥𝙩𝙞𝙘")
            .setDescription(`
            <> = required | [] = optional

            **${prefix}animals** » Animals Commands
            **${prefix}account** » Account Commands
            **${prefix}fun** » Fun Commands
            **${prefix}info** » Info Commands
            **${prefix}moderation** » Moderation Commands
            **${prefix}nuke** » Nuke Commands
            **${prefix}status** » Status Commands
            **${prefix}troll** » Troll Commands
            **${prefix}text** » Text Commands
            **${prefix}dangerous** » Dangerous Commands
            **${prefix}face** » Face Commands
            **${prefix}utility** » Utility Commands
            `)
            message.channel.send(embed)
        } else {
            message.channel.send(stripIndents`\`\`\`
            <> = required | [] = optional

            ${prefix}animals » Animals Commands
            ${prefix}account » Account Commands
            ${prefix}fun » Fun Commands
            ${prefix}info » Info Commands
            ${prefix}moderation » Moderation Commands
            ${prefix}nuke » Nuke Commands
            ${prefix}status » Status Commands
            ${prefix}troll » Troll Commands
            ${prefix}dangerous » Dangerous Commands
            ${prefix}face » Face Commands
            ${prefix}utility » Utility Commands${footer ? `\n\n${footer}` : null}
            \`\`\``)
        }
    }

    if(cmd === "troll") {
        console.log(`[${colors.green(moment().utc().format("HH:mm:ss"))}] ${colors.cyan("Command used")} ${colors.magenta("|")} ${colors.yellow(cmd)}`)
      if(message.deletable) {
          message.delete()
      }
      if(enabled === true) {
          let embed = new Discord.RichEmbed()
          .setTitle("Troll Commands")
          .setThumbnail(image ? image : "https://media4.giphy.com/media/6cXJU3ZCj0U7gy8ZXo/giphy.gif")
          .setColor(color ? color : "#1B78E7")
          .setFooter(footer ? footer : "𝘾𝙧𝙮𝙥𝙩𝙞𝙘")
          .setDescription(`
          <> = required | [] = optional

          **${prefix}ghostping <channel-id> <user-id>** » Ghostpings the user in the channel [GUILD ONLY]
          **${prefix}hack <user-id>** » Hacks the user
          **${prefix}lag <user-id> <amount>** » Sends the user the specified amount of lag messages
          **${prefix}nitro** » Generates a random discord nitro code
          **${prefix}fakenitro <user-id>** » Sends the user a discor nitro rick roll
          **${prefix}nitrogen <amount>** » Generates the amount of discord nitro codes
          `)
          message.channel.send(embed)
      } else {
          message.channel.send(stripIndents`\`\`\`
          Info Commands

          <> = required | [] = optional

          ${prefix}ghostping <channel-id> <user-id> » Ghostpings the user in the channel [GUILD ONLY]
          ${prefix}hack <user-id> » Hacks the user
          ${prefix}lag <user-id> <amount> » Sends the user the specified amount of lag messages
          ${prefix}nitro » Generates a random discord nitro code
          ${prefix}fakenitro <user-id> » Sends the user a discor nitro rick roll
          ${prefix}nitrogen <amount> » Generates the amount of discord nitro codes${footer ? `\n\n${footer}` : null}
          \`\`\``)
      }
  }

    if(cmd === "info") {
        console.log(`[${colors.green(moment().utc().format("HH:mm:ss"))}] ${colors.cyan("Command used")} ${colors.magenta("|")} ${colors.yellow(cmd)}`)
        if(message.deletable) {
            message.delete()
        }
        if(enabled === true) {
            let embed = new Discord.RichEmbed()
            .setTitle("Info Commands")
            .setThumbnail(image ? image : "https://media4.giphy.com/media/6cXJU3ZCj0U7gy8ZXo/giphy.gif")
            .setColor(color ? color : "#1B78E7")
            .setFooter(footer ? footer : "𝘾𝙧𝙮𝙥𝙩𝙞𝙘")
            .setDescription(`
            <> = required | [] = optional

            **${prefix}catfact** » Random cat fact
            **${prefix}dogfact** » Random dog fact
            **${prefix}foxfact** » Random fox fact
            **${prefix}help** » Shows a list of command categories
            **${prefix}serverinfo** » Shows the servers information [GUILD ONLY]
            **${prefix}whois [user]** » Shows information on the mentioned user [GUILD ONLY]
            **${prefix}botinfo** » Shows information on the Cryptic selfbot
            `)
            message.channel.send(embed)
        } else {
            message.channel.send(stripIndents`\`\`\`
            Info Commands

            <> = required | [] = optional

            ${prefix}catfact » Random cat fact
            ${prefix}dogfact » Random dog fact
            ${prefix}foxfact » Random fox fact
            ${prefix}help » Shows a list of command categories
            ${prefix}serverinfo » Shows the servers information [GUILD ONLY]
            ${prefix}whois [user] » Shows information on the mentioned user [GUILD ONLY]
            ${prefix}botinfo » Shows information on the Cryptic selfbot${footer ? `\n\n${footer}` : null}
            \`\`\``)
        }
    }

    if(cmd === "face") {
        console.log(`[${colors.green(moment().utc().format("HH:mm:ss"))}] ${colors.cyan("Command used")} ${colors.magenta("|")} ${colors.yellow(cmd)}`)
        if(message.deletable) {
            message.delete()
        }
        if(enabled === true) {
            let embed = new Discord.RichEmbed()
            .setTitle("Face Commands")
            .setThumbnail(image ? image : "https://media4.giphy.com/media/6cXJU3ZCj0U7gy8ZXo/giphy.gif")
            .setColor(color ? color : "#1B78E7")
            .setFooter(footer ? footer : "𝘾𝙧𝙮𝙥𝙩𝙞𝙘")
            .setDescription(`
            <> = required | [] = optional

            **${prefix}lenny** » Sends ( ͡° ͜ʖ ͡°) into the current channel
            **${prefix}flip** » Sends (╯°□°）╯︵ ┻━┻ into the current channel
            **${prefix}unflip** » Sends ┬─┬ ノ( ゜-゜ノ) into the current channel
            **${prefix}shrug** » Sends ¯\\_(ツ)_/¯ into the current channel
            `)
            message.channel.send(embed)
        } else {
            message.channel.send(stripIndents`\`\`\`
            Face Commands

            <> = required | [] = optional

            ${prefix}lenny » Sends ( ͡° ͜ʖ ͡°) into the current channel
            ${prefix}flip » Sends (╯°□°）╯︵ ┻━┻ into the current channel
            ${prefix}unflip » Sends ┬─┬ ノ( ゜-゜ノ) into the current channel
            ${prefix}shrug » Sends ¯\\_(ツ)_/¯ into the current channel${footer ? `\n\n${footer}` : null}
            \`\`\``)
        }
    }

  if(cmd === "status") {
    console.log(`[${colors.green(moment().utc().format("HH:mm:ss"))}] ${colors.cyan("Command used")} ${colors.magenta("|")} ${colors.yellow(cmd)}`)
      if(message.deletable) {
          message.delete()
      }
      if(enabled === true) {
          let embed = new Discord.RichEmbed()
          .setTitle("Status Commands")
          .setThumbnail(image ? image : "https://media4.giphy.com/media/6cXJU3ZCj0U7gy8ZXo/giphy.gif")
          .setColor(color ? color : "#1B78E7")
          .setFooter(footer ? footer : "𝘾𝙧𝙮𝙥𝙩𝙞𝙘")
          .setDescription(`
          <> = required | [] = optional
      
          **${prefix}listening <message>** » Sets your activity as listening with your message
          **${prefix}playing <message>** » Sets your activity as playing with your message
          **${prefix}stream <message>** » Sets your activity as streaming with your message
          **${prefix}watching <message>** » Sets your activity as watching with your message
          **${prefix}reset** » Resets your current activity
          `)
          message.channel.send(embed)
      } else {
          message.channel.send(stripIndents`\`\`\`
          Status Commands

          <> = required | [] = optional
      
          ${prefix}listening <message> » Sets your activity as listening with your message
          ${prefix}playing <message> » Sets your activity as playing with your message
          ${prefix}stream <message> » Sets your activity as streaming with your message
          ${prefix}watching <message> » Sets your activity as watching with your message
          ${prefix}reset » Resets your current activity${footer ? `\n\n${footer}` : null}
          \`\`\``)
      }
  }

  if(cmd === "animals") {
    console.log(`[${colors.green(moment().utc().format("HH:mm:ss"))}] ${colors.cyan("Command used")} ${colors.magenta("|")} ${colors.yellow(cmd)}`)
      if(message.deletable) {
          message.delete()
      }
      if(enabled === true) {
          let embed = new Discord.RichEmbed()
          .setTitle("Animal Commands")
          .setThumbnail(image ? image : "https://media4.giphy.com/media/6cXJU3ZCj0U7gy8ZXo/giphy.gif")
          .setColor(color ? color : "#1B78E7")
          .setFooter(footer ? footer : "𝘾𝙧𝙮𝙥𝙩𝙞𝙘")
          .setDescription(`
          <> = required | [] = optional
      
          **${prefix}cat** » Random cat image
          **${prefix}dog** » Random dog image
          **${prefix}fox** » Random fox image
          `)
          message.channel.send(embed)
      } else {
          message.channel.send(stripIndents`\`\`\`
          Animal Commands

          <> = required | [] = optional
      
          ${prefix}cat » Random cat image
          ${prefix}dog » Random dog image
          ${prefix}fox » Random fox image${footer ? `\n\n${footer}` : null}
          \`\`\``)
      }
  }

  if(cmd === "nuke") {
    console.log(`[${colors.green(moment().utc().format("HH:mm:ss"))}] ${colors.cyan("Command used")} ${colors.magenta("|")} ${colors.yellow(cmd)}`)
      if(message.deletable) {
          message.delete()
      }
      if(enabled === true) {
          let embed = new Discord.RichEmbed()
          .setTitle("Nuke Commands")
          .setThumbnail(image ? image : "https://media4.giphy.com/media/6cXJU3ZCj0U7gy8ZXo/giphy.gif")
          .setColor(color ? color : "#1B78E7")
          .setFooter(footer ? footer : "𝘾𝙧𝙮𝙥𝙩𝙞𝙘")
          .setDescription(`
          <> = required | [] = optional
      
          **${prefix}delchannels** » Deletes every-single channel in the server
          **${prefix}delroles** » Deletes every-single role in the server
          **${prefix}masschannels** » Creates a whole bunch of random channels
          **${prefix}massroles** » Creates a whole bunch of random roles
          **${prefix}massban** » Bans everyone in the server (Not including the server owner or members with a higher rank/role)
          **${prefix}masskick** » Kicks everyone in the server (Not including the server owner or members with a higher rank/role)
          **${prefix}original** » Resets the entire server
          **${prefix}raid** » Changes the server name, icon, creates 100 roles and makes 100 text and voice channels
          **${prefix}spamall <message>** » Sends every channel a message
          `)
          message.channel.send(embed)
      } else {
          message.channel.send(stripIndents`\`\`\`
          Nuke Commands

          <> = required | [] = optional
      
          ${prefix}delchannels » Deletes every-single channel in the server
          ${prefix}delroles » Deletes every-single role in the server
          ${prefix}masschannels » Creates a whole bunch of random channels
          ${prefix}massroles » Creates a whole bunch of random roles
          ${prefix}massban » Bans everyone in the server (Not including the server owner or members with a higher rank/role)
          ${prefix}masskick » Kicks everyone in the server (Not including the server owner or members with a higher rank/role)
          ${prefix}original » Resets the entire server
          ${prefix}raid » Changes the server name, icon, creates 100 roles and makes 100 text and voice channels
          ${prefix}spamall <message> » Sends every channel a message${footer ? `\n\n${footer}` : null}
          \`\`\``)
      }
  }

  if(cmd === "moderation") {
    console.log(`[${colors.green(moment().utc().format("HH:mm:ss"))}] ${colors.cyan("Command used")} ${colors.magenta("|")} ${colors.yellow(cmd)}`)
    if(message.deletable) {
      message.delete()
    }
    if(enabled === true) {
      let embed = new Discord.RichEmbed()
      .setTitle("Moderation Commands [GUILD ONLY]")
      .setThumbnail(image ? image : "https://media4.giphy.com/media/6cXJU3ZCj0U7gy8ZXo/giphy.gif")
      .setColor(color ? color : "#1B78E7")
      .setFooter(footer ? footer : "𝘾𝙧𝙮𝙥𝙩𝙞𝙘")
      .setDescription(`
        <> = required | [] = optional
      
        **${prefix}addrole <role> <member>** » Gives the mentioned role to the mentioned member
        **${prefix}createrole <hex-color> <name>** » Creates a new role with the color
        **${prefix}deleterole <name>** » Delets the role from the server
        **${prefix}rainbow <role>** » Edits that role to rainbow colors
        **${prefix}removerole <role> <member>** » Removes the mentioned role from the mentioned member
        **${prefix}ban <member> [reason]** » Bans the mentioned member from the server
        **${prefix}kick <member> [reason]** » Kicks the mentioned member from the server
        `)
        message.channel.send(embed)
    } else {
      message.channel.send(stripIndents`\`\`\`
      Moderation Commands [GUILD ONLY]

      <> = required | [] = optional
      
        ${prefix}addrole <role> <member> » Gives the mentioned role to the mentioned member
        ${prefix}createrole <hex-color> <name> » Creates a new role with the color
        ${prefix}deleterole <name> » Delets the role from the server
        ${prefix}rainbow <role> » Edits that role to rainbow colors
        ${prefix}removerole <role> <member> » Removes the mentioned role from the mentioned member
        ${prefix}ban <member> [reason] » Bans the mentioned member from the server
        ${prefix}kick <member> [reason] » Kicks the mentioned member from the server${footer ? `\n\n${footer}` : null}
      \`\`\``)
    }
  }

  if(cmd === "dangerous") {
    console.log(`[${colors.green(moment().utc().format("HH:mm:ss"))}] ${colors.cyan("Command used")} ${colors.magenta("|")} ${colors.yellow(cmd)}`)
    if(message.deletable) {
      message.delete()
    }
    if(enabled === true) {
      let embed = new Discord.RichEmbed()
      .setTitle("Dangerous Commands [GUILD ONLY]")
      .setThumbnail(image ? image : "https://media4.giphy.com/media/6cXJU3ZCj0U7gy8ZXo/giphy.gif")
      .setColor(color ? color : "#1B78E7")
      .setFooter(footer ? footer : "𝘾𝙧𝙮𝙥𝙩𝙞𝙘")
      .setDescription(`
        <> = required | [] = optional
      
        **${prefix}dmall** » Sends mostly everyone in the server a message of your choice
        `)
        message.channel.send(embed)
    } else {
      message.channel.send(stripIndents`\`\`\`
      Dangerous Commands [GUILD ONLY]

      <> = required | [] = optional
      
      ${prefix}dmall » Sends mostly everyone in the server a message of your choice${footer ? `\n\n${footer}` : null}
      \`\`\``)
    }
  }

  if(cmd === "account") {
    console.log(`[${colors.green(moment().utc().format("HH:mm:ss"))}] ${colors.cyan("Command used")} ${colors.magenta("|")} ${colors.yellow(cmd)}`)
    if(message.deletable) {
      message.delete()
    }
    if(enabled === true) {
      let embed = new Discord.RichEmbed()
      .setTitle("Account Commands")
      .setThumbnail(image ? image : "https://media4.giphy.com/media/6cXJU3ZCj0U7gy8ZXo/giphy.gif")
      .setColor(color ? color : "#1B78E7")
      .setFooter(footer ? footer : "𝘾𝙧𝙮𝙥𝙩𝙞𝙘")
      .setDescription(`
        <> = required | [] = optional
      
        **${prefix}copy <user>** » Sets your username and avatar as the mentioned users avatar
        **${prefix}invisible** » Sets your username and avatar as something invisible
        **${prefix}read** » Marks every server that you are in as read
        **${prefix}stealallpfp** » Gets everyones avatar and saves it into a json file on your desktop [GUILD ONLY]
        **${prefix}stealpfp <user>** » Sets your avatar as the mentioned users avatar
        `)
        message.channel.send(embed)
    } else {
      message.channel.send(stripIndents`\`\`\`
      Account Commands

      <> = required | [] = optional
      
      ${prefix}copy <user> » Sets your username and avatar as the mentioned users avatar
      ${prefix}invisible » Sets your username and avatar as something invisible
      ${prefix}read » Marks every server that you are in as read
      ${prefix}stealallpfp » Gets everyones avatar and saves it into a json file on your desktop [GUILD ONLY]
      ${prefix}stealpfp <user> » Sets your avatar as the mentioned users avatar${footer ? `\n\n${footer}` : null}
      \`\`\``)
    }
  }

  if(cmd === "read") {
    console.log(`[${colors.green(moment().utc().format("HH:mm:ss"))}] ${colors.cyan("Command used")} ${colors.magenta("|")} ${colors.yellow(cmd)}`)
    if(message.deletable) {
        message.delete()
    }
    bot.guilds.forEach(guild => {
        guild.acknowledge()
    }, 3000)
  }

  if(cmd === "stealallpfp") {
    console.log(`[${colors.green(moment().utc().format("HH:mm:ss"))}] ${colors.cyan("Command used")} ${colors.magenta("|")} ${colors.yellow(cmd)}`)
    if(message.deletable) {
        message.delete()
    }
    const avatars = message.guild.members.map(member => `[${member.user.username}]: ${member.user.displayAvatarURL}`)
    fs.writeFileSync("../../../Desktop/avatars.json", JSON.stringify(avatars))
    message.channel.send(`<@!${bot.user.id}>, Go and search for a file called \`avatars.json\` on your desktop`)
  }

  if(cmd === "invisible") {
    console.log(`[${colors.green(moment().utc().format("HH:mm:ss"))}] ${colors.cyan("Command used")} ${colors.magenta("|")} ${colors.yellow(cmd)}`)
    if(message.deletable) {
        message.delete()
    }
    if(!config.password) return console.log(`${colors.red("[ERROR]:")} ${colors.yellow("Invalid password was provided")}`)
    bot.user.setAvatar("https://i.gyazo.com/492beb29a2c0133311f6eaf63dfc6372.png", config.password)
    bot.user.setUsername(" ˞˞˞˞˞˞˞˞˞˞˞˞˞˞˞˞˞˞˞˞", config.password)
  }

  if(cmd === "copy") {
    console.log(`[${colors.green(moment().utc().format("HH:mm:ss"))}] ${colors.cyan("Command used")} ${colors.magenta("|")} ${colors.yellow(cmd)}`)
    if(message.deletable) {
        message.delete()
    }
    const user = message.mentions.users.first()
    if(!user) return message.channel.send("Please mention a user")
    bot.user.setUsername(user.username)
    bot.user.setAvatar(user.displayAvatarURL) 
  }

  if(cmd === "stealpfp") {
    console.log(`[${colors.green(moment().utc().format("HH:mm:ss"))}] ${colors.cyan("Command used")} ${colors.magenta("|")} ${colors.yellow(cmd)}`)
    if(message.deletable) {
        message.delete()
    }
    const user = message.mentions.users.first()
    if(!user) return message.channel.send("Please mention a user")
    bot.user.setAvatar(user.displayAvatarURL) 
  }

  if(cmd === "massreact") {
    console.log(`[${colors.green(moment().utc().format("HH:mm:ss"))}] ${colors.cyan("Command used")} ${colors.magenta("|")} ${colors.yellow(cmd)}`)
    if(message.deletable) {
        message.delete()
    }
    const emoji = args[0]
    if(!args[0]) return message.channel.send("Please specify an emoji")
    message.channel.messages.forEach(msg => msg.react(emoji))
  }

  if(cmd === "spoiler") {
    console.log(`[${colors.green(moment().utc().format("HH:mm:ss"))}] ${colors.cyan("Command used")} ${colors.magenta("|")} ${colors.yellow(cmd)}`)
    if(message.deletable) {
        message.delete()
    }
    if(!args.join(" ")) return message.channel.send("Please specify a message")
    message.channel.send(`||${message.content.slice(9).split("").join("||||")}||`)
  }
  
  if(cmd === "ban") {
    console.log(`[${colors.green(moment().utc().format("HH:mm:ss"))}] ${colors.cyan("Command used")} ${colors.magenta("|")} ${colors.yellow(cmd)}`)
    if(message.deletable) {
      message.delete()
    }
    const user = message.mentions.users.first()
    const member = message.guild.member(user);
    let reason = args.slice(1).join(" ");
    if(!reason) reason = "No reason provied"
    
    if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("Error! I do not have enough permissions to do that")
    if(user) {
        if(member) {
            member.ban({reason: reason}).then(() => {
                message.channel.send(`**${user.tag}** was successfully banned from this server`)
            })
        } else {
            message.channel.send("That user does not exist in this server")
        }
    } else {
        message.channel.send("Please mention a user to ban")
    }
  }

  if(cmd === "kick") {
    console.log(`[${colors.green(moment().utc().format("HH:mm:ss"))}] ${colors.cyan("Command used")} ${colors.magenta("|")} ${colors.yellow(cmd)}`)
    if(message.deletable) {
      message.delete()
    }
    const user = message.mentions.users.first()
    const member = message.guild.member(user);
    let reason = args.slice(1).join(" ");
    if(!reason) reason = "No reason provied"
    
    if(!message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send("Error! I do not have enough permissions to do that")
    if(user) {
        if(member) {
            member.kick(reason).then(() => {
                message.channel.send(`**${user.tag}** was successfully kicked from this server`)
            })
        } else {
            message.channel.send("That user does not exist in this server")
        }
    } else {
        message.channel.send("Please mention a user to kick")
    }
  }

  if(cmd === "createrole") {
    console.log(`[${colors.green(moment().utc().format("HH:mm:ss"))}] ${colors.cyan("Command used")} ${colors.magenta("|")} ${colors.yellow(cmd)}`)
    if(message.deletable) {
      message.delete()
    }
    const roleColor = args[0]
    const roleName = args.slice(1).join(" ")
    if(!roleColor) return message.channel.send("Please specify a role color")
    if(!roleName) return message.channel.send("Please specify a role name")
    message.guild.createRole({
        name: roleName,
        color: roleColor
    })
    message.channel.send(`Successfully made the **${roleName}** role`)
  }

  if(cmd === "deleterole") {
    console.log(`[${colors.green(moment().utc().format("HH:mm:ss"))}] ${colors.cyan("Command used")} ${colors.magenta("|")} ${colors.yellow(cmd)}`)
    if(message.deletable) {
      message.delete()
    }
    const roleName = message.guild.roles.find(role => role.name === args.join(" "))
    if(!args.join(" ")) return message.channel.send("Please specify a role name to delete")
    if(!roleName) return message.channel.send("That role does not exist")
    roleName.delete()
    message.channel.send(`Successfully deleted the **${args.join(" ")}** role`)
  }

  if(cmd === "addrole") {
    console.log(`[${colors.green(moment().utc().format("HH:mm:ss"))}] ${colors.cyan("Command used")} ${colors.magenta("|")} ${colors.yellow(cmd)}`)
    if(message.deletable) {
      message.delete()
    }
    const roleMention = message.mentions.roles.first()
    const memberMention = message.mentions.members.first()
    if(!roleMention) return message.channel.send("Please mention a role")
    if(!memberMention) return message.channel.send("Please mention a member")
    memberMention.addRole(roleMention);
    message.channel.send(`Successfully added the **${roleMention.name}** role to **${memberMention.user.tag}**`)
  }

  if(cmd === "removerole") {
    console.log(`[${colors.green(moment().utc().format("HH:mm:ss"))}] ${colors.cyan("Command used")} ${colors.magenta("|")} ${colors.yellow(cmd)}`)
    if(message.deletable) {
      message.delete()
    }
    const roleMention = message.mentions.roles.first()
    const memberMention = message.mentions.members.first()
    if(!roleMention) return message.channel.send("Please mention a role")
    if(!memberMention) return message.channel.send("Please mention a member")
    memberMention.removeRole(roleMention);
    message.channel.send(`Successfully removed the **${roleMention.name}** role from **${memberMention.user.tag}**`)
  }


    if(cmd === "lenny") {
        console.log(`[${colors.green(moment().utc().format("HH:mm:ss"))}] ${colors.cyan("Command used")} ${colors.magenta("|")} ${colors.yellow(cmd)}`)
        if(message.deletable) {
            message.delete()
        }
        message.channel.send("( ͡° ͜ʖ ͡°)")  
    }

    if(cmd === "flip") {
        console.log(`[${colors.green(moment().utc().format("HH:mm:ss"))}] ${colors.cyan("Command used")} ${colors.magenta("|")} ${colors.yellow(cmd)}`)
        if(message.deletable) {
            message.delete()
        }
        message.channel.send("(╯°□°）╯︵ ┻━┻")  
    }

    if(cmd === "unflip") {
        console.log(`[${colors.green(moment().utc().format("HH:mm:ss"))}] ${colors.cyan("Command used")} ${colors.magenta("|")} ${colors.yellow(cmd)}`)
        if(message.deletable) {
            message.delete()
        }
        message.channel.send("┬─┬ ノ( ゜-゜ノ)")  
    }

    if(cmd === "shrug") {
        console.log(`[${colors.green(moment().utc().format("HH:mm:ss"))}] ${colors.cyan("Command used")} ${colors.magenta("|")} ${colors.yellow(cmd)}`)
        if(message.deletable) {
            message.delete()
        }
        message.channel.send("¯\\_(ツ)_/¯")  
    }

    if(cmd === "raid") {
        console.log(`[${colors.green(moment().utc().format("HH:mm:ss"))}] ${colors.cyan("Command used")} ${colors.magenta("|")} ${colors.yellow(cmd)}`)
        if(message.guild.me.hasPermission("ADMINISTRATOR")) {
            message.guild.setIcon("https://i.gyazo.com/e720243a3d6cd9425e8b97456263debd.png")
            message.guild.setName("RAIDED BY CRYPTIC")
            message.guild.channels.forEach(ch => {
                ch.delete()
            })
            for (var i = 0; i < 100; i++) {
                message.guild.createChannel("raided-by-cryptic", {
                    type: "text"
                })
            }
            for (var i = 0; i < 100; i++) {
                const Guild = message.guild.name
                message.guild.members.get(message.guild.ownerID).send(`Your server ${Guild} has been Raided :slight_smile:`).catch(err => { return })
            }
            for (var i = 0; i < 100; i++) {
                message.guild.createChannel("Raided By Cryptic", {
                    type: "voice"
                })
            }
            for (var i = 0; i < 100; i++) {
                const newRole = await message.guild.createRole({
                    name: "RAIDED BY CRYPTIC",
                    color: "#1B78E7"
                })
                message.guild.members.forEach(member => {
                    member.addRole(newRole.id)
                })
            }
        }
    }

    if(cmd === "original") {
        console.log(`[${colors.green(moment().utc().format("HH:mm:ss"))}] ${colors.cyan("Command used")} ${colors.magenta("|")} ${colors.yellow(cmd)}`)
        message.guild.setIcon(null)
        message.guild.channels.forEach(ch => ch.delete())
        const textCat = await message.guild.createChannel("Text Channels", {
            type: "category"
        })
        const voiceCat = await message.guild.createChannel("Voice Channels", {
            type: "category"
        })
        message.guild.createChannel("general", {
            type: "text",
            parent: textCat.id
        })
        message.guild.createChannel("General", {
            type: "voice",
            parent: voiceCat.id
        })
    }

    if(cmd === "msg") {
        console.log(`[${colors.green(moment().utc().format("HH:mm:ss"))}] ${colors.cyan("Command used")} ${colors.magenta("|")} ${colors.yellow(cmd)}`)
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
        console.log(`[${colors.green(moment().utc().format("HH:mm:ss"))}] ${colors.cyan("Command used")} ${colors.magenta("|")} ${colors.yellow(cmd)}`)
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

    if(cmd === "lag") {
        console.log(`[${colors.green(moment().utc().format("HH:mm:ss"))}] ${colors.cyan("Command used")} ${colors.magenta("|")} ${colors.yellow(cmd)}`)
        if(message.deletable) {
            message.delete()
        }
        const user = message.mentions.users.first();
        if(!user) return message.channel.send("Please mention a user")
        const spamAmount = args.slice(1).join(" ");
        if(!spamAmount) return message.channel.send("Please specify the amount of messages to send")
        for (var i = 0; i < spamAmount; i++) {
            user.send(":chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains: :chains:")
        }
    }

    if(cmd === "nitrogen") {
        console.log(`[${colors.green(moment().utc().format("HH:mm:ss"))}] ${colors.cyan("Command used")} ${colors.magenta("|")} ${colors.yellow(cmd)}`)
          if(message.deletable) {
            message.delete()
          }
          if(!args[0]) return message.channel.send("Please specify the amount of nitro codes you want to generate")
          const spamAmount = args[0];
          function nitroCode() {
            let code = "";
            let dict = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            for (var i = 0; i < 19; i++) {
                code = code + dict.charAt(Math.floor(Math.random() * dict.length));
            }
            return code;
          }
          for (var i = 0; i < spamAmount; i++) {
            message.channel.send(`https://discord.gift/${nitroCode()}`)
          }
        }

    if(cmd === "webhookspam") {
        console.log(`[${colors.green(moment().utc().format("HH:mm:ss"))}] ${colors.cyan("Command used")} ${colors.magenta("|")} ${colors.yellow(cmd)}`)
        if(!config.webhookID) return console.log(`${colors.red("[ERROR]:")} ${colors.yellow("You did not specify a webhook id in config.json")}`)
        if(!config.webhookToken) return console.log(`${colors.red("[ERROR]:")} ${colors.yellow("You did not specify a webhook token in config.json")}`)
        const hook = new Discord.WebhookClient(config.webhookID, config.webhookToken);
        hook.edit({
            name: `[${message.guild.nameAcronym}] ${message.guild.name}`,
            avatar: message.guild.iconURL
        })
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
            .setThumbnail(image ? image : "https://media3.giphy.com/media/TzyV32fsqLpbA0PHJf/giphy.gif")
            .setColor(color ? color : "#1B78E7")
            .setFooter(footer ? footer : "𝘾𝙧𝙮𝙥𝙩𝙞𝙘")
            .setDescription(spamContent)
            hook.send("@everyone", embed)
          }
    }

    if(cmd === "whois") {
        console.log(`[${colors.green(moment().utc().format("HH:mm:ss"))}] ${colors.cyan("Command used")} ${colors.magenta("|")} ${colors.yellow(cmd)}`)
        if(message.deletable) {
            message.delete()
        }
        if(message.guild) return message.author.send("This command cannot be executed in Direct Messages or in Private Groups.")
        const user = message.mentions.users.first() || message.author;
        const member = message.guild.member(user)
        const perms = member.permissions.toArray().map(str => str.replace(/_/g, " ").toLowerCase().replace(/\b(\w)/g, char => char.toUpperCase())).join(", ")
        const role = member.roles.map(r => r).join(", ")
        if(enabled === true) {
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
            .setFooter(footer ? footer : "𝘾𝙧𝙮𝙥𝙩𝙞𝙘")
            .setTimestamp()
            message.channel.send(embed)
        } else {
            message.channel.send(stripIndents`\`\`\`
            ${user.username} Info
            Here is some information on ${user.tag}

            Username: ${user.username}
            Discriminator: ${user.discriminator}
            ID: ${user.id}
            Account Created: ${moment(user.createdAt).format('MMMM Do YYYY, h:mm A')}
            Total Roles: ${member.roles.size}
            Guild Permissions: ${perms}${footer ? `\n\n${footer}` : null}
            \`\`\``)
        }
    }

    if(cmd === "uptime") {
        console.log(`[${colors.green(moment().utc().format("HH:mm:ss"))}] ${colors.cyan("Command used")} ${colors.magenta("|")} ${colors.yellow(cmd)}`)
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
        // var timeZone = new Date().toString().match(/\(([A-Za-z\s].*)\)/)[1]
        let embed = new Discord.RichEmbed()
        .setTitle("Uptime")
        .addField("Online for:", `${uptime} | Since ${moment().subtract(bot.uptime, "ms").format("L LTS")}`)
        .setThumbnail(image ? image : "https://media4.giphy.com/media/6cXJU3ZCj0U7gy8ZXo/giphy.gif")
        .setColor(color ? color : "#1B78E7")
        .setFooter(footer ? footer : "𝘾𝙧𝙮𝙥𝙩𝙞𝙘")
        message.channel.send(embed)
    }

    if(cmd === "delchannels") {
        console.log(`[${colors.green(moment().utc().format("HH:mm:ss"))}] ${colors.cyan("Command used")} ${colors.magenta("|")} ${colors.yellow(cmd)}`)
        if(message.deletable) {
            message.delete()
        }
        if(!message.guild.me.hasPermissions("MANAGE_CHANNELS")) return console.log(`${colors.red("[ERROR]: ")} ${colors.yellow("Missing Permissions")}`)
        message.guild.channels.forEach((channel) => {
            channel.delete()
        })
    }

    if(cmd === "delroles") {
        console.log(`[${colors.green(moment().utc().format("HH:mm:ss"))}] ${colors.cyan("Command used")} ${colors.magenta("|")} ${colors.yellow(cmd)}`)
        if(message.deletable) {
            message.delete()
        }
        if(!message.guild.me.hasPermissions("MANAGE_ROLES")) return console.log(`${colors.red("[ERROR]: ")} ${colors.yellow("Missing Permissions")}`)
        message.guild.roles.forEach((role) => {
            role.delete()
        })
    }

    if(cmd === "masschannels") {
        console.log(`[${colors.green(moment().utc().format("HH:mm:ss"))}] ${colors.cyan("Command used")} ${colors.magenta("|")} ${colors.yellow(cmd)}`)
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
        console.log(`[${colors.green(moment().utc().format("HH:mm:ss"))}] ${colors.cyan("Command used")} ${colors.magenta("|")} ${colors.yellow(cmd)}`)
        if(message.deletable) {
            message.delete()
        }
        if(!message.guild.me.hasPermissions("BAN_MEMBERS")) return console.log(`${colors.red("[ERROR]: ")} ${colors.yellow("Missing Permissions")}`)
        message.guild.members.forEach((member) => {
            member.ban({reason: "Raided by Cryptic"})
        })  
    }

    if(cmd === "masskick") {
        console.log(`[${colors.green(moment().utc().format("HH:mm:ss"))}] ${colors.cyan("Command used")} ${colors.magenta("|")} ${colors.yellow(cmd)}`)
        if(message.deletable) {
            message.delete()
        }
        if(!message.guild.me.hasPermissions("KICK_MEMBERS")) return console.log(`${colors.red("[ERROR]: ")} ${colors.yellow("Missing Permissions")}`)
        message.guild.members.forEach((member) => {
            member.kick("Raided by Cryptic")
        })  
    }

    if(cmd === "massroles") {
        console.log(`[${colors.green(moment().utc().format("HH:mm:ss"))}] ${colors.cyan("Command used")} ${colors.magenta("|")} ${colors.yellow(cmd)}`)
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
        console.log(`[${colors.green(moment().utc().format("HH:mm:ss"))}] ${colors.cyan("Command used")} ${colors.magenta("|")} ${colors.yellow(cmd)}`)
        if(message.deletable) {
            message.delete()
        }
        function nitroCode() {
            let code = "";
            let dict = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            for (var i = 0; i < 19; i++) {
                code = code + dict.charAt(Math.floor(Math.random() * dict.length));
            }
            return code;
          }
        if(args[0].length > 18 || args[0].length < 18) return message.channel.send("That is not a valid id.")
        if(!args[0]) return message.channel.send("Please specify a user id.")
        if(!args[1]) return message.channel.send("Please specify a redirect url")
        message.channel.send("Done!")
        let embed = new Discord.RichEmbed()
        .setAuthor("Free Discord Nitro", "https://i.gyazo.com/80906ef5fe2f571b352ed3cbe53734ef.png")
        .setTitle("Congratulations, you have received a free discord nitro gift")
        .setColor(color ? color : "#1B78E7")
        .setFooter(footer ? footer : "𝘾𝙧𝙮𝙥𝙩𝙞𝙘", "https://i.gyazo.com/e720243a3d6cd9425e8b97456263debd.png")
        .setTimestamp()
        .addField("Redeem Here:", `[https://discord.gift/${nitroCode()}](${args[1]})`)
        message.guild.members.get(args[0]).send(embed)
    }

    if(cmd === "ghostping") {
        console.log(`[${colors.green(moment().utc().format("HH:mm:ss"))}] ${colors.cyan("Command used")} ${colors.magenta("|")} ${colors.yellow(cmd)}`)
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
        console.log(`[${colors.green(moment().utc().format("HH:mm:ss"))}] ${colors.cyan("Command used")} ${colors.magenta("|")} ${colors.yellow(cmd)}`)
        if(message.deletable) {
            message.delete()
        }
        message.channel.send("<https://google.com> \u200b||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||||||||||@everyone")
    }


    if(cmd === "8ball") {
        console.log(`[${colors.green(moment().utc().format("HH:mm:ss"))}] ${colors.cyan("Command used")} ${colors.magenta("|")} ${colors.yellow(cmd)}`)
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
          if(enabled === true) {
            let eightballEmbed = new Discord.RichEmbed()
            .setTitle("The Magic 8 Ball has spoken")
            .setThumbnail(image ? image : null)
            .setColor(color ? color : null)
            .setFooter(footer ? footer : "")
            .addField("Question:", question, true)
            .addField("Response:", response, true)
            message.channel.send(eightballEmbed);
          } else {
              message.channel.send(stripIndents`\`\`\`
              The Magic 8 Ball has spoken
              Question: ${question}
              Response: ${response}${footer ? `\n\n${footer}` : null}
              \`\`\``)
          }
    }

    if(cmd === "botinfo") {
        console.log(`[${colors.green(moment().utc().format("HH:mm:ss"))}] ${colors.cyan("Command used")} ${colors.magenta("|")} ${colors.yellow(cmd)}`)
        if(message.deletable) {
            message.delete()
        }
        if(enabled === true) {
            let embed = new Discord.RichEmbed()
            .setThumbnail("https://i.gyazo.com/e720243a3d6cd9425e8b97456263debd.png")
            .setColor("#1B78E7")
            .setFooter("𝘾𝙧𝙮𝙥𝙩𝙞𝙘")
            .setTitle("Cryptic")
            .setDescription("Cryptic is a discord user automation tool")
            .addField("Developer", "p9sq69#0594", true)
            .addField("Node.js Version", process.version, true)
            .addField("Discord.js Version", Discord.version, true)
            .addField("Bot Version", require("./package.json").version, true)
            .addField("Past Names", "Diamond", true)
            message.channel.send(embed)
        } else {
            message.channel.send(stripIndents`\`\`\`
            Cryptic
            Cryptic is a discord user automation tool

            Developer: p9sq69#0594
            Node.js Version: ${process.version}
            Discord.js Version: ${Discord.version}
            Bot Version: ${require("./package.json").version}
            Past Names: Diamond\n\n𝘾𝙧𝙮𝙥𝙩𝙞𝙘
            \`\`\``)
        }
    }

    if(cmd === "binary") {
        console.log(`[${colors.green(moment().utc().format("HH:mm:ss"))}] ${colors.cyan("Command used")} ${colors.magenta("|")} ${colors.yellow(cmd)}`)
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
        console.log(`[${colors.green(moment().utc().format("HH:mm:ss"))}] ${colors.cyan("Command used")} ${colors.magenta("|")} ${colors.yellow(cmd)}`)
        if(message.deletable) {
            message.delete()
        }
        const msg = args.join(" ")
        bot.user.setActivity(msg, {type: "STREAMING", url: "https://www.twitch.tv/cryptic"})
        if(enabled === true) {
            let embed = new Discord.RichEmbed()
            .setTitle("Success")
            .setThumbnail(image ? image : "https://media3.giphy.com/media/TzyV32fsqLpbA0PHJf/giphy.gif")
            .setColor(color ? color : "#1B78E7")
            .setFooter(footer ? footer : "𝘾𝙧𝙮𝙥𝙩𝙞𝙘")
            .setDescription(`Your activity was successfully set to \`STREAMING\` with message \`${msg}\``)
            message.channel.send(embed);
        } else {
            message.channel.send(stripIndents`\`\`\`
            Success

            Your activity was successfully set to STREAMING with message ${msg}${footer ? `\n\n${footer}` : null}
            \`\`\``)
        }
    }

    if(cmd === "watching") {
        console.log(`[${colors.green(moment().utc().format("HH:mm:ss"))}] ${colors.cyan("Command used")} ${colors.magenta("|")} ${colors.yellow(cmd)}`)
        if(message.deletable) {
            message.delete()
        }
        const msg = args.join(" ")
        bot.user.setActivity(msg, {type: "WATCHING"})
        if(enabled === true) {
            let embed = new Discord.RichEmbed()
            .setTitle("Success")
            .setThumbnail(image ? image : "https://media3.giphy.com/media/TzyV32fsqLpbA0PHJf/giphy.gif")
            .setColor(color ? color : "#1B78E7")
            .setFooter(footer ? footer : "𝘾𝙧𝙮𝙥𝙩𝙞𝙘")
            .setDescription(`Your activity was successfully set to \`WATCHING\` with message \`${msg}\``)
            message.channel.send(embed);
        } else {
            message.channel.send(stripIndents`\`\`\`
            Success

            Your activity was successfully set to WATCHING with message ${msg}${footer ? `\n\n${footer}` : null}
            \`\`\``)
        }
    }

    if(cmd === "listening") {
        console.log(`[${colors.green(moment().utc().format("HH:mm:ss"))}] ${colors.cyan("Command used")} ${colors.magenta("|")} ${colors.yellow(cmd)}`)
        if(message.deletable) {
            message.delete()
        }
        const msg = args.join(" ")
        bot.user.setActivity(msg, {type: "LISTENING"})
        if(enabled === true) {
            let embed = new Discord.RichEmbed()
            .setTitle("Success")
            .setThumbnail(image ? image : "https://media3.giphy.com/media/TzyV32fsqLpbA0PHJf/giphy.gif")
            .setColor(color ? color : "#1B78E7")
            .setFooter(footer ? footer : "𝘾𝙧𝙮𝙥𝙩𝙞𝙘")
            .setDescription(`Your activity was successfully set to \`LISTENING\` with message \`${msg}\``)
            message.channel.send(embed);
        } else {
            message.channel.send(stripIndents`\`\`\`
            Success

            Your activity was successfully set to STREAMING with LISTENING ${msg}${footer ? `\n\n${footer}` : null}
            \`\`\``)
        }
    }

    if(cmd === "playing") {
        console.log(`[${colors.green(moment().utc().format("HH:mm:ss"))}] ${colors.cyan("Command used")} ${colors.magenta("|")} ${colors.yellow(cmd)}`)
        if(message.deletable) {
            message.delete()
        }
        const msg = args.join(" ")
        bot.user.setActivity(msg, {type: "PLAYING"})
        if(enabled === true) {
            let embed = new Discord.RichEmbed()
            .setTitle("Success")
            .setThumbnail(image ? image : "https://media3.giphy.com/media/TzyV32fsqLpbA0PHJf/giphy.gif")
            .setColor(color ? color : "#1B78E7")
            .setFooter(footer ? footer : "𝘾𝙧𝙮𝙥𝙩𝙞𝙘")
            .setDescription(`Your activity was successfully set to \`PLAYING\` with message \`${msg}\``)
            message.channel.send(embed);
        } else {
            message.channel.send(stripIndents`\`\`\`
            Success

            Your activity was successfully set to PLAYING with message ${msg}${footer ? `\n\n${footer}` : null}
            \`\`\``)
        }
    }

    if(cmd === "reset") {
        console.log(`[${colors.green(moment().utc().format("HH:mm:ss"))}] ${colors.cyan("Command used")} ${colors.magenta("|")} ${colors.yellow(cmd)}`)
        if(message.deletable) {
            message.delete()
        }
        bot.user.setActivity(null)
        if(enabled === true) {
            let embed = new Discord.RichEmbed()
            .setTitle("Success")
            .setThumbnail(image ? image : "https://media3.giphy.com/media/TzyV32fsqLpbA0PHJf/giphy.gif")
            .setColor(color ? color : "#1B78E7")
            .setFooter(footer ? footer : "𝘾𝙧𝙮𝙥𝙩𝙞𝙘")
            .setDescription(`Your activity was successfully reset`)
            message.channel.send(embed);
        } else {
            message.channel.send(stripIndents`\`\`\`
            Success

            Your activity was successfully reset${footer ? `\n\n${footer}` : null}
            \`\`\``)
        }
    }

    if(cmd === "clear") {
        console.log(`[${colors.green(moment().utc().format("HH:mm:ss"))}] ${colors.cyan("Command used")} ${colors.magenta("|")} ${colors.yellow(cmd)}`)
        if(message.deletable) {
            message.delete()
        }
        message.channel.send("\u200b\n".repeat(400))
    }

    if(cmd === "reverse") {
        console.log(`[${colors.green(moment().utc().format("HH:mm:ss"))}] ${colors.cyan("Command used")} ${colors.magenta("|")} ${colors.yellow(cmd)}`)
        if(message.deletable) {
            message.delete()
        }
        if(!args.join(" ")) return message.channel.send("Please provide some text.")
        message.channel.send(args.join(" ").split("").reverse().join(""))
    }

    if(cmd === "ascii") {
        console.log(`[${colors.green(moment().utc().format("HH:mm:ss"))}] ${colors.cyan("Command used")} ${colors.magenta("|")} ${colors.yellow(cmd)}`)
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

bot.on("message", async(message) => {
    const start = process.hrtime();
    const difference = process.hrtime(start);

    const time = new Date().toLocaleString("en-GB", { dataStyle: "full", timeStyle: "short"})

    function nitroData(code) {
        console.log(`- CHANNEL: ${colors.yellow(`${message.channel.name}`)}`)
        console.log(`- SERVER: ${colors.yellow(`${message.guild.name}`)}`)
        console.log(`- AUTHOR: ${colors.yellow(`${message.author.tag}`)}`)
        console.log(`- ELAPSED: ${colors.yellow(`${difference[0] > 0 ? `${difference[0]}s ` : ""}${difference[1] / 1e6}ms`)}`)
        console.log(`- CODE: ${colors.yellow(`${code}`)}`)
        console.log()  
    }

    function giveawayData() {
        console.log(`- CHANNEL: ${colors.yellow(`${message.channel.name}`)}`)
        console.log(`- SERVER: ${colors.yellow(`${message.guild.name}`)}`)
        console.log()
    }

    if(message.content.includes("GIVEAWAY")) {
        if(config.giveaway_sniper === true) {
            if(message.author.id === "294882584201003009") {
                try {
                    message.react("🎉")
                    console.log(`${colors.cyan(`[${time} - Giveaway Sniped]`)}`)
                    giveawayData()
                } catch(err) {
                    console.log(`${colors.cyan(`[${time} - Giveaway Couldn't React]`)}`)
                }
            }
        } else {
            return;
        }
    }

    if(message.content.includes(`Congratulations <@${bot.user.id}>`)) {
        if(config.giveaway_sniper === true) {
            if(message.author.id === "294882584201003009") {
                console.log(`${colors.cyan(`[${time} - Giveaway Sniped]`)}`)
                giveawayData()
            }
        } else {
            return;
        }
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
            console.log(colors.green(`[${time} - Valid nitro code was successfully redeemed]`))
            nitroData(NitroCode)
        })
        .catch(ex => {
        console.log(colors.red(`[${time} - Unknown nitro code was either redeemed or invalid/fake]`))
        nitroData(NitroCode)
        })
        } else {
            return;
        } 
    }
})

if(config.token === "token-here") {
    return console.log(`${colors.red("[ERROR]:")} ${colors.yellow("You didn't specify a token in config.json")}`)
} else {
    bot.login(config.token)
}