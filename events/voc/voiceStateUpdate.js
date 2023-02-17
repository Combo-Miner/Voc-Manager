const client = require("../../index")
const db = client.db
const {MessageEmbed} = require('discord.js');

client.on("voiceStateUpdate", async (oldState, newState) => {
    if(newState.channelId) {
       
        //gonna check if the channel is private
        if(db.get(`private_${newState.guild.id}_${newState.channelId}`)) {
            //gonna check if the user is an owner or wl
            if(db.get("wlvoc_" + newState.guild.id + "_" + newState.member.id) || newState.member.id == client.config.ownerID || db.get("owners_" + newState.guild.id + "_" + newState.member.id)) {
                
            }
            else {
                newState.member.voice.setChannel(null)
            }
        }
    }
})
