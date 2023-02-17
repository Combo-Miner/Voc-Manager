
const { MessageEmbed } = require("discord.js")
module.exports = {
    //here we gonna set proprieties for the command like the name, the description, the aliases, the category and the usage in the collection that we created in the index.js file
    name : "pv",
    //here we gonna use helpname for our help command later
    helpname : "pv <add/remove> <channel>",
    description : "Transforme un salon vocal en salon privé",
    execute(message, args, client) {
        let db = client.db
        if(db.get("owners_" + message.guild.id + "_" + message.author.id)  || message.member.id == client.config.ownerID) {
       let type = args[0]
      
       
    if(!type) return;
    if(type === "add") {
        let channel = message.mentions.channels.first()|| message.guild.channels.cache.get(args[1])
        if(!channel) return message.channel.send("Veuillez spécifier un salon")
        if(channel.type !== "GUILD_VOICE") return message.channel.send("Veuillez spécifier un salon vocal")
        if(db.get(`private_${message.guild.id}_${channel.id}`)) return message.channel.send("Ce salon est déjà privé")
        db.set(`private_${message.guild.id}_${channel.id}`, true)
        message.channel.send(`${channel} est maintenant privé`)
    }
    if(type === "remove") {
        let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1])
        if(!channel) return message.channel.send("Veuillez spécifier un salon")
        if(channel.type !== "GUILD_VOICE") return message.channel.send("Veuillez spécifier un salon vocal")
        if(!db.get(`private_${message.guild.id}_${channel.id}`)) return message.channel.send("Ce salon n'est pas privé")
        db.delete(`private_${message.guild.id}_${channel.id}`)
        message.channel.send("Le salon n'est plus privé")
    }
    if(type == "list"){
        let currentIndex = 0;
 
        let owners = db.all().filter(data => data.ID.startsWith(`private_${message.guild.id}`)).map(data => data.ID.split("_")[2])
       let embed = new MessageEmbed()
         .setTitle("Liste des salon privé")
           //we gonna set an invisible color for the embed
          .setColor("2F3136")
            nextTenOwners()
    async function nextTenOwners(){
        embed.description = "";
        for(let i = currentIndex; i < currentIndex + 10; i++){
            if(!owners[i]) break;
            let owner = await client.channels.cache.get(owners[i])
            embed.description += `${ owner}\n`;
        }
        currentIndex += 10;
        message.channel.send({embeds : [embed]})

    }
    }

}
}
}