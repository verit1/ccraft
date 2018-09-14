const botconfig = require('./botconfig.json');
const discord = require('discord.js');

const bot = new discord.Client({disableEveryone: true});

bot.on("ready", async () => {
    console.log(`${bot.user.username} jest teraz online!`);
    bot.user.setActivity("CCraft - Minecraft Server", {url: 'https://www.twitch.tv/usa_'}, {type: 'STREAMING'})
});

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === 'dm') return;

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(' ');
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if(cmd === `${prefix}ekipa`){
        let ekipaEmbed = new discord.RichEmbed()
        .setTitle('SKŁAD EKIPY')
        .addField('ADMINISTRATORZY', [" :arrow_forward: vinsu - head administrator, koordynator ekipy projektu, grafika 2D oraz 3D", " :arrow_forward: 2900 - administrator, programista LUA oraz Python, lead developer", " :arrow_forward: usa - developer, programista javaScript, Back-End developer, grafika 3D, boty", " :arrow_forward: Szczuro - webdeveloper, programista php, Back-End developer"], true)
        .addField('MODERATORZY', [" :arrow_forward: bassik - moderator globalny, sprawowanie porządku na serwerze", " :arrow_forward: Endrju - moderator globalny, sprawowanie porządku na serwerze", " :arrow_forward: WuTangXiang - moderator globalny, sprawowanie porządku na serwerze", " :arrow_forward: Dejw - moderator globalny, sprawowanie porządku na serwerze"], true)
        .setFooter("Ostatnia aktualizacja: 13.09.2018, 21:38")
        .setColor('#6820CC');
    
        return message.channel.send(ekipaEmbed);
    }
    if(cmd === `${prefix}serverinfo`){
        let sicon = message.guild.iconURL;
        let serverEmbed = new discord.RichEmbed()
        .setTitle("Informacje na temat serwera")
        .setColor('#6820CC')
        .setThumbnail(sicon)
        .addField('Nazwa serwera', message.guild.name)
        .addField('Utworzony', message.guild.createdAt)
        .addField('Dołączono', message.guild.joinedAt)
        .addField('Wszystkich użytkowników', message.guild.memberCount);

        return message.channel.send(serverEmbed);
    }
    if(cmd === `${prefix}report`){
        let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!rUser) return message.channel.send("Nie mogę znaleźć takiego użytkownika.");
        let rReason = args.join(" ").slice(22);

        let reportEmbed = new discord.RichEmbed()
        .setTitle("RAPORT NA UŻYTKOWNIKA")
        .setColor("#42F46B")
        .addField("Zgłoszony użytkownik", `${rUser} o ID: ${rUser.id}`)
        .addField("Zgłoszony przez", `${message.author} o ID: ${message.author.id}`)
        .addField("Na kanale", message.channel)
        .addField("O godzinie", message.createdAt)
        .addField("Powód", rReason);

        let reportschannel = message.guild.channels.find(`name`, "raporty");
        if(!reportschannel) return message.channel.send("Nie mogę znaleźć kanału raportów.");

        message.delete().catch(O_o=>{});
        reportschannel.send(reportEmbed);

        return;
    }
    if(cmd === `${prefix}kick`){
        let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!kUser) return message.channel.send("Nie mogę znaleźć takiego użytkownika.");
        let kReason = args.join(" ").slice(22);
        if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Nie posiadasz uprawnień do wykonania powyższej czynności.");
        if(kUser.hasPermission("KICK_MEMBERS")) return message.channel.send("Ta osoba nie może zostać wyrzucona.");

        let kickEmbed = new discord.RichEmbed()
        .setTitle("INFORMACJE NA TEMAT KARY - KICK")
        .setColor("#FF0000")
        .addField("Wyrzucony użytkownik", `${kUser} o ID: ${kUser.id}`)
        .addField("Wyrzucony przez", `${message.author} o ID: ${message.author.id}`)
        .addField("Na kanale", message.channel)
        .addField("O godzinie", message.createdAt)
        .addField("Powód", kReason);

        let kickchannel = message.guild.channels.find(`name`, "kary");
        if(!kickchannel) return message.channel.send("Nie mogę znaleźć kanału kar.");

        message.guild.member(kUser).kick(kReason);
        kickchannel.send(kickEmbed);

        return;
    }
    if(cmd === `${prefix}ban`){
        let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!bUser) return message.channel.send("Nie mogę znaleźć takiego użytkownika.");
        let bReason = args.join(" ").slice(22);
        if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Nie posiadasz uprawnień do wykonania powyższej czynności.");
        if(bUser.hasPermission("BAN_MEMBERS")) return message.channel.send("Ta osoba nie może zostać zbanowana.");

        let banEmbed = new discord.RichEmbed()
        .setTitle("INFORMACJE NA TEMAT KARY - BAN")
        .setColor("#FF0000")
        .addField("Zbanowany użytkownik", `${bUser} o ID: ${bUser.id}`)
        .addField("Zbanowany przez", `${message.author} o ID: ${message.author.id}`)
        .addField("Na kanale", message.channel)
        .addField("O godzinie", message.createdAt)
        .addField("Powód", bReason);

        let banchannel = message.guild.channels.find(`name`, "kary");
        if(!banchannel) return message.channel.send("Nie mogę znaleźć kanału kar.");

        message.guild.member(bUser).ban(bReason);
        banchannel.send(banEmbed);

        return;
    }
    if(cmd === `${prefix}purge`){
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Nie posiadasz uprawnień do wykonania powyższej czynności.");
        if(!args[0]) return message.channel.send("Podaj odpowiednią wartość.")
        message.channel.bulkDelete(args[0]).then(() => {
            message.channel.send(`Usunięto ${args[0]} wiadomości.`).then(msg => msg.delete(5000));
        });
    }
    if(cmd === `${prefix}say`){
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Nie posiadasz uprawnień do wykonania powyższej czynności.");
        let botmessage = args.join(" ");
        message.delete().catch();
        message.channel.send(botmessage);
    }
})

bot.login(botconfig.token);