//command wl add/remove user 
const { MessageEmbed } = require("discord.js");
module.exports = {
    name : "wl",
    helpname : "wl <add/remove/list> <@user>",
    description : "Ajoute ou retire un utilisateur de la whitelist",
    async execute(message, args, client) {
        let db = client.db
        if(db.get("owners_" + message.guild.id + "_" + message.author.id) || message.member.id == client.config.ownerID) {
        let type = args[0]
            
        if(!type) return;
        if(type === "add") {
            let user =  await client.users.fetch( message.mentions?.members.first()?.id == null ? args[1] :  message.mentions?.members.first().id);
            if(!user) return message.channel.send("Veuillez spécifier un utilisateur")
            if(db.get("wlvoc_" + message.guild.id + "_" + user.id)) return message.channel.send("Cet utilisateur est déjà dans la whitelist")
            db.set("wlvoc_" + message.guild.id + "_" + user.id, true)
            message.channel.send("L'utilisateur a été ajouté à la whitelist")
        }
        if(type === "remove") {
            let user =  await client.users.fetch( message.mentions?.members.first()?.id == null ? args[1] :  message.mentions?.members.first().id);
            if(!user) return message.channel.send("Veuillez spécifier un utilisateur")
            if(!db.get("wlvoc_" + message.guild.id + "_" + user.id)) return message.channel.send("Cet utilisateur n'est pas dans la whitelist")
            db.delete("wlvoc_" + message.guild.id + "_" + user.id)
            message.channel.send("L'utilisateur a été retiré de la whitelist")
        }
        if(args[0] == "list"){
            let currentIndex = 0;
     
            let owners = db.all().filter(data => data.ID.startsWith(`wlvoc_${message.guild.id}`)).map(data => data.ID.split("_")[2])
           let embed = new MessageEmbed()
             .setTitle("Liste des whitelist")
               //we gonna set an invisible color for the embed
              .setColor("2F3136")
                nextTenOwners()
        async function nextTenOwners(){
            embed.description = "";
            for(let i = currentIndex; i < currentIndex + 10; i++){
                if(!owners[i]) break;
                let owner = await client.users.fetch(owners[i])
                embed.description += `${ owner}\n`;
            }
            currentIndex += 10;
            message.channel.send({embeds : [embed]})
    
        }
        }

    }
}
}

