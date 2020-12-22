# Cryptic
A discord user automation tool

# Installation

Run `install.bat`\
Wait for everything to install\
Then you are done installing the required packages!
# Setup

Before you do anything, make sure you rename `config-example.json` to `config.json`

Next, get your discord token and paste it into `config.json`

So far, your config file should look like this
```json
{
    "token": "token-here",
    "password": "password-here",
    "nitro_sniper": false,
    "giveaway_sniper": false,
    "whitelisted": [],
    "prefix": "!",
    "messageLogs": false,
    "id": "account-id-here",
    "webhookURL": "webhook-url-here",
    "embedOptions": {
        "enabled": true,
        "color": "hex-color",
        "image": "some-image-url-here",
        "footer": "some-text-here"
    }
}
```

You should enter in a password, just so then the account management commands will work

You should choose a desired prefix for the commands so then the commands won't run if you sent `ping` for an example.
[ NOTE: The prefix must not include any spaces or the commands will not register properly ]

For the nitro sniper that is optional, but you can have it on so then you can snipe discord nitro and so the bot can instanly redeem it for you

For the credit, you can have that on if you want to, all that does is set your status to the discord server invite for the cryptic official discord server

For the giveaway sniper that is optional, but you can have it on so then you can snipe giveaways that you have one

For the `whitelisted` part, that is optional, you can put your own id in there so then you can use the selfbot commands

For the `id` part, you need to paste in your selfbot account id in there, just so if you have whitelisted users, the selfbot account can use the commands

For the webhook url, that is optional. The webhook is just used for spamming `@everyone` in your discord server. Just to annoy people :wink:

For the embed options. You can play around with the options to customise the way embeds are sent into discord. (embed options are optional to play around with)

For the message logs, that is optional to have on or off, the message logs will just log any message a user sends

# Run the bot

To simply run the bot, just run `launch.bat`. The bot should be working fine as long as you don't muck up the code.

# Cryptic ToS

1. You MUST NOT claim the code as your own code
2. You MUST NOT claim owner ship of the bot
3. Obfuscated the code. So know nobody can claim as their original scripting. Well, unless people are smart enough to fully deobfuscate the code and change it

# Cryptic Risks

Beware that your account is\
at risk when using this bot.\
I am not responsible for any\
actions taken when using this bot.