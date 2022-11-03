const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('profilelol')
        .setDescription('Affiche le profile LoL d\'un compte')
        .addStringOption(option => 
            option.setName('compte')
                .setDescription('Le compte LoL')
                .setRequired(true)),

    async execute(interaction, client) {      
        await interaction.deferReply();

        const summonerName = await interaction.options.getString('compte');
        const summoner = await client.getRiotAccount(summonerName);
        
        if (!summoner) {
            await interaction.editReply(`Le summoner **${summonerName}** n'existe pas en euw!`);
            return
        }
        const queueData = await client.getSoloQ(summoner.id);
        const matchHistory = await client.getMatchHistory(summoner);

        await interaction.editReply({
            embeds:[client.getProfileEmbed(summoner,queueData,matchHistory)]
        });
    }
}