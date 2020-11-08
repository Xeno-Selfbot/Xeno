Cryptic
-
A discord user automation tool
-
Installation
-
Run `install.bat`
Wait for everything to install
Then you are done!
-
Setup
-
Before you do anything, make sure you rename `config-example.json` to `config.json`

Next, get your discord token and paste it into `config.json`

So far, your config file should look like this
```js
{
    "token": "token-here",
    "nitro_sniper": false,
    "prefix": "!",
    "webhookID": "" ,
    "webhookToken": "",
    "embedOptions": {
        "color": "",
        "image": "",
        "footer": "" 
    }
}
```

You should choose a desired prefix for the commands so then the commands won't run if you sent `ping` for an example.
[ NOTE: The prefix must not include any spaces or the commands will not register properly ]

For the webhook id and token, those are optional. The webhook is just used for spamming @everyone in your discord server. Just to annoy people :wink:

For the embed options. You can play around with the options to customise the way embeds are sent into discord. (embed options are optional to play around with)
-
Run the bot
-
To simply run the bot, just run `start.bat`. The bot should be working fine as long as you DON'T edit the code.

-
Cryptic ToS
-
1. You MUST NOT claim the code as your own code
2. You MUST NOT edit the code for the bot.
3. You MUST NOT claim owner ship of the bot
-
Cryptic Risks
-
Beware that your account is
at risk when using this bot.
I am not responsible for any
actions taken when using this bot.