//create a cmd name vc stats thats show the stats of the server with first Members,Online,In vc,Boost of the guild
const { MessageEmbed, Message } = require("discord.js");
module.exports = {
  name: "vc",
  helpname: "vc",
  description: "Affiche les stats du serveur",

  execute(message, args, client) {
    let db = client.db;
    if (
      db.get("owners_" + message.guild.id + "_" + message.author.id) ||
      message.member.id == client.config.ownerID
    ) {
      let embed = new MessageEmbed()
        .setTitle(`:crown: • __Stats de ${message.guild.name}__`)
        //invisible hex color code is #2f3136
        .setColor("#2f3136")
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        //the fields are gonna be descriptions
        .setDescription(
          " *__Membres__:* " +
            `**${message.guild.memberCount}** :busts_in_silhouette:\n` +
            "*__En ligne__:* " +
            `**${
              message.guild.members.cache.filter(
                (m) => m.presence.status !== "offline"
              ).size
            }** :green_circle:\n` 
            +
            //in vc
            "*__En vocal__:* " +`**${
              message.guild.members.cache.filter((m) => m.voice.channel).size
            }** :microphone2:\n` +
            //boost
            " *__Boost__:* " +
            `**${message.guild.premiumSubscriptionCount}** :star:\n`
        )

        .setFooter(
          `∙ ${message.guild.name} Stats`,
          message.guild.iconURL({ dynamic: true })
        );
      message.channel.send({ embeds: [embed] });
    }
  },
};
