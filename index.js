const botconfig = require("./config.json");
const Discord = require("discord.js");

const bot = new Discord.Client({disableEveryone: true});

bot.on("ready", async () =>{
    console.log(`${bot.user.username} is online`);
    bot.user.setActivity(`ig!help | BETA`, {type : "streaming"});
});

bot.on('message', async message => {
    if(message.author.bot) return;
    
    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if(cmd === "ig!invite"){
        let bicon = bot.user.displayAvatarURL;
        let botembed = new Discord.RichEmbed()
        .setTitle("Invite Link")
        .setThumbnail(bicon)
        .addField(":link: : https://discordapp.com/api/oauth2/authorize?client_id=412223157395652608&permissions=8&scope=bot");

        return message.author.send(botembed);
    }
    if(cmd === "ig!ping"){
        let emb = new Discord.RichEmbed()
        .setDescription("Pong!");

        return message.channel.send(emb);
    }

    if(cmd === "ig!serverinfo"){

        if (message.guild.iconURL = null){
            let emb = new Discord.RichEmbed()
            .setTitle("Error getting server..")
            .setColor("0x12f153");

            return message.channel.send(emb);
        }

        let sicon = message.guild.iconURL;
        let serverembed = new Discord.RichEmbed()
        .setTitle("Server Information")
        .setColor("0x12f153")
        .setThumbnail(sicon)
        .addField("Server Name", message.guild.name)
        .addField("Created on", message.guild.createdAt)
        .addField("You joined", message.member.joinedAt)
        .addField("Total Members", message.guild.memberCount);
        
        return message.channel.send(serverembed);
    }

    if(cmd === "ig!botinfo"){

        let bicon = bot.user.displayAvatarURL;
        let botembed = new Discord.RichEmbed()
        .setDescription("Client Information")
        .setColor("0x12f153")
        .setThumbnail(bicon)
        .addField("Bot Name", bot.user.username)
        .addField("Created on", bot.user.createdAt);

        return message.channel.send(botembed);
    }
})

bot.login(botconfig.token);