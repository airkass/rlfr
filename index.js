// _                      _      _  __               _  _    ___ ___  _  _ ______ 
//| |               /\   (_)    | |/ /             _| || |_ / _ \__ \| || |____  |
//| |__  _   _     /  \   _ _ __| ' / __ _ ___ ___|_  __  _| (_) | ) | || |_  / / 
//| '_ \| | | |   / /\ \ | | '__|  < / _` / __/ __|_| || |_ \__, |/ /|__   _|/ /  
//| |_) | |_| |  / ____ \| | |  | . \ (_| \__ \__ \_  __  _|  / // /_   | | / /   
//|_.__/ \__, | /_/    \_\_|_|  |_|\_\__,_|___/___/ |_||_|   /_/|____|  |_|/_/    
//        __/ |                                                                   
//       |___/    

const Discord = require("discord.js");
const client = new Discord.Client();
var dernierAppel = new Array();


// ⇉ CONFIGURATION
const token = process.env.TOKEN; // → TOKEN DU BOT
var prefix = "/"; // → PREFIX DU BOT
var cbienvenue = "493881777350377475"; // → ID DU SALON DE BIENVENUE
var pcolor = "#FFFFFF"; // → COULEUR PRIMAIRE (embed...)
var scolor = "#00B212"; // → COULEUR PRINCIPALEMENT VERT POUR TOUS LES SUCCES !
var ccolor = "#E24343"; // → COULEUR PRINCIPALEMNT ROUGE POUR TOUS LES "CANCEL" !
var ProfilGame = "https://rocketleaguefrance.cf‏‏‏ ‏‏‏ ‏‏‏"; // → Le bot joue à ......
var ProfilStream = "https://twitch.tv/rocketleague"; // → Le bot stream du ......
var autorole = "🎮 Joueur" //AUTO ROLE

// ⇉ CONNECTION

client.on("ready", () => {;
var memberCount = client.users.size;
var servercount = client.guilds.size;
	var servers = client.guilds.array().map(g => g.name).join(',');
    console.log("===============CONNECTION=============");
    console.log("");
    console.log(`[!] Le bot ${client.user.tag} est prêt.`);
    console.log("");
    console.log(`[!] Invitation : https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`);
    console.log("");
    console.log("============CONFIGURATION=============");
    console.log("");
    console.log("[!] Couleur primaire : " + pcolor);
    console.log("");
    console.log("[!] Couleur Succes : " + scolor);
    console.log("");
    console.log("[!] Couleur Cancel : " + ccolor);
    console.log("");
    console.log("[!] Token : " + token);
    console.log("");
    console.log("[!] Salon de bienvenue : " + cbienvenue);
    console.log("");
    console.log("[!] Préfix : " + prefix);
    console.log("");
    console.log("[!] Le bot joue à : " + ProfilGame);
    console.log("");
    console.log("[!] Le bot stream : " + ProfilStream);
    console.log("");
    console.log("================STATS=================");
    console.log("");
    console.log("[!] Nombre de serveurs : " + servercount);
    console.log("");
    console.log("[!] Nombre d'utilisateur : " + memberCount);
    console.log("");
    console.log(`[!] Il est actuellement sur les serveurs suivants : ${client.guilds.map(c=>c.name).join(', ')}`);
    console.log("");
    console.log("======================================");
client.user.setStatus('Online')
client.user.setGame(ProfilGame, ProfilStream);
});

// ⇉ MESSAGE DE BIENVENUE / MESSAGE PRIVE
client.on('guildMemberAdd', member => {
    console.log("[+] " + member.user.username + " viens d'arriver sur le discord");
    var wel2_embed = new Discord.RichEmbed()
     .setColor(pcolor)
     .setAuthor("Bienvenue sur le discord " + member.user.username + " !" , member.user.avatarURL)
    var wel1_embed = new Discord.RichEmbed()
     .setColor(pcolor)
     .setImage("https://airkass.s-ul.eu/UoZRyXde")
    var wel3_embed = new Discord.RichEmbed()
     .setColor(pcolor)
     .setColor(pcolor)
     .setAuthor("Je t'invite à aller voir le salon #🔩𝗥𝗢𝗟𝗘𝗦 pour avoir les roles qui te correspond.")
     .setFooter("Discord bot by AirKass#9247 - https://airkass.tk")
    member.createDM().then(channel => {
        return channel.send(wel1_embed);  
    }).catch(console.error)
    member.createDM().then(channel => {
        return channel.send(wel2_embed);  
    }).catch(console.error)
    member.createDM().then(channel => {
        return channel.send(wel3_embed);  
    }).catch(console.error)


// ⇉ AUTO ROLE

    let role = member.guild.roles.find("name", autorole)
    member.addRole(role)

// ⇉ NOUVEAU MEMBRE SALON BIENVENUE
    var cwel_embed = new Discord.RichEmbed()
    .setColor(scolor)
    .setAuthor(member.user.username + " viens de rejoindre le discord !", member.user.avatarURL)
    .setTimestamp()
    .setFooter("Nouveau membre")
    member.guild.channels.get(cbienvenue).send(cwel_embed);
});

// ⇉ MEMBRE PARTI SALON BIENVENUE
client.on('guildMemberRemove', member => {
    console.log("[-] " + member.user.username + " viens de partir du discord !");
    var cbye_embed = new Discord.RichEmbed()
    .setColor(ccolor)
    .setAuthor(member.user.username + " est parti du discord !", member.user.avatarURL)
    .setTimestamp()
    .setFooter("Membre parti")
    member.guild.channels.get(cbienvenue).send(cbye_embed);

});
// ⇉ MUTE / UNMUTE
client.on("message", (message) => {
    if(message.content.startsWith(prefix + "mute")) {
        if(!message.guild.member(message.author).hasPermission("ADMINISTRAROR")) return message.channel.send(":x: Vous n'avez pas la permission :x:");

        if(message.mentions.users.size === 0 ){
            return message.channel.send(":x: Vous devez mentioner un utilisateur ! :x:");
        }

        var mute = message.guild.member(message.mentions.users.first());
        if(!mute) {
            return message.channel.send(":x: Je n'ai pas trouver l'utilisateur ou il n'existe pas :x:");
        }

        if(!message.guild.member(client.user).hasPermission("ADMINISTRATOR")) return message.channel.send(":x: Je n'ai pas la permission :x:");
        message.channel.overwritePermissions(mute, { SEND_MESSAGES: false}).then(member => {
            message.channel.send(`${mute.user.username} est mute dans ce salon !`);

        })
    }
    if(message.content.startsWith(prefix + "unmute")) {
        if(!message.guild.member(message.author).hasPermission("ADMINISTRAROR")) return message.channel.send(":x: Vous n'avez pas la permission :x:");

        if(message.mentions.users.size === 0 ){
            return message.channel.send(":x: Vous devez mentioner un utilisateur ! :x:");
        }

        var mute = message.guild.member(message.mentions.users.first());
        if(!mute) {
            return message.channel.send(":x: Je n'ai pas trouver l'utilisateur ou il n'existe pas :x:");
        }

        if(!message.guild.member(client.user).hasPermission("ADMINISTRATOR")) return message.channel.send(":x: Je n'ai pas la permission :x:");
        message.channel.overwritePermissions(mute, { SEND_MESSAGES: true}).then(member => {
            message.channel.send(`${mute.user.username} n'est plus mute dans ce salon!`);

        })
    }

});


// ⇉ STATS USER 

client.on('message', message => {
    if(message.content.startsWith(prefix + "mystats")) {
        var embed = new Discord.RichEmbed()
        .setAuthor(message.author.username, message.author.avatarURL)
             .setColor(pcolor)
             .setThumbnail(message.author.avatarURL)
             .addField("Vous avez rejoint le: ", message.member.joinedAt)
        message.channel.send(embed);
        
    }
})

client.on("message", (message) => {
    if(message.content.startsWith(prefix + "stats")) {

        if(message.mentions.users.size === 0 ){
            return message.channel.send(":x: Vous devez mentioner un utilisateur ! :x:");
        }

        var statsuser = message.guild.member(message.mentions.users.first());

        if(!statsuser) {
            return message.channel.send(":x: Je n'ai pas trouver l'utilisateur ou il n'existe pas :x:");
        }
        
        var embed = new Discord.RichEmbed()
        .setAuthor(message.author.username, message.author.avatarURL)
        .setColor(pcolor)
        .setThumbnail(`https://airkass.s-ul.eu/IP7Y3b1C`)
        .addField(`${statsuser.user.username} a rejoint le:  `, statsuser.joinedAt)
        message.channel.send(embed);

    }

})

// ⇉ RANDOM (BONJOUR,SALUT..)
client.on('message', message => {

    if(message.content.toLowerCase().includes('bonjour')){
        random();

        if (randnum == 0){
            message.reply("Hey, je suis un bot !");
        }

        if (randnum == 1){
            message.reply("Hey ça roule ?");
        }

        if (randnum == 2){
            message.reply("Yoo");
        }

        if (randnum == 3){
            message.reply("Hey");
        }


    }
    if(message.content.toLowerCase().includes('salut')){
        random2();

        if (randnum == 0){
            message.reply("Hey, je suis un bot !");
        }

        if (randnum == 1){
            message.reply("Hey ça roule ?");
        }

        if (randnum == 2){
            message.reply("Yoo");
        }

        if (randnum == 3){
            message.reply("Hey");
        }

    }

});

function random2(min, max) {
    min = Math.ceil(0);
    max = Math.floor(4);
    randnum = Math.floor(Math.random() * (max - min +1) + min);
}
function random(min, max) {
    min = Math.ceil(0);
    max = Math.floor(4);
    randnum = Math.floor(Math.random() * (max - min +1) + min);
}

// ⇉ ANTI INSULTE, PUB...

client.on('message', message => {
    var i_embed = new Discord.RichEmbed()
    .setColor('#E24343')
    .addField(":warning: **Ton langage** " + message.author.username + " :warning:", "‏")
    .setTimestamp()

    var l_embed = new Discord.RichEmbed()
    .setColor('#E24343')
    .addField(":warning: **Pas de lien** " + message.author.username + " :warning:", "‏")
    .setTimestamp()

    var pub_embed = new Discord.RichEmbed()
    .setColor('#E24343')
    .addField(":warning: **Pas de pub** " + message.author.username + " :warning:", "‏")
    .setTimestamp()

    var link_embed = new Discord.RichEmbed()
    .setColor('#E24343')
    .addField(":warning: **Pas de lien ici** " + message.author.username + " :warning:", "‏")
    .setTimestamp()

//ANTI LIENS SALON
    if (message.channel.id === "493882136198250498") {
        if(message.content.toLowerCase().includes('https://')){
            message.delete(message.author);
            message.channel.send(link_embed)
        }
    }

    if (message.channel.id === "494074231785652234") {
        if(message.content.toLowerCase().includes('https://')){
            message.delete(message.author);
            message.channel.send(link_embed)
        }
    }

    if (message.channel.id === "494074367291031552") {
        if(message.content.toLowerCase().includes('https://')){
            message.delete(message.author);
            message.channel.send(link_embed)
        }
    }

    if (message.channel.id === "494074436756963329") {
        if(message.content.toLowerCase().includes('http://')){
            message.delete(message.author);
            message.channel.send(link_embed)
        }
    }

    if (message.channel.id === "494074468231020546") {
        if(message.content.toLowerCase().includes('http://')){
            message.delete(message.author);
            message.channel.send(link_embed)
        }
    }
    
// ANTI INSULTES
    if(message.content.toLowerCase().includes('pute')){
        message.delete(message.author);
        message.channel.send(i_embed)
    }

    if(message.content.toLowerCase().includes('connard')){
        message.delete(message.author);
        message.channel.send(i_embed)
    }

    if(message.content.toLowerCase().includes('fdp')){
        message.delete(message.author);
        message.channel.send(i_embed)
    }

    if(message.content.toLowerCase().includes('enculé')){
        message.delete(message.author);
        message.channel.send(i_embed)
    }

    if(message.content.toLowerCase().includes('merde')){
        message.delete(message.author);
        message.channel.send(i_embed)
    }

    if(message.content.toLowerCase().includes('fils de pute')){
        message.delete(message.author);
        message.channel.send(i_embed)
    }

    if(message.content.toLowerCase().includes('batard')){
        message.delete(message.author);
        message.channel.send(i_embed)
    }

    if(message.content.toLowerCase().includes('https://discord.gg/')){
        message.delete(message.author);
        message.channel.send(pub_embed)
    }

    if(message.content.toLowerCase().includes('https://discord.me/')){
        message.delete(message.author);
        message.channel.send(pub_embed)
    }

    if(message.content.toLowerCase().includes('https://discord.io/')){
        message.delete(message.author);
        message.channel.send(pub_embed)
    }

});


// ⇉ PURGE COMMANDE
client.on('message', message => {

    let msg = message.content.toUpperCase();
    let sender = message.author;
    let cont = message.content.slice(prefix.length).split(" ");
    let args = cont.slice(1);

    if (msg.startsWith(prefix + 'PURGE')) {
        console.log("[PURGE] " + message.author.username + " viens d'utiliser la cmd purge");
        async function purge() {
            message.delete();

            if (!message.member.roles.find("name", "💥 Serveur-Admin")) { 
                message.channel.send(':x: Tu as besoin du role \`💥 Serveur-Admin\` pour faire cette commande :x:');
                return; 
            }

            if (isNaN(args[0])) {
                message.channel.send(':x: Veuillez utiliser un nombre comme argument. :x: \n\nUtilisation: `/purge <nombre>`'); 
                return;
            }

            const fetched = await message.channel.fetchMessages({limit: args[0]}); 

            message.channel.bulkDelete(fetched)
                .catch(error => message.channel.send(`:x: Erreur: ${error}`));

        }

        purge();

    }

});

client.login(token)

// _                      _      _  __               _  _    ___ ___  _  _ ______ 
//| |               /\   (_)    | |/ /             _| || |_ / _ \__ \| || |____  |
//| |__  _   _     /  \   _ _ __| ' / __ _ ___ ___|_  __  _| (_) | ) | || |_  / / 
//| '_ \| | | |   / /\ \ | | '__|  < / _` / __/ __|_| || |_ \__, |/ /|__   _|/ /  
//| |_) | |_| |  / ____ \| | |  | . \ (_| \__ \__ \_  __  _|  / // /_   | | / /   
//|_.__/ \__, | /_/    \_\_|_|  |_|\_\__,_|___/___/ |_||_|   /_/|____|  |_|/_/    
//        __/ |                                                                   
//       |___/    
