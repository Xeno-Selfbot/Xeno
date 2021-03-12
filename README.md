# Xeno

A discord user automation tool

# Installation

1. If you don't have `node.js` installed, make sure to download it [here](https://nodejs.org/en/)
2. Run `install.bat`
3. Wait for everything to install
4. Then you are done installing the required packages!

# Setup

Before you do anything, make sure you rename `config-example.json` to `config.json`

Next, get your discord token and paste it into `config.json`

So far, your config file should look like this

```json
{
  "token": "account-token-here",
  "password": "account-password-here",
  "afk_message": "afk-message-here",
  "nitro_sniper": false,
  "credit": false,
  "giveaway_sniper": false,
  "whitelisted": [],
  "prefix": "prefix-here",
  "messageLogs": false,
  "id": "account-id-here",
  "webhookURL": "webhook-url-here",
  "embedOptions": {
    "enabled": true,
    "color": "",
    "image": "",
    "footer": ""
  }
}
```

You should enter in a password, just so then the account management commands will work

You should choose a desired prefix for the commands so then the commands won't run if you sent `ping` for an example.
[ NOTE: The prefix must not include any spaces or the commands will not register properly ]

For the `afk_message`, you can type one if you want to. It's just the message the bot will send when afk mode is on

For the `nitro_sniper` that is optional, but you can have it on so then you can snipe discord nitro and so the bot can instanly redeem it for you

For the `credit`, you can have that on if you want to, all that does is set your status to the discord server invite for the Xeno official discord server

For the `giveaway_sniper` that is optional, but you can have it on so then you can snipe giveaways that you have one

For the `whitelisted` part, that is optional, you can put your own id in there so then you can use the selfbot commands

For the `id` part, you need to paste in your selfbot account id in there, just so if you have whitelisted users, the selfbot account can use the commands

For the `webhook_url`, that is optional. The webhook is just used for spamming `@everyone` in your discord server. Just to annoy people :wink:

For the `embedOptions`. You can play around with the options to customise the way embeds are sent into discord. (embed options are optional to play around with)

For the `messageLogs`, that is optional to have on or off, the message logs will just log any message a user sends

# Run the bot

To simply run the bot, just run `launch.bat`. The bot should be working fine as long as you don't muck up the code.

# Xeno ToS

1. You MUST NOT claim the code as your own code
2. You MUST NOT claim owner ship of the bot

# Xeno Risks

Beware that your account is\
at risk when using this bot.\
I am not responsible for any\
actions taken when using this bot.
